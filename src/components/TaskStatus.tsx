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
    <div className="flex flex-col bg-slate-50 p-4 gap-4 rounded-4xl basis-[32%] min-w-[260px]">
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
        <button className="cursor-pointer flex items-center justify-center rounded-full p-2 border border-[#CBD5E1] h-10 w-10">
          <Plus color="#475569" size={24} />
        </button>
      </div>

      {/* Task Info */}
      <div className="flex flex-col gap-3 w-full">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white border border-[#E2E8F0] p-3 shadow-[0_2px_4px_-2px_rgba(23,23,23,0.06),0_4px_8px_-2px_rgba(23,23,23,0.10)] rounded-3xl w-full"
          >
            <TaskInfo task={task} color={color} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskStatus;
