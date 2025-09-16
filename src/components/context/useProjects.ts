import { useContext } from 'react';
import { ProjectContext } from './ProjectContext';

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error('useProjects mora biti unutar ProjectProvider-a');
  return context;
};
