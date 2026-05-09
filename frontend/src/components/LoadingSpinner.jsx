const LoadingSpinner = ({ size = 'md', text = '' }) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
    xl: 'w-16 h-16 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`${sizes[size]} rounded-full border-indigo-500 border-t-transparent animate-spin`}
        style={{
          borderColor: 'rgba(99,102,241,0.3)',
          borderTopColor: '#6366f1',
        }}
      />
      {text && (
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
