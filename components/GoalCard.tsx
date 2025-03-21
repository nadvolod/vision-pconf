// components/GoalCard.tsx
import { useRouter } from "next/router";
import { Goal } from "../data/dummyGoals";

interface Props {
  goal: Goal;
}

export default function GoalCard({ goal }: Props) {
  const router = useRouter();

  const handleView = () => {
    router.push(`/goals/${goal.id}`);
  };

  return (
    <div
      onClick={handleView}
      className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-lg transition"
    >
      <img
        src={goal.image_url || "/placeholder.png"}
        alt={goal.title}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-semibold">{goal.title}</h3>
      {goal.due_date && (
        <p className="text-gray-600 mt-1">
          Due: {new Date(goal.due_date).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}
