import { Plus } from 'lucide-react';
import type { Project } from '../types/project';
import Projectinfo from './ProjectInfo';
import { Link } from 'react-router-dom';
import AddProjectModal from './modals/AddProjectModal';
import { useState } from 'react';

type props = {
  projects: Project[];
  color: string;
  label: string;
};
const ProjectStatus = ({ color, label, projects }: props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-1 flex-col bg-slate-50 p-4 gap-4 rounded-4xl w-full">
      {/* header */}
      <div
        className="flex items-center justify-between rounded-full gap-3 w-full py-2 pl-2 pr-3 h-12"
        style={{ backgroundColor: color }}
      >
        <div className="rounded-full flex items-center gap-[14px]">
          <span
            className="font-semibold text-sm bg-white px-3 py-1.5 rounded-full w-8"
            style={{ color: color }}
          >
            {' '}
            {projects.length}
          </span>
          <h2 className="font-bold text-white text-base ">{label}</h2>
        </div>
        <button
          className="cursor-pointer flex items-center justify-center rounded-full"
          onClick={() => setOpen(true)}
        >
          <Plus color="#FFFFFF" size={24} />
        </button>
      </div>

      {/* Task Info */}
      {projects.length > 0 ? (
        <div className="flex flex-col gap-3 w-full bg-white border border-[#E2E8F0] p-3 shadow-[0_2px_4px_-2px_rgba(23,23,23,0.06),0_4px_8px_-2px_rgba(23,23,23,0.10)] rounded-3xl w-full">
          {projects.map((project) => (
            <Link key={project.id} to={`/projects/${project.id}`}>
              <Projectinfo project={project} />
            </Link>
          ))}
        </div>
      ) : null}
      {open && <AddProjectModal open={open} setOpen={setOpen} defaultStatus={label} />}
    </div>
  );
};

export default ProjectStatus;
