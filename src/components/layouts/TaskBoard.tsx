import type { Task } from '../../types/task';
import TaskStatus from '../TaskStatus';

const TaskBoard = ({ tasks }: { tasks: Task[] }) => {
  const columns = [
    { key: 'todo', label: 'To Do', color: '#4F46E5' },
    { key: 'inprogress', label: 'In Progress', color: '#F59E0B' },
    { key: 'completed', label: 'Completed', color: '#22C55E' },
  ] as const;

  return (
    <div className="flex flex-wrap gap-6 sm:flex-row flex-col ">
      {columns.map((col) => {
        const filtered = tasks.filter((t) => t.status === col.key);
        return <TaskStatus key={col.key} color={col.color} label={col.label} tasks={filtered} />;
      })}
    </div>
  );
};

export default TaskBoard;
