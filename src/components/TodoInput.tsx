import { useState } from 'react';
import styles from './TodoInput.module.css';
import { Plus, ChevronsDown, CalendarDays } from 'lucide-react';
import clsx from 'clsx';

type TodoInputProps = {
  onAdd: (text: string, dueDate?: string) => void;
  onToggleAll: () => void;
  hasTodos: boolean;
};

export default function TodoInput({ onAdd, onToggleAll, hasTodos }: TodoInputProps) {
  const [value, setValue] = useState('');
  const [dueDate, setDueDate] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (value.trim()) {
      onAdd(value, dueDate || undefined);
      setValue('');
      setDueDate('');
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.topRow}>
        {hasTodos && (
          <button
            type="button"
            className={styles.toggleAll}
            onClick={onToggleAll}
            title="Toggle all"
            aria-label="Toggle all todos"
          >
            <ChevronsDown size={18} />
          </button>
        )}
        <input
          className={clsx(styles.input, !hasTodos && styles.inputFull)}
          type="text"
          placeholder="What needs to be done?"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
          autoFocus
        />
        <button
          type="submit"
          className={styles.addBtn}
          disabled={!value.trim()}
          aria-label="Add todo"
        >
          <Plus size={20} />
        </button>
      </div>
      <div className={styles.bottomRow}>
        <CalendarDays size={15} className={styles.calIcon} />
        <label className={styles.dateLabel} htmlFor="todo-due-date">Due date</label>
        <input
          id="todo-due-date"
          className={styles.dateInput}
          type="date"
          value={dueDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDueDate(e.target.value)}
          aria-label="Due date"
        />
        {dueDate && (
          <button
            type="button"
            className={styles.clearDate}
            onClick={() => setDueDate('')}
            aria-label="Clear due date"
          >
            ✕
          </button>
        )}
      </div>
    </form>
  );
}
