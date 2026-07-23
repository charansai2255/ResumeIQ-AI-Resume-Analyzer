function AnalysisCard({
  title,
  icon: Icon,
  color,
  items,
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon className={color} size={22} />

        <h2 className={`text-xl font-bold ${color}`}>
          {title}
        </h2>
      </div>

      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex gap-2">
            <span>•</span>

            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AnalysisCard;