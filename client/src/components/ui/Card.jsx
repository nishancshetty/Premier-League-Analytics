function Card({ children, className = "" }) {
  return (
    <div
      className={`
        bg-slate-900
        border
        border-slate-800
        rounded-xl
        p-6
        shadow-lg
        transition-all
        duration-300
        hover:border-blue-500
        hover:shadow-blue-500/10
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Card;    