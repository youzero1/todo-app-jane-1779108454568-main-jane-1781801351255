import { useState, useRef, useEffect } from 'react';
import styles from './TodoItem.module.css';
import { Todo } from '@/types';
import { Trash2, Pencil, Check, X, CalendarDays } from 'lucide-react';
import clsx from 'clsx';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string, newDueDate?: string) => void;
};

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

function isOverdue(dateStr: string, completed: boolean): boolean {
  if (completed) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [year, month, day] = dateStr.split('-').map(Number);
  const due = new Date(year, month - 1, day);
  return due < today;
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate ?? '');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  function handleEditSubmit(): void {
    onEdit(todo.id, editValue, editDueDate || undefined);
    setEditing(false);
  }

  function handleEditKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Enter') {
      handleEditSubmit();
    } else if (e.key === 'Escape') {
      setEditValue(todo.text);
      setEditDueDate(todo.dueDate ?? '');
      setEditing(false);
    }
  }

  function handleStartEdit(): void {
    setEditValue(todo.text);
    setEditDueDate(todo.dueDate ?? '');
    setEditing(true);
  }

  function handleCancelEdit(): void {
    setEditValue(todo.text);
    setEditDueDate(todo.dueDate ?? '');
    setEditing(false);
  }

  const overdue = todo.dueDate ? isOverdue(todo.dueDate, todo.completed) : false;

  return (
    <li className={clsx(styles.item, todo.completed && styles.completed, editing && styles.editing)}>
      {!editing ? (
        <>
          <button
            className={styles.checkbox}
            onClick={() => onToggle(todo.id)}
            aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
          >
            <span className={clsx(styles.checkCircle, todo.completed && styles.checkCircleActive)}>
              {todo.completed && <Check size={13} strokeWidth={3} />}
            </span>
          </button>
          <div className={styles.content}>
            <span className={styles.text}>{todo.text}</span>
            {todo.dueDate && (
              <span className={clsx(styles.dueDate, overdue && styles.dueDateOverdue)}>
                <CalendarDays size={12} />
                {overdue ? 'Overdue · ' : ''}{formatDate(todo.dueDate)}
              </span>
            )}
          </div>
          <div className={styles.actions}>
            <button
              className={styles.editBtn}
              onClick={handleStartEdit}
              aria-label="Edit todo"
            >
              <Pencil size={15} />
            </button>
            <button
              className={styles.deleteBtn}
              onClick={() => onDelete(todo.id)}
              aria-label="Delete todo"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className={styles.editFields}>
            <input
              ref={inputRef}
              className={styles.editInput}
              value={editValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditValue(e.target.value)}
              onKeyDown={handleEditKeyDown}
              onBlur={handleEditSubmit}
              placeholder="Task name"
            />
            <div className={styles.editDateRow}>
              <CalendarDays size={13} className={styles.calIcon} />
              <input
                className={styles.editDateInput}
                type="date"
                value={editDueDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditDueDate(e.target.value)}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => e.stopPropagation()}
                onMouseDown={(e: React.MouseEvent<HTMLInputElement>) => e.stopPropagation()}
              />
            </div>
          </div>
          <div className={styles.actions}>
            <button
              className={styles.confirmBtn}
              onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault()}
              onClick={handleEditSubmit}
              aria-label="Confirm edit"
            >
              <Check size={15} />
            </button>
            <button
              className={styles.cancelBtn}
              onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault()}
              onClick={handleCancelEdit}
              aria-label="Cancel edit"
            >
              <X size={15} />
            </button>
          </div>
        </>
      )}
    </li>
  );
}
