import { Todo } from "@/app/types";
import { Schema, model } from "mongoose";

const taskSchema = new Schema<Todo>({
  content: {
    type: String,
    required: [true, "Task must have content"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: String,
    required: true,
  },
});

const TaskModel = model<Todo>("Tasks", taskSchema, "Task");
export default TaskModel;
