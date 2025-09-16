import { closestCorners, DndContext } from '@dnd-kit/core';
import type { Task } from '../../types/task';
import TaskStatus from '../TaskStatus';
import { useProjects } from '../context/useProjects';
import { useState } from 'react';

const TaskBoard = ({ tasks }: { tasks: Task[] }) => {
  const { dispatch } = useProjects();
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const columns = [
    { key: 'todo', label: 'To Do', color: '#4F46E5' },
    { key: 'inprogress', label: 'In Progress', color: '#F59E0B' },
    { key: 'completed', label: 'Completed', color: '#22C55E' },
  ] as const;

  const handleDragEnd = ({ active, over }: any) => {
    if (!over) return;

    const sourceId = active.id;
    const destColumn = over.data.current?.column; // 👈 ovo moraš proslijediti iz TaskStatus

    if (destColumn) {
      dispatch({
        type: 'MOVE_TASK',
        payload: { id: sourceId, newStatus: destColumn },
      });
    }
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {columns.map((col) => {
          const filtered = tasks.filter((t) => t.status === col.key);
          return (
            <TaskStatus
              key={col.key}
              color={col.color}
              column={col.key}
              label={col.label}
              tasks={filtered}
              selectedTaskId={selectedTaskId}
              onSelectTask={setSelectedTaskId}
            />
          );
        })}
      </div>
    </DndContext>
  );
};

export default TaskBoard;
