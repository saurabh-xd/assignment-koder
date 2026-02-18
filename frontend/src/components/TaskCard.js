'use client';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import EditModal from './EditModal';

const API = process.env.NEXT_PUBLIC_API_URL;

export default function TaskCard({ task, onUpdated, onDeleted }) {
  const [showEdit, setShowEdit] = useState(false);
  const [toggling, setToggling] = useState(false);

  
  const isCompleted = task.status === 'completed';

  const handleToggle = async () => {
    setToggling(true);
    try {
      const { data: res } = await axios.patch(`${API}/tasks/${task._id}/toggle`);
      onUpdated(res.data);
    } catch {
      toast.error('Failed to update status');
    } finally {
      setToggling(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Delete this task?')) return;
    try {
      await axios.delete(`${API}/tasks/${task._id}`);
      onDeleted(task._id);
      toast.success('Task deleted');
    } catch {
      toast.error('Failed to delete task');
    }
  };

 
  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });

  return (
    <>
      
      <div
        className={`group p-4 flex items-start gap-4 border-b border-neutral-800 hover:bg-neutral-900/50 transition-all ${
          isCompleted ? 'opacity-50' : ''
        }`}
      >
     
        <button
          onClick={handleToggle}
          disabled={toggling}
          className={`w-5 h-5 rounded-full border flex items-center justify-center cursor-pointer flex-shrink-0 mt-1 transition-all ${
            isCompleted
              ? 'bg-sky-500 border-sky-500 text-white'
              : 'border-neutral-600 hover:border-sky-500 bg-transparent'
          }`}
          title="Toggle status"
        >
          {isCompleted && (
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div>
                <p
                    className={`text-base font-medium ${
                    isCompleted ? 'line-through text-neutral-500' : 'text-white'
                    }`}
                >
                    {task.title}
                </p>
                {task.description && (
                    <p className="text-sm text-neutral-500 mt-1 break-words">{task.description}</p>
                )}
            </div>
            
            
             <span className="text-xs text-neutral-600 whitespace-nowrap ml-4">
              {formatDate(task.createdAt)}
            </span>
          </div>

         
          <div className="flex items-center gap-6 mt-3 pt-1">
             
            <button
              onClick={() => setShowEdit(true)}
              className="flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-sky-500 transition-colors cursor-pointer group/edit"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </button>

          
            <button
              onClick={handleDelete}
              className="flex items-center gap-1.5 text-xs font-medium text-neutral-500 cursor-pointer hover:text-red-500 transition-colors group/delete"
            >
               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>

      {showEdit && (
        <EditModal
          task={task}
          onClose={() => setShowEdit(false)}
          onUpdated={onUpdated}
        />
      )}
    </>
  );
}