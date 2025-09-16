import { useEffect, useState } from 'react';
import { useProjects } from '../components/context/useProjects';
import type { Task, Priority } from '../types/task';

const priorities: Priority[] = [
  { label: 'Low Priority', color: '#4F46E5', bgColor: '#EEF2FF' },
  { label: 'OK', color: '#F59E0B', bgColor: '#FFFBEB' },
  { label: 'High Priority', color: '#F43F5E', bgColor: '#FFF1F2' },
];

export const useFetchTasks = (projectId: string) => {
  const { state, dispatch } = useProjects();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const project = state.projects.find((p) => p.id === projectId);
    if (!project || (project.tasks && project.tasks.length > 0)) return;

    const fetchTasks = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=12');
        const data = await res.json();

        const tasks: Task[] = data.map((t: any) => {
          const assigneeCount = Math.floor(Math.random() * 5) + 1;
          const assignees = Array.from(
            { length: assigneeCount },
            () => Math.floor(Math.random() * 70) + 1,
          );

          const statusOptions = ['todo', 'inprogress', 'completed'] as const;
          const status = statusOptions[t.id % 3];

          let progress = 0;
          if (status === 'inprogress') {
            progress = Math.floor(Math.random() * 99) + 1;
          } else if (status === 'completed') {
            progress = 100;
          }

          const priority = priorities[Math.floor(Math.random() * priorities.length)];

          return {
            id: String(t.id),
            title: t.title,
            status,
            progress,
            assignees,
            priority,
          };
        });

        dispatch({
          type: 'SET_TASKS',
          payload: { projectId, tasks },
        });
      } catch (err) {
        setError('Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [state.projects, projectId, dispatch]);

  return { loading, error };
};
