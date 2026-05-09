import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckSquare, Clock, Loader2, BarChart2, Plus, ArrowRight, Zap } from 'lucide-react';
import api from '../utils/api';
import StatsCard from '../components/StatsCard';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState({ tasks: [], stats: { total: 0, pending: 0, inProgress: 0, done: 0 } });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const fetchData = async () => {
    try {
      const res = await api.get('/tasks?limit=6');
      setData(res.data);
    } catch {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this task?')) return;
    try {
      await api.delete(`/tasks/${id}`);
      toast.success('Task deleted');
      fetchData();
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

  const { stats, tasks } = data;
  const donePercent = stats.total ? Math.round((stats.done / stats.total) * 100) : 0;

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Welcome header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Dashboard{' '}
            <span className="text-2xl">🚀</span>
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            Track your DevOps tasks and stay on top of your workflow
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary"
          id="create-task-btn"
        >
          <Plus size={16} />
          New Task
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <LoadingSpinner size="xl" text="Loading dashboard..." />
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatsCard
              icon={BarChart2}
              label="Total Tasks"
              value={stats.total}
              color="indigo"
              percentage={100}
            />
            <StatsCard
              icon={Clock}
              label="Pending"
              value={stats.pending}
              color="yellow"
              percentage={stats.total ? Math.round((stats.pending / stats.total) * 100) : 0}
            />
            <StatsCard
              icon={Loader2}
              label="In Progress"
              value={stats.inProgress}
              color="purple"
              percentage={stats.total ? Math.round((stats.inProgress / stats.total) * 100) : 0}
            />
            <StatsCard
              icon={CheckSquare}
              label="Completed"
              value={stats.done}
              color="green"
              percentage={donePercent}
            />
          </div>

          {/* Overall Progress */}
          {stats.total > 0 && (
            <div className="glass-card p-5 mb-8">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Zap size={16} style={{ color: '#6366f1' }} />
                  <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Overall Progress</span>
                </div>
                <span className="text-sm font-bold gradient-text">{donePercent}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${donePercent}%` }} />
              </div>
              <p className="text-xs mt-2" style={{ color: 'var(--text-secondary)' }}>
                {stats.done} of {stats.total} tasks completed
              </p>
            </div>
          )}

          {/* Recent Tasks */}
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>
                Recent Tasks
              </h2>
              <Link
                to="/tasks"
                className="flex items-center gap-1 text-xs font-medium hover:underline"
                style={{ color: '#6366f1' }}
              >
                View all <ArrowRight size={12} />
              </Link>
            </div>

            {tasks.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center mx-auto mb-4">
                  <CheckSquare size={28} style={{ color: '#6366f1' }} />
                </div>
                <p className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>No tasks yet</p>
                <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>Create your first task to get started!</p>
                <button onClick={() => setShowModal(true)} className="btn-primary">
                  <Plus size={14} />
                  Create Task
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Task Modal */}
      {showModal && (
        <TaskModal
          task={editTask}
          onClose={handleModalClose}
          onSaved={fetchData}
        />
      )}
    </div>
  );
};

export default Dashboard;
