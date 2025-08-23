import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Play, Pause, Square, RotateCcw, Volume2, Mic, Upload, FileText, File, Globe, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
import { pipeline, env } from '@huggingface/transformers';

const TextReader = () => {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [rate, setRate] = useState([1]);
  const [pitch, setPitch] = useState([1]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isResuming, setIsResuming] = useState(false);
  const [url, setUrl] = useState('');
  const [isLoadingUrl, setIsLoadingUrl] = useState(false);
  
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const startTimeRef = useRef<number>(0);
  const pausedTimeRef = useRef<number>(0);

  // Handle voice selection change
  const handleVoiceChange = (voiceName: string) => {
    setSelectedVoice(voiceName);
    // Save immediately when user changes voice
    localStorage.setItem('voiceName', voiceName);
  };

  // Handle rate change
  const handleRateChange = (newRate: number[]) => {
    setRate(newRate);
    localStorage.setItem('speechRate', newRate[0].toString());
    
    // If currently speaking, restart from current position with new rate
    if (isPlaying && !isPaused && !isResuming) {
      restartFromCurrentPosition(newRate[0], pitch[0]);
    }
  };

  // Handle pitch change
  const handlePitchChange = (newPitch: number[]) => {
    setPitch(newPitch);
    localStorage.setItem('speechPitch', newPitch[0].toString());
    
    // If currently speaking, restart from current position with new pitch
    if (isPlaying && !isPaused && !isResuming) {
      restartFromCurrentPosition(rate[0], newPitch[0]);
    }
  };

  // Calculate approximate reading position based on time and rate
  const calculateCurrentPosition = () => {
    if (!isPlaying || isPaused || !text.trim()) return 0;
    
    const elapsedTime = (Date.now() - startTimeRef.current) / 1000;
    const wordsPerSecond = (rate[0] * 2.5); // Average speaking rate adjustment
    const estimatedWordsRead = elapsedTime * wordsPerSecond;
    const words = text.trim().split(/\s+/);
    const wordIndex = Math.floor(Math.min(estimatedWordsRead, words.length));
    
    // Find character position of the word
    let charPosition = 0;
    for (let i = 0; i < wordIndex && i < words.length; i++) {
      charPosition += words[i].length + 1; // +1 for space
    }
    
    return Math.min(charPosition, text.length);
  };

  // Restart speech from current position with new settings
  const restartFromCurrentPosition = (newRate: number, newPitch: number) => {
    if (!synthRef.current || !text.trim()) return;
    
    setIsResuming(true);
    
    // Calculate current position
    const position = calculateCurrentPosition();
    setCurrentPosition(position);
    
    // Cancel current speech
    synthRef.current.cancel();
    
    // Get remaining text from current position
    const remainingText = text.substring(position);
    if (!remainingText.trim()) {
      setIsPlaying(false);
      setIsResuming(false);
      return;
    }
    
    // Create new utterance with remaining text
    const utterance = new SpeechSynthesisUtterance(remainingText);
    const voice = voices.find(v => v.name === selectedVoice);
    
    if (voice) {
      utterance.voice = voice;
    }
    
    utterance.rate = newRate;
    utterance.pitch = newPitch;
    
    utterance.onstart = () => {
      startTimeRef.current = Date.now();
      setIsPlaying(true);
      setIsPaused(false);
      setIsResuming(false);
    };
    
    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentPosition(0);
    };
    
    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setIsResuming(false);
      setCurrentPosition(0);
    };
    
    utteranceRef.current = utterance;
    
    // Small delay to ensure the cancel operation completes
    setTimeout(() => {
      synthRef.current?.speak(utterance);
    }, 50);
  };

  // Load saved settings on component mount
  useEffect(() => {
    const savedRate = localStorage.getItem('speechRate');
    const savedPitch = localStorage.getItem('speechPitch');
    
    if (savedRate) {
      const rateValue = parseFloat(savedRate);
      if (rateValue >= 0.5 && rateValue <= 1.4) {
        setRate([rateValue]);
      }
    }
    
    if (savedPitch) {
      const pitchValue = parseFloat(savedPitch);
      if (pitchValue >= 0.5 && pitchValue <= 1.5) {
        setPitch([pitchValue]);
      }
    }
  }, []);

  useEffect(() => {
    synthRef.current = window.speechSynthesis;
    
    // Configure PDF.js worker
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;
    
    // Configure transformers.js for AI OCR
    env.allowLocalModels = false;
    env.useBrowserCache = true;
    
    const getVoicesFiltered = () => {
      const allVoices = synthRef.current?.getVoices() || [];
      
      // Find Google Translate voice specifically (often named "Google US English" or similar)
      const googleTranslateVoice = allVoices.find(v => 
        /google.*us.*english/i.test(v.name) || 
        (/google/i.test(v.name) && /en.*us/i.test(v.lang))
      );
      
      // Categorize voices with Google Translate voice first
      const googleTranslate = googleTranslateVoice ? [googleTranslateVoice] : [];
      const otherGoogle = allVoices.filter(v => 
        /google/i.test(v.name) && v !== googleTranslateVoice
      );
      const microsoft = allVoices.filter(v => 
        /microsoft/i.test(v.name) && !/google/i.test(v.name)
      );
      const english = allVoices.filter(v => 
        /^en(-|_|$)/i.test(v.lang || '') && 
        !/google|microsoft/i.test(v.name)
      );
      const rest = allVoices.filter(v => 
        !googleTranslate.includes(v) && 
        !otherGoogle.includes(v) && 
        !microsoft.includes(v) && 
        !english.includes(v)
      );
      
      return [...googleTranslate, ...otherGoogle, ...microsoft, ...english, ...rest];
    };
    
    const updateVoices = () => {
      const filteredVoices = getVoicesFiltered();
      setVoices(filteredVoices);
      
      // Auto-select Google Translate voice first, then saved voice, then first available
      const savedVoice = localStorage.getItem('voiceName');
      
      if (filteredVoices.length > 0) {
        // Priority 1: Google Translate voice if available
        const googleTranslateVoice = filteredVoices.find(v => 
          /google.*us.*english/i.test(v.name) || 
          (/google/i.test(v.name) && /en.*us/i.test(v.lang))
        );
        
        if (googleTranslateVoice && !selectedVoice) {
          setSelectedVoice(googleTranslateVoice.name);
        }
        // Priority 2: Saved voice preference
        else if (savedVoice && filteredVoices.some(v => v.name === savedVoice)) {
          setSelectedVoice(savedVoice);
        }
        // Priority 3: First available voice
        else if (!selectedVoice) {
          setSelectedVoice(filteredVoices[0].name);
        }
      }
    };

    updateVoices();
    
    if (synthRef.current) {
      synthRef.current.onvoiceschanged = updateVoices;
    }
    
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
        synthRef.current.onvoiceschanged = null;
      }
    };
  }, []); // Remove selectedVoice dependency to prevent infinite loops

  const speak = () => {
    if (!synthRef.current || !text.trim()) return;
    
    // Cancel any ongoing speech
    synthRef.current.cancel();
    
    // Reset position for new speech
    setCurrentPosition(0);
    
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find(v => v.name === selectedVoice);
    
    if (voice) {
      utterance.voice = voice;
    }
    
    utterance.rate = rate[0];
    utterance.pitch = pitch[0];
    
    // Voice preference is already saved when user changes dropdown
    
    utterance.onstart = () => {
      startTimeRef.current = Date.now();
      setIsPlaying(true);
      setIsPaused(false);
    };
    
    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentPosition(0);
    };
    
    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentPosition(0);
    };
    
    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
  };

  const pause = () => {
    if (synthRef.current && isPlaying) {
      const position = calculateCurrentPosition();
      setCurrentPosition(position);
      pausedTimeRef.current = Date.now() - startTimeRef.current;
      synthRef.current.pause();
      setIsPaused(true);
    }
  };

  const resume = () => {
    if (synthRef.current && isPaused) {
      startTimeRef.current = Date.now() - pausedTimeRef.current;
      synthRef.current.resume();
      setIsPaused(false);
    }
  };

  const stop = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentPosition(0);
    }
  };

  const extractTextWithAI = async (imageData: string): Promise<string> => {
    try {
      toast.info('Using AI to extract text from image...');
      
      // Initialize OCR pipeline
      const ocr = await pipeline('image-to-text', 'microsoft/trocr-base-printed', {
        device: 'webgpu'
      });
      
      // Extract text using AI OCR
      const result = await ocr(imageData) as any;
      
      // Handle different possible return formats
      let extractedText = '';
      if (Array.isArray(result)) {
        extractedText = result[0]?.generated_text || result[0]?.text || '';
      } else {
        extractedText = result?.generated_text || result?.text || '';
      }
      
      return extractedText;
    } catch (error) {
      console.error('AI OCR failed:', error);
      // Fallback to basic OCR if AI fails
      try {
        const ocr = await pipeline('image-to-text', 'microsoft/trocr-base-printed');
        const result = await ocr(imageData) as any;
        
        let extractedText = '';
        if (Array.isArray(result)) {
          extractedText = result[0]?.generated_text || result[0]?.text || '';
        } else {
          extractedText = result?.generated_text || result?.text || '';
        }
        
        return extractedText;
      } catch (fallbackError) {
        console.error('Fallback OCR also failed:', fallbackError);
        throw new Error('AI text extraction failed');
      }
    }
  };

  const convertPDFPageToImage = async (page: any): Promise<string> => {
    const viewport = page.getViewport({ scale: 2.0 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    if (!context) throw new Error('Could not get canvas context');
    
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    
    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };
    
    await page.render(renderContext).promise;
    return canvas.toDataURL('image/png');
  };

  const extractTextFromPDF = async (file: File): Promise<string> => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = '';
      let shouldUseAI = false;
      
      // First, try standard text extraction
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        fullText += pageText + '\n';
      }
      
      const extractedText = fullText.trim();
      
      // Check if extraction was successful (has meaningful text)
      if (!extractedText || extractedText.length < 50 || /^[\s\n\r]*$/.test(extractedText)) {
        shouldUseAI = true;
        toast.info('PDF appears to be scanned or image-based, switching to AI extraction...');
      }
      
      // If standard extraction failed or returned minimal text, use AI OCR
      if (shouldUseAI) {
        let aiExtractedText = '';
        
        for (let i = 1; i <= Math.min(pdf.numPages, 10); i++) { // Limit to 10 pages for performance
          try {
            const page = await pdf.getPage(i);
            const imageData = await convertPDFPageToImage(page);
            const pageText = await extractTextWithAI(imageData);
            
            if (pageText.trim()) {
              aiExtractedText += pageText + '\n\n';
            }
          } catch (pageError) {
            console.error(`Failed to extract text from page ${i}:`, pageError);
            // Continue with next page
          }
        }
        
        if (aiExtractedText.trim()) {
          return aiExtractedText.trim();
        }
      }
      
      if (!extractedText) {
        throw new Error('No text could be extracted from PDF');
      }
      
      return extractedText;
    } catch (error) {
      console.error('Error extracting PDF text:', error);
      if (error instanceof Error && error.message.includes('AI')) {
        throw error;
      }
      throw new Error('Failed to extract text from PDF. Please try a different file.');
    }
  };

  const extractTextFromWord = async (file: File): Promise<string> => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      return result.value.trim();
    } catch (error) {
      console.error('Error extracting Word document text:', error);
      throw new Error('Failed to extract text from Word document. Please try a different file.');
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (limit to 10MB for performance)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File is too large. Please select a file under 10MB.');
      return;
    }

    try {
      let extractedText = '';
      
      if (file.type === 'application/pdf') {
        toast.info('Extracting text from PDF...');
        extractedText = await extractTextFromPDF(file);
      } else if (
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.type === 'application/msword'
      ) {
        toast.info('Extracting text from Word document...');
        extractedText = await extractTextFromWord(file);
      } else if (file.type === 'text/plain') {
        toast.info('Loading text file...');
        extractedText = await file.text();
      } else {
        toast.error('Unsupported file type. Please upload a PDF, Word document, or text file.');
        return;
      }

      if (extractedText.trim()) {
        setText(extractedText);
        toast.success(`Successfully loaded ${file.name}`);
      } else {
        toast.error('No text found in the file.');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to process file.');
    }
    
    // Reset the input
    event.target.value = '';
  };

  const extractTextFromHTML = (htmlString: string): string => {
    // Create a temporary DOM element to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    
    // Remove script and style elements
    const scriptsAndStyles = tempDiv.querySelectorAll('script, style, nav, footer, aside, .ad, .advertisement, .sidebar');
    scriptsAndStyles.forEach(el => el.remove());
    
    // Focus on main content areas
    const mainContent = tempDiv.querySelector('main, article, .content, .post, .entry') || tempDiv;
    
    // Extract text content
    let text = mainContent.textContent || (mainContent as HTMLElement).innerText || '';
    
    // Clean up the text
    text = text
      .replace(/\s+/g, ' ') // Replace multiple whitespace with single space
      .replace(/\n\s*\n/g, '\n\n') // Preserve paragraph breaks
      .trim();
    
    return text;
  };

  const fetchWebpageContent = async (url: string): Promise<string> => {
    try {
      // Validate URL
      const urlObj = new URL(url);
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        throw new Error('Only HTTP and HTTPS URLs are supported');
      }

      // Try to fetch directly first (will work for CORS-enabled sites)
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const html = await response.text();
        return extractTextFromHTML(html);
      } catch (corsError) {
        // If direct fetch fails due to CORS, try using a CORS proxy
        console.log('Direct fetch failed, trying CORS proxy...');
        
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
        const proxyResponse = await fetch(proxyUrl);
        
        if (!proxyResponse.ok) {
          throw new Error(`Proxy request failed: ${proxyResponse.statusText}`);
        }
        
        const proxyData = await proxyResponse.json();
        return extractTextFromHTML(proxyData.contents);
      }
    } catch (error) {
      console.error('Error fetching webpage:', error);
      throw error;
    }
  };

  const handleUrlLoad = async () => {
    if (!url.trim()) {
      toast.error('Please enter a valid URL');
      return;
    }

    setIsLoadingUrl(true);
    
    try {
      toast.info('Fetching webpage content...');
      
      // Add protocol if missing
      let processedUrl = url.trim();
      if (!processedUrl.startsWith('http://') && !processedUrl.startsWith('https://')) {
        processedUrl = 'https://' + processedUrl;
      }
      
      const extractedText = await fetchWebpageContent(processedUrl);
      
      if (extractedText.trim()) {
        setText(extractedText);
        toast.success('Successfully loaded webpage content');
      } else {
        toast.error('No readable text found on the webpage');
      }
    } catch (error) {
      console.error('Error loading URL:', error);
      
      if (error instanceof Error) {
        if (error.message.includes('CORS') || error.message.includes('Failed to fetch')) {
          toast.error('Cannot access this webpage due to security restrictions. Try copying the text manually or use a different URL.');
        } else {
          toast.error(error.message);
        }
      } else {
        toast.error('Failed to load webpage content');
      }
    } finally {
      setIsLoadingUrl(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Mic className="h-6 w-6 text-primary" />
          <h1 className="text-lg font-medium">Personal Text Reader</h1>
        </div>
        
        {/* Voice Selection */}
        <div className="flex items-center gap-4">
          <Select value={selectedVoice} onValueChange={handleVoiceChange}>
            <SelectTrigger className="w-48 bg-primary text-primary-foreground rounded-full">
              <SelectValue placeholder="Select Voice" />
            </SelectTrigger>
            <SelectContent className="bg-background border-border max-h-60">
              {voices.map((voice) => (
                <SelectItem key={voice.name} value={voice.name}>
                  {voice.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {/* URL Input */}
          <div className="flex items-center gap-2">
            <Input
              placeholder="Enter webpage URL..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleUrlLoad()}
              className="w-64 rounded-full"
              disabled={isLoadingUrl}
            />
            <Button 
              size="sm" 
              variant="outline" 
              className="rounded-full"
              onClick={handleUrlLoad}
              disabled={isLoadingUrl || !url.trim()}
            >
              {isLoadingUrl ? (
                <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
              ) : (
                <Globe className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          {/* File Upload */}
          <div className="relative">
            <Input
              id="file-upload"
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Button size="sm" variant="outline" className="rounded-full">
              <Upload className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6">
        {/* Text Display Area */}
        <div className="relative">
          <div className="bg-card border border-border rounded-3xl p-8 min-h-[400px] mb-8 shadow-lg">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste or type your text here, upload a file, or enter a webpage URL above..."
              className="w-full h-full min-h-[350px] bg-transparent border-0 text-lg leading-relaxed resize-none focus:outline-none focus:ring-0 placeholder:text-muted-foreground/50"
            />
            
            {/* Code Icon */}
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-4 right-4 rounded-full bg-muted/50 hover:bg-muted"
            >
              <File className="h-4 w-4" />
            </Button>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-8 mb-8">
            {/* Mic Button */}
            <Button
              size="sm"
              variant="outline"
              className="rounded-full w-12 h-12"
            >
              <Mic className="h-5 w-5" />
            </Button>

            {/* Main Play/Pause Button */}
            <Button
              onClick={isPlaying && !isPaused ? pause : isPaused ? resume : speak}
              disabled={!text.trim()}
              size="lg"
              className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isPlaying && !isPaused ? (
                <Pause className="h-8 w-8" />
              ) : (
                <Play className="h-8 w-8" />
              )}
            </Button>

            {/* Forward Button */}
            <Button
              onClick={stop}
              disabled={!isPlaying && !isPaused}
              size="sm"
              variant="outline"
              className="rounded-full w-12 h-12"
            >
              <RotateCcw className="h-5 w-5" />
            </Button>
          </div>

          {/* Settings Panel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Volume2 className="h-4 w-4" />
                  Speed
                </label>
                <span className="text-sm text-muted-foreground">{rate[0].toFixed(1)}x</span>
              </div>
              <Slider
                value={rate}
                onValueChange={handleRateChange}
                min={0.5}
                max={1.4}
                step={0.05}
                className="w-full"
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Pitch</label>
                <span className="text-sm text-muted-foreground">{pitch[0].toFixed(1)}</span>
              </div>
              <Slider
                value={pitch}
                onValueChange={handlePitchChange}
                min={0.5}
                max={1.5}
                step={0.05}
                className="w-full"
              />
            </div>
          </div>

          {/* Status Indicator */}
          {isPlaying && (
            <div className="flex items-center justify-center gap-2 text-primary">
              <div className="animate-pulse w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">
                {isPaused ? 'Paused' : 'Speaking...'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextReader;