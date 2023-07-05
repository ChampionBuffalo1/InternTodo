"use client";

import "./styles/main.scss";

import { useState } from "react";
import DisplayTodo from "./components/DisplayTodo";
import SearchBar from "./components/SearchBar";

export type Action = "all" | "active" | "completed";

export default function Home() {
  const [action, setAction] = useState<Action>("active");

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
      <DisplayTodo action={action} />
    </div>
  );
}
