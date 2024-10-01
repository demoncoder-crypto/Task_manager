
import React from 'react';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  toggleComplete: (id: string) => void;
  deleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, toggleComplete, deleteTask }) => {
  return (
    <div>
      <h2>Your Tasks</h2>
      {tasks.length === 0 && <p>No tasks available.</p>}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h3>
              {task.title} {task.completed && <span>(Completed)</span>}
            </h3>
            <p>{task.description}</p>
            <p>Category: {task.category}</p>
            <p>Due: {task.dueDate}</p>
            <button onClick={() => toggleComplete(task.id)}>
              {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
            <button onClick={() => deleteTask(task.id)}>Delete Task</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
