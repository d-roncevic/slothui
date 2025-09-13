// TaskContext.tsx
import { createContext, useReducer, type Dispatch, type ReactNode } from 'react';
import { TaskReducer } from './TaskReducer';
import type { TaskState, TaskAction } from '../types/task';

type TaskContextType = {
  state: TaskState;
  dispatch: Dispatch<TaskAction>;
};

const initialState: TaskState = { tasks: [] };

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(TaskReducer, initialState);

  return <TaskContext.Provider value={{ state, dispatch }}>{children}</TaskContext.Provider>;
};
