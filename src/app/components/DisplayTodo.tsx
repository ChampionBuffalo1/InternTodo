"use client";
import "../styles/todo.scss";
import type { Action, Todo } from "../types";
import { TodoContext } from "../TodoContext";
import { useCallback, useContext, useMemo } from "react";

export default function DisplayTodo({ action }: { action: Action }) {
  const { todo, setTodo } = useContext(TodoContext);
  const disableDeleteAll = useMemo(
    () => todo.filter((task) => task.completed).length === 0,
    [todo]
  );
  const handleChange = useCallback(
    (item: Todo) => {
      if (item.completed) return;
      fetch("/api/task/changeStatus", {
        method: "POST",
        body: JSON.stringify({
          id: item._id,
        }),
      })
        .then((res) => res.json())
        .then(() => {
          const newTodo = todo.map((litem) => {
            if (litem._id === item._id) {
              return {
                ...litem,
                completed: !litem.completed,
              };
            }
            return litem;
          });
          setTodo(newTodo);
        });
    },
    [todo, setTodo]
  );

  const handleDelete = useCallback(
    (id?: string) => {
      if (id) {
        fetch("/api/task/deleteData", {
          method: "POST",
          body: JSON.stringify({
            id,
          }),
        })
          .then((res) => res.json())
          .then(({ deleteCount }) => {
            if (deleteCount === 1) {
              const newTodo = todo.filter((item) => item._id !== id);
              setTodo(newTodo);
            }
          });
        return;
      }

      const oldCount = todo.length;
      fetch("/api/task/deleteAll", {
        method: "POST",
        body: JSON.stringify({}),
      })
        .then((res) => res.json())
        .then(({ deleteCount }) => {
          const newTodo = todo.filter((item) => !item.completed);
          setTodo(newTodo);
          console.assert(newTodo.length === oldCount - deleteCount);
        });
    },
    [todo, setTodo]
  );

  return (
    <>
      <div className="mt">
        {todo
          .map((item) => {
            if (action === "active" && item.completed) return null;
            if (action === "completed" && !item.completed) return null;

            return (
              <div
                key={item._id}
                className={action === "completed" ? "items" : ""}
              >
                <div>
                  <input
                    type="checkbox"
                    id={item._id}
                    onChange={() => handleChange(item)}
                    checked={item.completed}
                  />
                  <label
                    htmlFor={item._id}
                    className={item.completed ? "labels striked" : "labels"}
                  >
                    {item.content}
                  </label>
                </div>
                {action === "completed" && (
                  <span onClick={() => handleDelete(item._id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                      width={60}
                      height={30}
                    >
                      <path d="M2 3a1 1 0 00-1 1v1a1 1 0 001 1h16a1 1 0 001-1V4a1 1 0 00-1-1H2z" />
                      <path
                        fillRule="evenodd"
                        d="M2 7.5h16l-.811 7.71a2 2 0 01-1.99 1.79H4.802a2 2 0 01-1.99-1.79L2 7.5zm5.22 1.72a.75.75 0 011.06 0L10 10.94l1.72-1.72a.75.75 0 111.06 1.06L11.06 12l1.72 1.72a.75.75 0 11-1.06 1.06L10 13.06l-1.72 1.72a.75.75 0 01-1.06-1.06L8.94 12l-1.72-1.72a.75.75 0 010-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </div>
            );
          })
          .filter(Boolean)}
      </div>

      <div>
        {action === "completed" && (
          <div className="container">
            <button
              className="delete"
              onClick={() => handleDelete()}
              disabled={disableDeleteAll}
            >
              Delete All
            </button>
          </div>
        )}
      </div>
    </>
  );
}
