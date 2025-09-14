export type Task = {
  id: string;
  title: string;
  status: 'reviewed' | 'inprogress' | 'completed';
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
  | { type: 'SET_TASKS'; payload: Task[] };
