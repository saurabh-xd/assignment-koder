'use client';
import TaskCard from './TaskCard';

export default function TaskList({ tasks, filter, onUpdated, onDeleted }) {
  const filtered = tasks.filter((t) => {
    if (filter === 'all') return true;
    return t.status === filter;
  });

  const emptyMessages = {
    all: {  text: 'No tasks yet. Create your first task above!' },
    pending: {  text: 'No pending tasks. Great job!' },
    completed: {  text: 'No completed tasks yet.' },
  };

  if (filtered.length === 0) {
    const {  text } = emptyMessages[filter];
    return (
      <div className="flex flex-col items-center justify-center py-20 border border-dashed border-neutral-800 rounded-2xl bg-neutral-900/20">
       
        <p className="text-neutral-500 text-sm font-medium">{text}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {filtered.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onUpdated={onUpdated}
          onDeleted={onDeleted}
        />
      ))}
    </div>
  );
}