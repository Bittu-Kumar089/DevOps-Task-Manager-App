import { useState } from 'react';
import { User, Mail, Shield, Calendar, Camera, Save, Loader } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    avatar: user?.avatar || '',
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error('Name is required');
      return;
    }
    setLoading(true);
    try {
      const res = await api.put('/auth/profile', form);
      updateUser(res.data.user);
      toast.success('Profile updated successfully! ✅');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Profile ⚙️
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Manage your personal information
        </p>
      </div>

      {/* Profile hero card */}
      <div className="glass-card p-6 mb-6 text-center">
        {/* Avatar */}
        <div className="relative w-24 h-24 mx-auto mb-4">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
            {form.avatar ? (
              <img src={form.avatar} alt={form.name} className="w-full h-full object-cover" />
            ) : (
              user?.name?.[0]?.toUpperCase() || 'U'
            )}
          </div>
          <div
            className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer"
            style={{ background: '#6366f1' }}
            title="Change avatar (provide URL in the field below)"
          >
            <Camera size={12} className="text-white" />
          </div>
        </div>

        <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
          {user?.name}
        </h2>
        <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
          {user?.email}
        </p>

        {/* Badges */}
        <div className="flex items-center justify-center gap-3">
          <span
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium"
            style={{ background: 'rgba(99,102,241,0.15)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.3)' }}
          >
            <Shield size={12} />
            {user?.role || 'User'}
          </span>
          <span
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium"
            style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.3)' }}
          >
            <Calendar size={12} />
            Joined {formatDate(user?.createdAt)}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        {['profile', 'security'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="text-sm px-4 py-2 rounded-lg font-medium capitalize transition-all"
            style={{
              background: activeTab === tab ? 'rgba(99,102,241,0.2)' : 'var(--bg-secondary)',
              color: activeTab === tab ? '#818cf8' : 'var(--text-secondary)',
              border: `1px solid ${activeTab === tab ? 'rgba(99,102,241,0.4)' : 'var(--border)'}`,
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="glass-card p-6 fade-in-up">
          <form onSubmit={handleSave} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                Full Name
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="input-field pl-9"
                  placeholder="Your full name"
                  required
                />
              </div>
            </div>

            {/* Email (read-only) */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
                <input
                  type="email"
                  value={user?.email || ''}
                  className="input-field pl-9 cursor-not-allowed opacity-60"
                  readOnly
                />
              </div>
              <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Email cannot be changed</p>
            </div>

            {/* Avatar URL */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                Avatar URL
              </label>
              <div className="relative">
                <Camera size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
                <input
                  type="url"
                  name="avatar"
                  value={form.avatar}
                  onChange={handleChange}
                  className="input-field pl-9"
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>
              <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                Enter a URL to an image (S3, Gravatar, etc.)
              </p>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                Bio
              </label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                rows={3}
                placeholder="Tell us about yourself..."
                className="input-field resize-none"
                maxLength={200}
              />
              <p className="text-xs mt-1 text-right" style={{ color: 'var(--text-secondary)' }}>
                {form.bio.length}/200
              </p>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3">
              {loading ? <LoadingSpinner size="sm" /> : (
                <>
                  <Save size={16} />
                  Save Changes
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="glass-card p-6 fade-in-up">
          <h3 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Security Settings</h3>

          <div
            className="p-4 rounded-xl mb-4"
            style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)' }}
          >
            <div className="flex items-center gap-3">
              <Shield size={20} style={{ color: '#6366f1' }} />
              <div>
                <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>JWT Authentication</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                  Your account is secured with industry-standard JWT tokens
                </p>
              </div>
            </div>
          </div>

          <div
            className="p-4 rounded-xl mb-4"
            style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <div>
                <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Password Hashing</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                  Your password is securely hashed with bcrypt (12 rounds)
                </p>
              </div>
            </div>
          </div>

          <p className="text-xs text-center mt-4" style={{ color: 'var(--text-secondary)' }}>
            To change your password, please contact your administrator.
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
