"use client";

import "./styles/main.scss";

import { useContext, useEffect, useState } from "react";
import DisplayTodo from "./components/DisplayTodo";
import SearchBar from "./components/SearchBar";
import { Action } from "./types";
import { TodoContext } from "./TodoContext";

export default function Home() {
  const { setTodo } = useContext(TodoContext);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [action, setAction] = useState<Action>("all");

  useEffect(() => {
    setLoading(true);
    fetch("/api/task/getData?filter=" + action)
      .then((r) => r.json())
      .then(({ tasks }) => {
        setTodo(tasks);
        setLoading(false);
      });
  }, [action, setTodo]);

  return (
    <div>
      <div>
        <h1 className="heading">
          <strong>#todo</strong>
        </h1>

        <div className="status">
          <p
            className={action === "all" ? "selected selected-all" : ""}
            onClick={() => setAction("all")}
          >
            All
          </p>
          <p
            className={action === "active" ? "selected selected-active" : ""}
            onClick={() => setAction("active")}
          >
            Active
          </p>
          <p
            className={
              action === "completed" ? "selected selected-complete" : ""
            }
            onClick={() => setAction("completed")}
          >
            Completed
          </p>
        </div>
      </div>
      {action !== "completed" && <SearchBar />}
      {!isLoading && <DisplayTodo action={action} />}
      {isLoading && <div className="loading">Loading...</div>}
    </div>
  );
}
