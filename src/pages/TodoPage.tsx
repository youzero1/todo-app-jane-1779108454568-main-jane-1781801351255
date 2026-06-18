import styles from './TodoPage.module.css';
import { useTodos } from '@/hooks/useTodos';
import { useTheme } from '@/hooks/useTheme';
import TodoInput from '@/components/TodoInput';
import TodoList from '@/components/TodoList';
import TodoFooter from '@/components/TodoFooter';
import Navbar from '@/components/Navbar';

export default function TodoPage() {
  const {
    todos,
    filteredTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    toggleAll,
    activeCount,
    completedCount,
  } = useTodos();

  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.page}>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.subtitle}>Stay organized, get things done.</p>
        </header>

        <main className={styles.main}>
          <TodoInput onAdd={addTodo} onToggleAll={toggleAll} hasTodos={todos.length > 0} />
          {filteredTodos.length > 0 || todos.length > 0 ? (
            <>
              <TodoList
                todos={filteredTodos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
              <TodoFooter
                activeCount={activeCount}
                completedCount={completedCount}
                filter={filter}
                onFilterChange={setFilter}
                onClearCompleted={clearCompleted}
              />
            </>
          ) : (
            <div className={styles.empty}>
              <span className={styles.emptyIcon}>🎉</span>
              <p className={styles.emptyText}>No todos yet. Add one above!</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
