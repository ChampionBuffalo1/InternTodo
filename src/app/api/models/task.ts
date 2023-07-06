import { Todo } from "@/app/types";
import { Schema, model } from "mongoose";

const taskSchema = new Schema<Todo>({
  content: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const TaskModel = model<Todo>("Task", taskSchema, "Task");
export default TaskModel;
