import type { TaskState, TaskAction } from '../types/task';

export const TaskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'REMOVE_TASK':
      return { ...state, tasks: state.tasks.filter((task) => task.id !== action.payload) };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) => (task.id === action.payload.id ? action.payload : task)),
      };
    case 'SET_TASKS':
      return { ...state, tasks: action.payload };
    case 'UPDATE_PROGRESS':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, progress: action.payload.progress } : task,
        ),
      };
    default:
      return state;
  }
};
