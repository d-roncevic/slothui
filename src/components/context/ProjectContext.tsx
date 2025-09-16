import { createContext, useEffect, useReducer, type Dispatch, type ReactNode } from 'react';
import { ProjectReducer } from '../../reducers/ProjectReducer';
import type { ProjectAction, ProjectState } from '../../types/project';

type ProjectContextType = {
  state: ProjectState;
  dispatch: Dispatch<ProjectAction>;
};

const initialState: ProjectState = {
  projects: [
    {
      id: Date.now().toString(),
      title: 'Project PlanetX',
      status: 'inprogress',
      progress: 0,
      assignees: [1, 2, 3, 4],
      priority: { label: 'Important', color: '#4F46E5', bgColor: '#EEF2FF' },
      tasks: [],
    },
  ],
  currentProjectId: '',
};

export const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const getInitialState = (): ProjectState => {
    const saved = localStorage.getItem('projects');
    return saved ? { projects: JSON.parse(saved) } : initialState;
  };
  const [state, dispatch] = useReducer(ProjectReducer, undefined, getInitialState);
  // persist u localStorage
  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(state.projects));
  }, [state.projects]);
  return <ProjectContext.Provider value={{ state, dispatch }}>{children}</ProjectContext.Provider>;
};
