import type { Action } from "../page";
import { TodoContext } from "../TodoContext";
import { ChangeEvent, useCallback, useContext, useMemo } from "react";
import "../styles/todo.scss";

export default function DisplayTodo({ action }: { action: Action }) {
  const { todo, SetTodo } = useContext(TodoContext);
  const disableDeleteAll = useMemo(
    () => todo.filter((task) => task.completed).length === 0,
    [todo]
  );
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newTodo = todo.map((item, index) => {
        if (index === parseInt(e.target.id)) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      });
      SetTodo(newTodo);
    },
    [todo, SetTodo]
  );

  const handleDelete = useCallback(() => {
    const newTodo = todo.filter((item) => !item.completed);
    SetTodo(newTodo);
  }, [todo, SetTodo]);
  return (
    <>
      <div className="mt">
        {todo
          .map((item, idx) => {
            if (action === "active" && item.completed) return null;
            if (action === "completed" && !item.completed) return null;

            return (
              <div key={idx} className={action === "completed" ? "items" : ""}>
                <div>
                  <input
                    type="checkbox"
                    id={idx.toString()}
                    onChange={handleChange}
                    checked={item.completed}
                  />
                  <label
                    htmlFor={idx.toString()}
                    className={item.completed ? "labels striked" : "labels"}
                  >
                    {item.content}
                  </label>
                </div>
                {action === "completed" && (
                  <span
                    onClick={() => {
                      const newTodo = todo.filter((_, id) => id !== idx);
                      SetTodo(newTodo);
                    }}
                  >
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
              onClick={handleDelete}
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
