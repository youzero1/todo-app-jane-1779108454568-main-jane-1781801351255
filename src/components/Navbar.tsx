import { Sun, Moon, CheckSquare } from 'lucide-react';
import { Theme } from '@/types';
import styles from './Navbar.module.css';

type NavbarProps = {
  theme: Theme;
  onToggleTheme: () => void;
};

export default function Navbar({ theme, onToggleTheme }: NavbarProps) {
  return (
    <nav className={styles.nav}>
      <div className={styles.brand}>
        <CheckSquare size={22} color="var(--color-primary)" />
        <span className={styles.brandName}>My Todos</span>
      </div>
      <button
        className={styles.themeBtn}
        onClick={onToggleTheme}
        aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        title={theme === 'light' ? 'Dark mode' : 'Light mode'}
      >
        {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        <span className={styles.themeBtnLabel}>
          {theme === 'light' ? 'Dark' : 'Light'}
        </span>
      </button>
    </nav>
  );
}
