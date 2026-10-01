import Card from "./Card";

function StatCard({
  title,
  value,
  subtitle,
  icon,
  color = "text-blue-400",
}) {
  return (
    <Card className="flex items-center justify-between">
      <div>
        <p className="text-slate-400 text-sm">{title}</p>

        <h2 className={`text-3xl font-bold mt-1 ${color}`}>
          {value}
        </h2>

        {subtitle && (
          <p className="text-slate-500 text-sm mt-2">
            {subtitle}
          </p>
        )}
      </div>

      <div className="text-4xl text-slate-500">
        {icon}
      </div>
    </Card>
  );
}

export default StatCard;