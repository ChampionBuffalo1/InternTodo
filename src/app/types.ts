export type Todo = {
  _id: string;
  completed: boolean;
  content: string;
};

export type Action = "all" | "active" | "completed";
