'use client';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const API = process.env.NEXT_PUBLIC_API_URL;

export default function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return toast.error('Title is required');

    setLoading(true);
    try {
      const { data: res} = await axios.post(`${API}/tasks`, { title, description });
      onTaskAdded(res.data);
      setTitle('');
      setDescription('');
      toast.success('Task created!');
    } catch {
      toast.error('Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="border border-neutral-800 rounded-2xl p-4 mb-6 bg-black">
      <form onSubmit={handleSubmit} className="space-y-4">
        
       
        <div>
          <input
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
           
            className="w-full bg-transparent text-xl font-medium text-white placeholder-neutral-500 border-none outline-none focus:ring-0 px-0"
          />
        </div>

        <div className="border-b border-neutral-800 w-full opacity-50"></div>

     
        <div>
          <textarea
            rows={2}
            placeholder="Add details (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
           
            className="w-full bg-transparent text-neutral-300 text-sm placeholder-neutral-600 border-none outline-none focus:ring-0 px-0 resize-none"
          />
        </div>

      
        <div className="flex justify-between items-center pt-2">
        

          <button
            type="submit"
            disabled={loading}
          
            className="bg-sky-500 hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2 px-6 rounded-full text-sm transition-all cursor-pointer"
          >
            {loading ? 'adding...' : 'Add Task'}
          </button>
        </div>
      </form>
    </div>
  );
}