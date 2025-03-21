// pages/goals/[id].tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { dummyGoals, Goal } from "../../data/dummyGoals";

export default function GoalDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [goal, setGoal] = useState<Goal | null>(null);

  useEffect(() => {
    if (id) {
      const found = dummyGoals.find((g) => g.id === id);
      setGoal(found || null);
    }
  }, [id]);

  const handleDelete = () => {
    if (!goal) return;
    const index = dummyGoals.findIndex((g) => g.id === id);
    if (index !== -1) {
      dummyGoals.splice(index, 1);
      router.push("/dashboard");
    }
  };

  if (!goal) {
    return <p className="text-center mt-10">No goal found.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <button
        onClick={() => router.back()}
        className="text-blue-600 hover:underline mb-4"
      >
        &larr; Back
      </button>
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold mb-4">{goal.title}</h1>
        <img
          src={goal.image_url || "/placeholder.png"}
          alt={goal.title}
          className="w-full h-auto rounded mb-4"
        />
        {goal.due_date && (
          <p className="text-gray-600 mb-2">
            Due: {new Date(goal.due_date).toLocaleDateString()}
          </p>
        )}
        <p className="mb-4">{goal.description}</p>
        <div className="flex space-x-4">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
          {/* If you want an Edit page, add a button/link here */}
        </div>
      </div>
    </div>
  );
}
