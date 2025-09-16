import { div } from 'framer-motion/client';
import type { Project } from '../../types/project';
import ProjectStatus from '../ProjectStatus';

const ProjectBoard = ({ projects }: { projects: Project[] }) => {
  const columns = [
    { key: 'inprogress', label: 'In Progress', color: '#4F46E5' },
    { key: 'reviewed', label: 'Reviewed', color: '#F59E0B' },
    { key: 'completed', label: 'Completed', color: '#22C55E' },
  ] as const;

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {columns.map((col) => {
        const filtered = projects.filter((t) => t.status === col.key);
        return (
          <ProjectStatus key={col.key} color={col.color} label={col.label} projects={filtered} />
        );
      })}
    </div>
  );
};

export default ProjectBoard;
