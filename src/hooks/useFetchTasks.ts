import { useEffect, useState } from 'react';
import type { ApiTodo, Task } from '../types/task';
import { useTasks } from '../components/context/useTasks';

export function useFetchTasks(limit = 17) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { dispatch } = useTasks();
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        console.log('Fetching tasks...');

        const res = await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);
        const data: ApiTodo[] = await res.json();

        if (!cancelled) {
          const mapped: Task[] = data.map((todo) => ({
            id: String(todo.id),
            title: todo.title,
            status: todo.id % 3 === 0 ? 'reviewed' : todo.id % 3 === 1 ? 'inprogress' : 'completed',
          }));

          dispatch({ type: 'SET_TASKS', payload: mapped });
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [limit, dispatch]); // ✅ dispatch u dependencies

  return { loading, error };
}
