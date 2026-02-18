'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const API = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data: res } = await axios.get(`${API}/tasks`);
      setTasks(res.data);
    } catch (err) {
      console.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleTaskAdded = (newTask) => setTasks((prev) => [newTask, ...prev]);
  const handleUpdated = (updated) =>
    setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
  const handleDeleted = (id) =>
    setTasks((prev) => prev.filter((t) => t._id !== id));

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'completed').length;
  const pending = tasks.filter((t) => t.status === 'pending').length;

  const filters = [
    { key: 'all', label: 'All', count: total },
    { key: 'pending', label: 'Pending', count: pending },
    { key: 'completed', label: 'Completed', count: completed },
  ];

  return (
    <main className="max-w-xl mx-auto px-4 py-12">
     
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-white tracking-tight">Task Manager</h1>
        <p className="text-neutral-500 text-sm mt-1">Stay organized, get things done.</p>
      </div>

     
      <div className="mb-8">
         <TaskForm onTaskAdded={handleTaskAdded} />
      </div>

      
      {total > 0 && (
        <div className="grid grid-cols-3 border border-neutral-800 rounded-2xl mb-8 overflow-hidden divide-x divide-neutral-800">
          <div className="p-4 text-center hover:bg-neutral-900/50 transition-colors cursor-default">
            <p className="text-xl font-bold text-white">{total}</p>
            <p className="text-xs text-neutral-500 mt-1">Total</p>
          </div>
          <div className="p-4 text-center hover:bg-neutral-900/50 transition-colors cursor-default">
            <p className="text-xl font-bold text-sky-500">{pending}</p>
            <p className="text-xs text-neutral-500 mt-1">Pending</p>
          </div>
          <div className="p-4 text-center hover:bg-neutral-900/50 transition-colors cursor-default">
            <p className="text-xl font-bold text-emerald-500">{completed}</p>
            <p className="text-xs text-neutral-500 mt-1">Done</p>
          </div>
        </div>
      )}

      
      <div className="flex items-center gap-2 mb-6 border-b border-neutral-800 pb-4 overflow-x-auto">
        {filters.map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-1.5 rounded-full cursor-pointer text-sm font-medium transition-all whitespace-nowrap ${
              filter === key
                ? 'bg-sky-500 text-white'
                : 'bg-transparent text-neutral-500 hover:bg-neutral-900 hover:text-sky-500'
            }`}
          >
            {label} <span className="ml-1 opacity-60 text-xs">{count}</span>
          </button>
        ))}
      </div>

     
      {loading ? (
        <div className="flex justify-center items-center py-20 text-sky-500">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-current"></div>
        </div>
      ) : (
        <div className="space-y-4">
             
            <TaskList
            tasks={tasks}
            filter={filter}
            onUpdated={handleUpdated}
            onDeleted={handleDeleted}
            />
        </div>
      )}
    </main>
  );
}