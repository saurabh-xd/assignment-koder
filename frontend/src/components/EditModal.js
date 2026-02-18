'use client';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const API = process.env.NEXT_PUBLIC_API_URL;

export default function EditModal({ task, onClose, onUpdated }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) return toast.error('Title is required');
    setLoading(true);
    try {
      const { data: res } = await axios.put(`${API}/tasks/${task._id}`, {
        title,
        description,
        status,
      });
      onUpdated(res.data);
      toast.success('Task updated!');
      onClose();
    } catch {
      toast.error('Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div
      className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 px-4"
      onClick={onClose}
    >
     
      <div
        className="bg-black border border-neutral-800 rounded-2xl shadow-2xl p-6 w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
       
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Edit Task</h2>
            <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        <div className="space-y-5">
         
          <div>
            <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wide mb-1.5">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-600 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wide mb-1.5">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task description"
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-600 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all resize-none"
            />
          </div>

         
          <div>
            <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wide mb-1.5">
              Status
            </label>
            <div className="relative">
                <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all appearance-none cursor-pointer"
                >
                    <option value="pending"> Pending</option>
                    <option value="completed"> Completed</option>
                </select>
               
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
          </div>
        </div>

       
        <div className="flex gap-3 mt-8 pt-4 border-t border-neutral-800">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-full border cursor-pointer border-neutral-700 text-white hover:bg-neutral-900 font-semibold text-sm transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex-1 py-2.5 rounded-full cursor-pointer bg-sky-500 hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm transition-all shadow-lg shadow-sky-500/20"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}