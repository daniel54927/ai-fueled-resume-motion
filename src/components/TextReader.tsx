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

  useEffect(() => {
    synthRef.current = window.speechSynthesis;
    
    // Configure PDF.js worker
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;
    
    const getVoicesFiltered = () => {
      const wantEnglishFirst = (v: SpeechSynthesisVoice) => /^en(-|_|$)/i.test(v.lang || '');
      const allVoices = synthRef.current?.getVoices() || [];
      const voices = allVoices.sort((a, b) => a.name.localeCompare(b.name));
      
      // Prefer high-quality "Microsoft ... Online (Natural)" or Google voices when present
      const preferred = voices.filter(v => /Microsoft .*Online.*Natural/i.test(v.name));
      const google = voices.filter(v => /Google/i.test(v.name));
      const english = voices.filter(wantEnglishFirst);
      const rest = voices.filter(v => !preferred.includes(v) && !google.includes(v) && !english.includes(v));
      
      return [...preferred, ...google, ...english, ...rest];
    };
    
    const updateVoices = () => {
      const filteredVoices = getVoicesFiltered();
      setVoices(filteredVoices);
      
      // Auto-select saved voice or first available
      const savedVoice = localStorage.getItem('voiceName');
      if (savedVoice && filteredVoices.some(v => v.name === savedVoice)) {
        setSelectedVoice(savedVoice);
      } else if (filteredVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(filteredVoices[0].name);
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
  }, [selectedVoice]);

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
    
    // Save selected voice to localStorage
    localStorage.setItem('voiceName', selectedVoice);
    
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
            <Select value={selectedVoice} onValueChange={setSelectedVoice}>
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
              onValueChange={setRate}
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
              onValueChange={setPitch}
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