import "@/lib/connect";
import { Action, Todo } from "@/app/types";
import task from "../models/Tasks";

async function getTasks(action: Action, userId: string): Promise<Todo[]> {
  if (action === "active")
    return task.find(
      {
        completed: false,
        createdBy: userId,
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
        createdBy: userId,
      },
      null,
      {
        lean: true,
      }
    );

  return task.find(
    {
      createdBy: userId,
    },
    null,
    {
      lean: true,
    }
  );
}

async function addTask(content: string, createdBy: string): Promise<string> {
  const data = new task({
    content,
    createdBy,
  });
  const newTask = await data.save();
  return newTask._id.toString();
}

async function changeStatus(
  id: string,
  createdBy: string
): Promise<Todo | null> {
  const data = await task.findByIdAndUpdate(
    {
      _id: id,
      createdBy,
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

async function deleteCompletedTask(createdBy: string, id?: string) {
  if (id) {
    return task.deleteOne({
      _id: id,
      createdBy,
    });
  }
  return task.deleteMany({
    completed: true,
    createdBy,
  });
}

export { getTasks, addTask, changeStatus, deleteCompletedTask };
