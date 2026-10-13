function StatCard({ title, value, subtitle }) {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-800">

      <p className="text-slate-400 text-sm">
        {title}
      </p>

      <h2 className="text-4xl font-bold text-white mt-2">
        {value}
      </h2>

      {subtitle && (
        <p className="text-sky-400 mt-3 text-sm">
          {subtitle}
        </p>
      )}

    </div>
  );
}

export default StatCard;