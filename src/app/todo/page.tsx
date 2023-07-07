"use client";

import "@styles/main.scss";
import { Action } from "../types";
import { TodoContext } from "../TodoContext";
import { EmailContext } from "../EmailContext";
import SearchBar from "../components/SearchBar";
import { axiosInstance } from "@/lib/axiosInstance";
import DisplayTodo from "../components/DisplayTodo";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { setTodo } = useContext(TodoContext);
  const { email, setEmail } = useContext(EmailContext);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [action, setAction] = useState<Action>("all");
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    if (email) {
      axiosInstance
        .get("/task/getData?filter=" + action, {
          headers: {
            "x-email-auth": email,
          },
        })
        .then(({ data }) => {
          setTodo(data.tasks);
          setLoading(false);
        });
    }
  }, [action, email, setTodo]);

  return (
    <>
      <div>
        <div>
          <h1 className="heading">
            <strong>#todo</strong>
          </h1>
          <button
            className="tr"
            onClick={(event) => {
              event.preventDefault();
              setEmail("");
              localStorage.removeItem("email");
              router.push("/");
            }}
          >
            Logout
          </button>
        </div>

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
    </>
  );
}
