import connect from "../lib/connect";
import { Action, Todo } from "@/app/types";
import task from "../models/task";

let connected = false;

async function getTasks(action: Action): Promise<Todo[]> {
  if (!connected) await connect();
  if (action === "active")
    return task.find(
      {
        completed: false,
      },
      null,
      {
        lean: true,
      }
    );
  if (action === "completed")
    return task.find(
      {
        completed: true,
      },
      null,
      {
        lean: true,
      }
    );

  return task.find({}, null, {
    lean: true,
  });
}

async function addTask(content: string): Promise<string> {
  if (!connected) await connect();
  const data = new task({
    content,
  });
  const newTask = await data.save();
  return newTask._id.toString();
}

async function changeStatus(id: string): Promise<Todo | null> {
  if (!connected) await connect();
  const data = await task.findByIdAndUpdate(
    {
      _id: id,
    },
    {
      $set: {
        completed: true,
      },
    },
    {
      new: true,
    }
  );
  return data;
}

async function deleteCompletedTask(id?: string) {
  if (!connected) await connect();
  if (id) {
    return task.deleteOne({
      _id: id,
    });
  }
  return task.deleteMany({
    completed: true,
  });
}

export { getTasks, addTask, changeStatus, deleteCompletedTask };
