import { ArrowRight } from "lucide-react";

function StatCard({
  title,
  value,
  icon: Icon,
  color,
}) {
  return (
    <div
      className="
      bg-white
      rounded-2xl
      border
      shadow-sm
      hover:shadow-xl
      hover:-translate-y-1
      transition-all
      duration-300
      p-6
      "
    >
      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-500">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {value}
          </h2>

        </div>

        <div className={`${color} p-4 rounded-xl`}>
          <Icon size={30} className="text-white" />
        </div>

      </div>


    </div>
  );
}

export default StatCard;