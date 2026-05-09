const StatsCard = ({ icon: Icon, label, value, color, percentage, suffix = '' }) => {
  const colorMap = {
    indigo: {
      bg: 'rgba(99,102,241,0.1)',
      border: 'rgba(99,102,241,0.2)',
      icon: '#6366f1',
      bar: 'from-indigo-500 to-indigo-400',
    },
    yellow: {
      bg: 'rgba(251,191,36,0.1)',
      border: 'rgba(251,191,36,0.2)',
      icon: '#fbbf24',
      bar: 'from-yellow-500 to-yellow-400',
    },
    purple: {
      bg: 'rgba(168,85,247,0.1)',
      border: 'rgba(168,85,247,0.2)',
      icon: '#a855f7',
      bar: 'from-purple-500 to-purple-400',
    },
    green: {
      bg: 'rgba(34,197,94,0.1)',
      border: 'rgba(34,197,94,0.2)',
      icon: '#22c55e',
      bar: 'from-green-500 to-green-400',
    },
  };

  const c = colorMap[color] || colorMap.indigo;

  return (
    <div
      className="glass-card p-5 card-hover fade-in-up"
      style={{ background: c.bg, borderColor: c.border }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${c.icon}20` }}
        >
          <Icon size={20} style={{ color: c.icon }} />
        </div>
        {percentage !== undefined && (
          <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: `${c.icon}20`, color: c.icon }}>
            {percentage}%
          </span>
        )}
      </div>

      <div>
        <p className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
          {value}{suffix}
        </p>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{label}</p>
      </div>

      {percentage !== undefined && (
        <div className="progress-bar mt-3">
          <div
            className={`progress-fill bg-gradient-to-r ${c.bar}`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default StatsCard;
