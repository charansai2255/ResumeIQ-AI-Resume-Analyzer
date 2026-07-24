import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  Code2,
  Users,
  FolderGit2,
  Laptop2,
} from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";
import { getInterviewQuestions } from "../../api/interviewQuestions";

function QuestionCard({ title, icon: Icon, questions }) {
  return (
    <div className="bg-white rounded-xl shadow border">
      <div className="flex items-center gap-3 border-b px-6 py-4">
        <Icon className="text-blue-600" size={22} />
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>

      <div className="p-6">
        <ol className="list-decimal list-inside space-y-3">
          {questions?.map((question, index) => (
            <li
              key={index}
              className="text-gray-700 leading-7"
            >
              {question}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function InterviewQuestionsResult() {
  const { resumeId } = useParams();

  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const data = await getInterviewQuestions(resumeId);

      setQuestions(data.data[0]);
    } catch {
      toast.error("Failed to load interview questions.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-96">
          <p className="text-lg font-semibold animate-pulse">
            Loading Interview Questions...
          </p>
        </div>
      </DashboardLayout>
    );
  }

  if (!questions) {
    return (
      <DashboardLayout>
        <h2 className="text-center text-xl">
          No Interview Questions Found
        </h2>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Interview Questions
          </h1>

          <p className="text-gray-500 mt-2">
            AI-generated interview questions based on your resume
          </p>
        </div>

        <div className="grid gap-8">

          <QuestionCard
            title="Technical Questions"
            icon={Code2}
            questions={questions.technical_questions}
          />

          <QuestionCard
            title="HR Questions"
            icon={Users}
            questions={questions.hr_questions}
          />

          <QuestionCard
            title="Project Questions"
            icon={FolderGit2}
            questions={questions.project_questions}
          />

          <QuestionCard
            title="Coding Questions"
            icon={Laptop2}
            questions={questions.coding_questions}
          />

        </div>

      </div>
    </DashboardLayout>
  );
}

export default InterviewQuestionsResult;