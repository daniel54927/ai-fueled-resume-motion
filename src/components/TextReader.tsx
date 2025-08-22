import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Play, Pause, Square, RotateCcw, Volume2, Mic, Upload, FileText, File } from 'lucide-react';
import { toast } from 'sonner';
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

const TextReader = () => {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [rate, setRate] = useState([1]);
  const [pitch, setPitch] = useState([1]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

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
  };

  // Handle pitch change
  const handlePitchChange = (newPitch: number[]) => {
    setPitch(newPitch);
    localStorage.setItem('speechPitch', newPitch[0].toString());
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
    
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find(v => v.name === selectedVoice);
    
    if (voice) {
      utterance.voice = voice;
    }
    
    utterance.rate = rate[0];
    utterance.pitch = pitch[0];
    
    // Voice preference is already saved when user changes dropdown
    
    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };
    
    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };
    
    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };
    
    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
  };

  const pause = () => {
    if (synthRef.current && isPlaying) {
      synthRef.current.pause();
      setIsPaused(true);
    }
  };

  const resume = () => {
    if (synthRef.current && isPaused) {
      synthRef.current.resume();
      setIsPaused(false);
    }
  };

  const stop = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  const extractTextFromPDF = async (file: File): Promise<string> => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = '';
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        fullText += pageText + '\n';
      }
      
      return fullText.trim();
    } catch (error) {
      console.error('Error extracting PDF text:', error);
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

  return (
    <Card className="w-full max-w-4xl mx-auto bg-tech-dark/80 border-tech-blue/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-tech-blue">
          <Mic className="h-6 w-6" />
          Personal Text Reader
        </CardTitle>
        <CardDescription>
          Accessibility tool for ADHD and dyslexia - transform text into natural speech for better focus and comprehension
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Voice Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Voice</label>
            <Select value={selectedVoice} onValueChange={handleVoiceChange}>
              <SelectTrigger className="bg-background/50 border-tech-blue/30">
                <SelectValue placeholder="Select a voice" />
              </SelectTrigger>
              <SelectContent className="bg-tech-dark border-tech-blue/30 max-h-60">
                {voices.map((voice) => (
                  <SelectItem key={voice.name} value={voice.name}>
                    {voice.name} — {voice.lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Volume2 className="h-4 w-4" />
              Rate: {rate[0].toFixed(1)}x
            </label>
            <Slider
              value={rate}
              onValueChange={handleRateChange}
              min={0.5}
              max={1.4}
              step={0.05}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Pitch: {pitch[0].toFixed(1)}
            </label>
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

        {/* File Upload */}
        <div className="space-y-2">
          <Label htmlFor="file-upload" className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload Document
          </Label>
          <div className="flex items-center gap-4">
            <Input
              id="file-upload"
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileUpload}
              className="bg-background/50 border-tech-blue/30 file:bg-tech-blue file:text-white file:border-0 file:rounded file:px-3 file:py-1"
            />
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <FileText className="h-3 w-3" />
              <span>PDF, Word, or Text files</span>
            </div>
          </div>
        </div>

        {/* Text Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Text to Read</label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste or type your text here..."
            className="min-h-[200px] bg-background/50 border-tech-blue/30 resize-none"
          />
        </div>

        {/* Control Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={speak}
            disabled={!text.trim() || isPlaying}
            className="bg-tech-blue hover:bg-tech-blue/80"
          >
            <Play className="h-4 w-4 mr-2" />
            Speak
          </Button>
          
          <Button
            onClick={pause}
            disabled={!isPlaying || isPaused}
            variant="outline"
            className="border-tech-blue/30 hover:bg-tech-blue/10"
          >
            <Pause className="h-4 w-4 mr-2" />
            Pause
          </Button>
          
          <Button
            onClick={resume}
            disabled={!isPaused}
            variant="outline"
            className="border-tech-blue/30 hover:bg-tech-blue/10"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Resume
          </Button>
          
          <Button
            onClick={stop}
            disabled={!isPlaying && !isPaused}
            variant="destructive"
          >
            <Square className="h-4 w-4 mr-2" />
            Stop
          </Button>
        </div>

        {/* Status Indicator */}
        {isPlaying && (
          <div className="flex items-center gap-2 text-tech-blue">
            <div className="animate-pulse w-2 h-2 bg-tech-blue rounded-full"></div>
            <span className="text-sm">
              {isPaused ? 'Paused' : 'Speaking...'}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TextReader;