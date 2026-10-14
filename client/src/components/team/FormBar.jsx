function FormBar({ team }) {
  if (!team) return null;

  // Temporary mock form
  const form = ["W", "W", "D", "L", "W"];

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-lg mt-8">

      <h2 className="text-2xl font-bold text-white mb-6">
        Recent Form
      </h2>

      <div className="flex gap-4">

        {form.map((result, index) => (
          <div
            key={index}
            className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold
              ${
                result === "W"
                  ? "bg-green-500"
                  : result === "D"
                  ? "bg-yellow-500 text-black"
                  : "bg-red-500"
              }`}
          >
            {result}
          </div>
        ))}

      </div>

      <p className="text-slate-400 mt-6">
        <strong>Legend:</strong> W = Win, D = Draw, L = Loss
      </p>

    </div>
  );
}

export default FormBar;