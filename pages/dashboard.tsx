// pages/dashboard.tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import GoalCard from "../components/GoalCard";
import { dummyGoals, Goal } from "../data/dummyGoals";

export default function DashboardPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Load dummy goals in memory
    setGoals(dummyGoals);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">My Vision Board</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>
      <div className="mt-8 text-center">
        <button
          onClick={() => {
            console.log("Navigating to /add-goal");
            router.push("/add-goal");
          }}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Add Goal
        </button>
      </div>
    </div>
  );
}
