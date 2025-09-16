import { useState } from 'react';
import type { Task } from '../types/task';
import { Plus } from 'lucide-react';
import SortableTask from './SortableTask';
import AddTaskModal from './modals/AddTaskModal';

type props = {
  tasks: Task[];
  color: string;
  label: string;
  selectedTaskId: string | null;
  onSelectTask: (id: string) => void;
  column: 'todo' | 'inprogress' | 'completed';
};
const TaskStatus = ({ color, label, tasks, column, selectedTaskId, onSelectTask }: props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex flex-col bg-slate-50 p-4 gap-4 rounded-4xl w-full">
        {/* header */}
        <div className="flex items-center justify-between rounded-full w-full">
          <div className="flex items-center gap-2">
            <div
              className="inline-block rounded-full flex-shrink-0 w-[10px] h-[10px] p-[1px]"
              style={{ backgroundColor: color }}
            ></div>

            <div className="flex gap-1 w-full ">
              <h2 className="font-extrabold text-[#1E293B] text-xl">{label}</h2>
              <span className="text-[#94A3B8] font-extrabold text-xl"> ({tasks.length})</span>
            </div>
          </div>
          <button
            className="cursor-pointer flex items-center justify-center rounded-full p-2 border border-[#CBD5E1] h-10 w-10"
            onClick={() => setOpen(true)}
          >
            <Plus color="#475569" size={24} />
          </button>
        </div>

        {/* Task Info */}
        <div className="flex flex-col gap-3 w-full">
          {tasks.map((task) => (
            <SortableTask
              key={task.id}
              task={task}
              color={color}
              column={column}
              isSelected={selectedTaskId === task.id}
              onSelect={() => onSelectTask(task.id)}
            />
          ))}
        </div>
      </div>
      {open && <AddTaskModal defaultStatus={label} open={open} setOpen={setOpen} />}
    </>
  );
};

export default TaskStatus;
