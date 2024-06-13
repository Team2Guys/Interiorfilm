import { useEffect, useState } from 'react';

const useColorMode = () => {
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Read color mode from localStorage
    const savedColorMode = localStorage.getItem('colorMode');
    if (savedColorMode) {
      setColorMode(savedColorMode as 'light' | 'dark');
      document.documentElement.classList.add(savedColorMode);
    }
  }, []);

  const setMode = (mode: 'light' | 'dark') => {
    setColorMode(mode);
    localStorage.setItem('colorMode', mode);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(mode);
  };

  return [colorMode, setMode] as const;
};

export default useColorMode;
