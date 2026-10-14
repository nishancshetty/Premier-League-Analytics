function GlassPanel({ title, children, className = "" }) {
  return (
    <div className={`glass-panel ${className}`}>
      {title && (
        <div className="glass-panel-header">
          <h3>{title}</h3>
        </div>
      )}

      <div className="glass-panel-body">
        {children}
      </div>
    </div>
  );
}

export default GlassPanel;