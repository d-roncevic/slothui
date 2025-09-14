import type { Task } from '../types/task';

import React from 'react';

const TaskInfo = ({ task }: { task: Task }) => {
  return <div>{task.title}</div>;
};

export default TaskInfo;
