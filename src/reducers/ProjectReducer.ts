import type { ProjectState, ProjectAction } from '../types/project';

export const ProjectReducer = (state: ProjectState, action: ProjectAction): ProjectState => {
  switch (action.type) {
    case 'ADD_PROJECT':
      return { ...state, projects: [...state.projects, action.payload] };
    case 'REMOVE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter((project) => project.id !== action.payload),
      };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === action.payload.id ? action.payload : project,
        ),
      };
    case 'SET_PROJECTS':
      return { ...state, projects: action.payload };
    case 'SET_CURRENT_PROJECT':
      return { ...state, currentProjectId: action.payload };
    case 'ADD_TASK':
      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.payload.projectId
            ? { ...p, tasks: [...(p.tasks || []), action.payload.task] }
            : p,
        ),
      };
    case 'SET_TASKS':
      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.payload.projectId ? { ...p, tasks: action.payload.tasks } : p,
        ),
      };
    case 'MOVE_TASK':
      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === state.currentProjectId
            ? {
                ...p,
                tasks: p.tasks.map((t) =>
                  t.id === action.payload.id ? { ...t, status: action.payload.newStatus } : t,
                ),
              }
            : p,
        ),
      };
    default:
      return state;
  }
};
