import { CircleCheck, MessageCircle } from 'lucide-react';
import type { Project } from '../types/project';

type Props = {
  project: Project;
};

const Projectinfo = ({ project }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Badge */}
      <div
        className={`font-semibold text-xs py-1 px-2 rounded-full w-fit`}
        style={{ backgroundColor: project.priority.bgColor, color: project.priority.color }}
      >
        <p>{project.priority.label}</p>
      </div>

      {/* Title */}
      <p className="font-bold text-md text-[#1E293B] text-left w-full break-words">
        {project.title}
      </p>

      {/* Footer (placeholder za assignee, comments, etc.) */}
      <div className="flex justify-between items-center w-full">
        <div className="flex -space-x-2">
          {project?.assignees?.slice(0, 3).map((num) => (
            <img
              key={num}
              src={`https://i.pravatar.cc/24?img=${num}`}
              alt={`user-${num}`}
              className="w-8 h-8 rounded-full border-2 border-white"
            />
          ))}

          {project?.assignees?.length > 3 && (
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#EEF2FF] text-sm font-extrabold text-[#4F46E5] border-2 border-white">
              +{project?.assignees?.length - 3}
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

export default Projectinfo;
