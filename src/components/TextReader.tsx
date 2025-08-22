import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Pause, Square, RotateCcw, Volume2, Mic } from 'lucide-react';

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
    
    const updateVoices = () => {
      const availableVoices = synthRef.current?.getVoices() || [];
      
      // Filter and sort voices - prefer English first, then high-quality voices
      const filteredVoices = availableVoices
        .filter(voice => voice.localService) // Prefer local/free voices
        .sort((a, b) => {
          const aEnglish = /^en(-|_|$)/i.test(a.lang || '');
          const bEnglish = /^en(-|_|$)/i.test(b.lang || '');
          
          if (aEnglish && !bEnglish) return -1;
          if (!aEnglish && bEnglish) return 1;
          
          // Prefer high-quality voices
          const aQuality = /natural|premium|enhanced/i.test(a.name);
          const bQuality = /natural|premium|enhanced/i.test(b.name);
          
          if (aQuality && !bQuality) return -1;
          if (!aQuality && bQuality) return 1;
          
          return a.name.localeCompare(b.name);
        });
      
      setVoices(filteredVoices);
      
      // Auto-select first English voice if available
      if (filteredVoices.length > 0 && !selectedVoice) {
        const englishVoice = filteredVoices.find(v => /^en(-|_|$)/i.test(v.lang || ''));
        setSelectedVoice(englishVoice?.name || filteredVoices[0].name);
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