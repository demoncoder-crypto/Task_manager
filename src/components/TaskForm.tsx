// src/components/TaskForm.tsx
import React, { useState } from 'react';
import { Task } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface TaskFormProps {
  addTask: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      category,
      dueDate,
      completed: false,
    };
    addTask(newTask);
    setTitle('');
    setDescription('');
    setCategory('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Task</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
