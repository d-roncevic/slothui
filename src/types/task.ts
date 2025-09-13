export type Task = {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'inprogress' | 'done';
};

export type TaskState = {
  tasks: Task[];
};

export type TaskAction =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'REMOVE_TASK'; payload: string }
  | { type: 'UPDATE_TASK'; payload: Task };
