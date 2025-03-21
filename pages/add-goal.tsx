// pages/add-goal.tsx
import { useRouter } from "next/router";
import React, { useState } from "react";
import { dummyGoals, Goal } from "../data/dummyGoals";

export default function AddGoalPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newGoal: Goal = {
      id: (dummyGoals.length + 1).toString(),
      title,
      description,
      image_url: imageUrl,
      due_date: dueDate || undefined,
      created_at: new Date().toISOString(),
    };
    dummyGoals.unshift(newGoal);
    router.push("/dashboard");
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded shadow mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Add New Goal</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Image URL</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium">Due Date</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded
                     hover:bg-blue-700 transition"
        >
          Create Goal
        </button>
      </form>
    </div>
  );
}
