import type { Task } from '../../types/task';
import TaskInfo from '../TaskInfo';
import TaskStatus from '../TaskStatus';

const TaskBoard = ({ tasks }: { tasks: Task[] }) => {
  const columns = [
    { key: 'inprogress', label: 'In Progress', color: '#4F46E5' },
    { key: 'reviewed', label: 'Reviewed', color: '#F59E0B' },
    { key: 'completed', label: 'Completed', color: '#22C55E' },
  ] as const;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 p-6">
      {columns.map((col) => {
        const filtered = tasks.filter((t) => t.status === col.key);
        return <TaskStatus key={col.key} color={col.color} label={col.label} tasks={filtered} />;
      })}
    </div>
  );
};

export default TaskBoard;
