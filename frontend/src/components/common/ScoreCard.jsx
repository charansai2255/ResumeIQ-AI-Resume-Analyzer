import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function ScoreCard({ score, resumeName }) {
  const getColor = () => {
    if (score >= 80) return "#16a34a";
    if (score >= 60) return "#f59e0b";
    return "#dc2626";
  };

  const getMessage = () => {
    if (score >= 80) return "Excellent Resume";
    if (score >= 60) return "Good Resume";
    return "Needs Improvement";
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-8 flex flex-col md:flex-row items-center justify-between">

      <div className="space-y-3">
        <h2 className="text-3xl font-bold">
          ATS Analysis Report
        </h2>

        <p className="text-gray-500">
          Resume: {resumeName}
        </p>

        <p className="text-sm text-gray-400">
          Generated on {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="w-44 h-44 mt-8 md:mt-0">
        <CircularProgressbar
          value={score}
          text={`${score}%`}
          styles={buildStyles({
            pathColor: getColor(),
            textColor: getColor(),
            trailColor: "#e5e7eb",
            textSize: "16px",
          })}
        />
      </div>

      <div className="text-center mt-5 md:mt-0">
        <p
          className="text-xl font-semibold"
          style={{ color: getColor() }}
        >
          {getMessage()}
        </p>
      </div>

    </div>
  );
}

export default ScoreCard;