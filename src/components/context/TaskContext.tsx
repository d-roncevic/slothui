import { createContext, useEffect, useReducer, type Dispatch, type ReactNode } from 'react';
import { TaskReducer } from '../../reducers/TaskReducer';
import type { TaskState, TaskAction } from '../../types/task';

type TaskContextType = {
  state: TaskState;
  dispatch: Dispatch<TaskAction>;
};

const initialState: TaskState = { tasks: [] };

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const getInitialState = (): TaskState => {
    const saved = localStorage.getItem('tasks');
    return saved ? { tasks: JSON.parse(saved) } : initialState;
  };
  const [state, dispatch] = useReducer(TaskReducer, undefined, getInitialState);
  // persist u localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  }, [state.tasks]);
  return <TaskContext.Provider value={{ state, dispatch }}>{children}</TaskContext.Provider>;
};
