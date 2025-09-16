import { ChevronRight, Eclipse, HomeIcon } from 'lucide-react';
import type { Project } from '../types/project';
import { Link } from 'react-router-dom';
type Props = {
  project: Project;
};
const BreadCrumbs = ({ project }: Props) => {
  const items = [
    { label: 'Dashboard', to: '/', icon: <HomeIcon size={20} color="#475569" /> },
    { label: 'Projects', to: '/' },
    {
      label: project.title,
      to: `/project/${project.id}`,
      icon: <Eclipse size={20} color="#4F46E5" />,
      active: true,
    },
  ];
  return (
    <div className="md:flex gap-2 items-center h-8 hidden">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-1">
          {item.icon && (
            <Link to={item.to} className="p-1.5">
              {item.icon}
            </Link>
          )}

          <Link
            to={item.to}
            className={`font-bold text-sm ${item.active ? 'text-[#4F46E5]' : 'text-[#475569]'}`}
          >
            {item.label}
          </Link>

          {i < items.length - 1 && (
            <span className="text-[#CBD5E1]">
              <ChevronRight size={20} />
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default BreadCrumbs;
