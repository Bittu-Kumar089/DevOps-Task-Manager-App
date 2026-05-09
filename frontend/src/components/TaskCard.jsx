import { Pencil, Trash2, Calendar, Tag } from 'lucide-react';

const statusConfig = {
  'Pending': { class: 'badge-pending', dot: '#fbbf24' },
  'In Progress': { class: 'badge-inprogress', dot: '#818cf8' },
  'Done': { class: 'badge-done', dot: '#22c55e' },
};

const priorityConfig = {
  'Low': 'badge-low',
  'Medium': 'badge-medium',
  'High': 'badge-high',
};

const TaskCard = ({ task, onEdit, onDelete }) => {
  const sc = statusConfig[task.status] || statusConfig['Pending'];
  const pc = priorityConfig[task.priority] || 'badge-medium';

  const formatDate = (date) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'Done';

  return (
    <div className="glass-card p-4 card-hover fade-in-up group">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 flex-wrap flex-1">
          {/* Status dot */}
          <span className="w-2 h-2 rounded-full flex-shrink-0 mt-1" style={{ background: sc.dot }} />
          <h3
            className="font-semibold text-sm leading-snug"
            style={{
              color: 'var(--text-primary)',
              textDecoration: task.status === 'Done' ? 'line-through' : 'none',
              opacity: task.status === 'Done' ? 0.7 : 1,
            }}
          >
            {task.title}
          </h3>
        </div>

        {/* Actions */}
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 rounded-lg hover:bg-indigo-500/20 transition-colors"
            style={{ color: '#6366f1' }}
            title="Edit task"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="p-1.5 rounded-lg hover:bg-red-500/20 transition-colors"
            style={{ color: '#ef4444' }}
            title="Delete task"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p
          className="text-xs mb-3 line-clamp-2"
          style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}
        >
          {task.description}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Status badge */}
          <span className={`${sc.class} text-xs px-2 py-0.5 rounded-full font-medium`}>
            {task.status}
          </span>
          {/* Priority badge */}
          <span className={`${pc} text-xs px-2 py-0.5 rounded-full font-medium`}>
            {task.priority}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Tags */}
          {task.tags?.length > 0 && (
            <div className="flex items-center gap-1">
              <Tag size={10} style={{ color: 'var(--text-secondary)' }} />
              <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                {task.tags.slice(0, 2).join(', ')}
                {task.tags.length > 2 && ` +${task.tags.length - 2}`}
              </span>
            </div>
          )}

          {/* Due date */}
          {task.dueDate && (
            <div className="flex items-center gap-1">
              <Calendar size={10} style={{ color: isOverdue ? '#ef4444' : 'var(--text-secondary)' }} />
              <span
                className="text-xs"
                style={{ color: isOverdue ? '#ef4444' : 'var(--text-secondary)' }}
              >
                {formatDate(task.dueDate)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
