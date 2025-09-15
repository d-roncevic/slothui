import { CircleCheck, MessageCircle } from 'lucide-react';
import type { Task } from '../types/task';

type Props = {
  task: Task;
  color: string;
};

const TaskInfo = ({ task, color }: Props) => {
  const progress =
    task.progress !== undefined
      ? task.progress
      : task.status === 'completed'
        ? 100
        : task.status === 'inprogress'
          ? 50
          : 0;

  return (
    <div className="flex flex-col gap-4">
      {/* Badge */}
      <div
        className={`font-semibold text-xs py-1 px-2 rounded-full w-fit`}
        style={{ backgroundColor: task.priority.bgColor, color: task.priority.color }}
      >
        <p>{task.priority.label}</p>
      </div>

      {/* Title */}
      <p className="font-bold text-md text-[#1E293B] text-left w-full break-words">{task.title}</p>

      {/* Progress Bar*/}
      <div className="w-full flex flex-col gap-2">
        <div className="flex items-center justify-between w-full">
          <span className="text-sm font-medium capitalize text-[#475569]">Progress</span>
          <span className="text-sm font-bold text-[#1E293B]">{progress}%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded">
          <div
            className={`h-2 rounded transition-all duration-300 ease-out`}
            style={{ width: `${progress}%`, backgroundColor: color }}
          />
        </div>
      </div>

      {/* Footer (placeholder za assignee, comments, etc.) */}
      <div className="flex justify-between items-center w-full">
        <div className="flex -space-x-2">
          {task?.assignees?.slice(0, 3).map((num) => (
            <img
              key={num}
              src={`https://i.pravatar.cc/24?img=${num}`}
              alt={`user-${num}`}
              className="w-8 h-8 rounded-full border-2 border-white"
            />
          ))}

          {task?.assignees?.length > 3 && (
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#EEF2FF] text-sm font-extrabold text-[#4F46E5] border-2 border-white">
              +{task?.assignees?.length - 3}
            </div>
          )}
        </div>
        <div className="flex gap-4 text-base font-semibold text-[#1E293B]">
          <span className="flex gap-1 items-center">
            <MessageCircle size={20} />
            <p className="leading-5.5">11</p>
          </span>
          <span className="flex gap-1 items-center">
            <CircleCheck size={20} />
            <p className="leading-5.5">187</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskInfo;
