import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Task } from '../types/task';
import TaskInfo from './TaskInfo';
import { motion } from 'framer-motion';

type Props = {
  task: Task;
  color: string;
  column: 'todo' | 'inprogress' | 'completed';
  isSelected: boolean;
  onSelect: () => void;
};

const SortableTask = ({ task, color, column, isSelected, onSelect }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: task.id,
    data: { column },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onSelect}
      animate={{
        scale: isSelected ? 1.05 : 1,
        boxShadow: isSelected ? '0 8px 20px rgba(79,70,229,0.25)' : '0 2px 6px rgba(0,0,0,0.1)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-white border border-[#E2E8F0] p-3 shadow-[0_2px_4px_-2px_rgba(23,23,23,0.06),0_4px_8px_-2px_rgba(23,23,23,0.10)] rounded-3xl w-full cursor-grab"
    >
      <TaskInfo task={task} color={color} />
    </motion.div>
  );
};

export default SortableTask;
