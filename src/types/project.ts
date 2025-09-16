import type { Task } from './task';

export type Project = {
  id: string;
  title: string;
  status: 'inprogress' | 'reviewed' | 'completed';
  progress: number;
  assignees: number[];
  priority: Priority;
  tasks: Task[];
};

export type Priority = {
  label: string;
  color: string;
  bgColor: string;
};

export type ProjectState = {
  projects: Project[];
  currentProjectId: string;
};

export type ProjectAction =
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'REMOVE_PROJECT'; payload: string }
  | { type: 'UPDATE_PROJECT'; payload: Project }
  | { type: 'SET_PROJECTS'; payload: Project[] }
  | { type: 'SET_CURRENT_PROJECT'; payload: string }
  | { type: 'ADD_TASK'; payload: { projectId: string; task: Task } }
  | { type: 'MOVE_TASK'; payload: { id: string; newStatus: 'todo' | 'inprogress' | 'completed' } }
  | { type: 'SET_TASKS'; payload: { projectId: string; tasks: Task[] } };
