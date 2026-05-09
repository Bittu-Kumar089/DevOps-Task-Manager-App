import { useEffect, useState, useCallback } from 'react';
import { Plus, Search, Filter, X, RefreshCw } from 'lucide-react';
import api from '../utils/api';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const STATUSES = ['All', 'Pending', 'In Progress', 'Done'];
const PRIORITIES = ['All', 'Low', 'Medium', 'High'];

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const [filters, setFilters] = useState({
    search: '',
    status: 'All',
    priority: 'All',
  });
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(filters.search), 400);
    return () => clearTimeout(timer);
  }, [filters.search]);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (debouncedSearch) params.set('search', debouncedSearch);
      if (filters.status !== 'All') params.set('status', filters.status);
      if (filters.priority !== 'All') params.set('priority', filters.priority);

      const res = await api.get(`/tasks?${params.toString()}`);
      setTasks(res.data.tasks);
      setTotal(res.data.total);
    } catch {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, filters.status, filters.priority]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleDelete = async (id) => {
    if (!confirm('Delete this task? This cannot be undone.')) return;
    try {
      await api.delete(`/tasks/${id}`);
      toast.success('Task deleted 🗑️');
      fetchTasks();
    } catch {
      toast.error('Failed to delete task');
    }
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditTask(null);
  };

  const clearFilters = () => {
    setFilters({ search: '', status: 'All', priority: 'All' });
  };

  const hasFilters = filters.search || filters.status !== 'All' || filters.priority !== 'All';

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            My Tasks 📋
          </h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>
            {total} task{total !== 1 ? 's' : ''} found
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchTasks}
            className="btn-secondary p-2.5"
            title="Refresh"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="btn-primary"
            id="new-task-btn"
          >
            <Plus size={16} />
            New Task
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 mb-6">
        <div className="flex flex-wrap gap-3 items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-48">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
            <input
              value={filters.search}
              onChange={(e) => setFilters((p) => ({ ...p, search: e.target.value }))}
              placeholder="Search tasks..."
              className="input-field pl-9"
            />
            {filters.search && (
              <button
                onClick={() => setFilters((p) => ({ ...p, search: '' }))}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--text-secondary)' }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-1 flex-wrap">
            <Filter size={14} style={{ color: 'var(--text-secondary)' }} />
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => setFilters((p) => ({ ...p, status: s }))}
                className="text-xs px-3 py-1.5 rounded-full font-medium transition-all"
                style={{
                  background: filters.status === s ? 'rgba(99,102,241,0.2)' : 'var(--bg-secondary)',
                  color: filters.status === s ? '#818cf8' : 'var(--text-secondary)',
                  border: `1px solid ${filters.status === s ? 'rgba(99,102,241,0.4)' : 'var(--border)'}`,
                }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Priority filter */}
          <div className="flex items-center gap-1 flex-wrap">
            {PRIORITIES.map((p) => (
              <button
                key={p}
                onClick={() => setFilters((prev) => ({ ...prev, priority: p }))}
                className="text-xs px-3 py-1.5 rounded-full font-medium transition-all"
                style={{
                  background: filters.priority === p ? 'rgba(168,85,247,0.2)' : 'var(--bg-secondary)',
                  color: filters.priority === p ? '#c084fc' : 'var(--text-secondary)',
                  border: `1px solid ${filters.priority === p ? 'rgba(168,85,247,0.4)' : 'var(--border)'}`,
                }}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Clear filters */}
          {hasFilters && (
            <button onClick={clearFilters} className="btn-secondary text-xs px-3 py-1.5">
              <X size={12} />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Task grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <LoadingSpinner size="lg" text="Loading tasks..." />
        </div>
      ) : tasks.length === 0 ? (
        <div className="glass-card text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mx-auto mb-4">
            <Search size={28} style={{ color: '#6366f1' }} />
          </div>
          <p className="font-semibold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>
            {hasFilters ? 'No tasks match your filters' : 'No tasks yet'}
          </p>
          <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>
            {hasFilters ? 'Try adjusting your search or filters' : 'Create your first task to get started!'}
          </p>
          {!hasFilters && (
            <button onClick={() => setShowModal(true)} className="btn-primary mx-auto">
              <Plus size={14} />
              Create Task
            </button>
          )}
          {hasFilters && (
            <button onClick={clearFilters} className="btn-secondary mx-auto">
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Kanban-style grouped view */}
          {filters.status === 'All' ? (
            <div className="space-y-6">
              {['Pending', 'In Progress', 'Done'].map((status) => {
                const statusTasks = tasks.filter((t) => t.status === status);
                if (statusTasks.length === 0) return null;

                const dotColors = { 'Pending': '#fbbf24', 'In Progress': '#818cf8', 'Done': '#22c55e' };

                return (
                  <div key={status}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: dotColors[status] }} />
                      <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                        {status}
                      </h3>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
                      >
                        {statusTasks.length}
                      </span>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {statusTasks.map((task) => (
                        <TaskCard key={task._id} task={task} onEdit={handleEdit} onDelete={handleDelete} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasks.map((task) => (
                <TaskCard key={task._id} task={task} onEdit={handleEdit} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </>
      )}

      {/* Modal */}
      {showModal && (
        <TaskModal task={editTask} onClose={handleModalClose} onSaved={fetchTasks} />
      )}
    </div>
  );
};

export default Tasks;
