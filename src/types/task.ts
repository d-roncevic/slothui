export type Task = {
  id: string;
  title: string;
  status: 'todo' | 'inprogress' | 'completed';
  progress: number;
  assignees: number[];
  priority: Priority;
};

export type Priority = {
  label: string;
  color: string;
  bgColor: string;
};

export type ApiTodo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export type TaskState = {
  tasks: Task[];
};

export type TaskAction =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'REMOVE_TASK'; payload: string }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'UPDATE_PROGRESS'; payload: { id: string; progress: number } }
  | { type: 'SET_TASKS'; payload: Task[] };
