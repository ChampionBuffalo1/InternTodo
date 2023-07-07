type MongoId = {
  _id: string;
};

export type Todo = MongoId & {
  content: string;
  createdBy: string;
  completed: boolean;
};

export type User = MongoId & {
  username: string;
  email: string;
};

export type Action = "all" | "active" | "completed";
