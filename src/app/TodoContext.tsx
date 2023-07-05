"use client";
import { ReactNode, createContext, useState } from "react";

export type Todo = {
  completed: boolean;
  content: string;
};

export const TodoContext = createContext<{
  todo: Todo[];
  SetTodo: (updatedTodo: Todo[]) => void;
}>({
  todo: [],
  SetTodo: () => {},
});

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todo, setTodo] = useState<Todo[]>([]);
  const SetTodo = (updatedTodo: Todo[]) => {
    setTodo(updatedTodo);
  };
  return (
    <TodoContext.Provider
      value={{
        todo,
        SetTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
