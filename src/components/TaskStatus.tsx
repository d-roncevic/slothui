import React from 'react';
import type { Task } from '../types/task';
import TaskInfo from './TaskInfo';
import { Plus } from 'lucide-react';

type props = {
  tasks: Task[];
  color: string;
  label: string;
};
const TaskStatus = ({ color, label, tasks }: props) => {
  return (
    <div className="flex flex-col bg-slate-50 p-3 gap-4 rounded-4xl">
      {/* header */}
      <div
        className="flex items-center justify-between rounded-full pl-2 pr-3 py-2 w-full"
        style={{ backgroundColor: color }}
      >
        <div className="flex items-center gap-2 ">
          <div className="py-1.5 px-3 rounded-full bg-white text-sm leading-5 font-semibold">
            <span style={{ color: color }}>{tasks.length}</span>
          </div>
          <h2 className="font-bold text-white text-base">{label}</h2>
        </div>
        <button className="cursor-pointer flex h-6 w-6 items-center justify-center rounded-full text-white">
          <Plus />
        </button>
      </div>

      {/* Task Info */}
      <div className="flex flex-col gap-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white border border-[#E2E8F0] p-3 shadow-[0_2px_4px_-2px_rgba(23,23,23,0.06),0_4px_8px_-2px_rgba(23,23,23,0.10)] rounded-3xl"
          >
            <TaskInfo task={task} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskStatus;
