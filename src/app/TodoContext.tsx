"use client";
import { Todo } from "./types";
import { ReactNode, createContext, useState } from "react";

export const TodoContext = createContext<{
  todo: Todo[];
  setTodo: (updatedTodo: Todo[]) => void;
}>({
  todo: [],
  setTodo: () => {},
});

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todo, setTodo] = useState<Todo[]>([]);
  return (
    <TodoContext.Provider
      value={{
        todo,
        setTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
