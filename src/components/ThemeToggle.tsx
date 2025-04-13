
import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Switch } from './ui/switch';
import { useTheme } from '@/hooks/useTheme';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-4 w-4 text-yellow-400 dark:text-yellow-300" />
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="data-[state=checked]:bg-tech-purple"
      />
      <Moon className="h-4 w-4 text-tech-purple dark:text-tech-blue" />
    </div>
  );
};

export default ThemeToggle;
