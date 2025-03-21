// data/dummyGoals.ts
export interface Goal {
  id: string;
  title: string;
  description?: string;
  image_url?: string;
  due_date?: string;
  created_at: string;
}

// Some initial dummy data
export let dummyGoals: Goal[] = [
  {
    id: "1",
    title: "Learn TypeScript",
    description: "Master TypeScript by building real projects",
    image_url: "/placeholder.png",
    due_date: "2025-05-01",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Run a Marathon",
    description: "Train to run a full marathon by the end of the year",
    image_url: "/placeholder.png",
    due_date: "2025-12-31",
    created_at: new Date().toISOString(),
  },
];
