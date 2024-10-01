// src/App.tsx
import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Task } from './types';
import localforage from 'localforage';
import './App.css';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks from IndexedDB on mount
  useEffect(() => {
    const loadTasks = async () => {
      const storedTasks = await localforage.getItem<Task[]>('tasks');
      if (storedTasks) {
        setTasks(storedTasks);
      }
    };
    loadTasks();
  }, []);

  // Save tasks to IndexedDB whenever they change
  useEffect(() => {
    localforage.setItem('tasks', tasks);
  }, [tasks]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const toggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="App">
      <h1>Task Manager PWA</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} toggleComplete={toggleComplete} deleteTask={deleteTask} />
    </div>
  );
};

export default App;
