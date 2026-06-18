import { useState, useEffect } from 'react';
import { Theme } from '@/types';

const STORAGE_KEY = 'todo-app-theme';

function loadTheme(): Theme {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === 'dark' || raw === 'light') return raw;
  } catch {
    // ignore
  }
  return 'light';
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(loadTheme);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  function toggleTheme(): void {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }

  return { theme, toggleTheme };
}
