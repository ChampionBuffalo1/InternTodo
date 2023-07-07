"use client";

import "../styles/search.scss";
import { SyntheticEvent, useCallback, useContext, useState } from "react";
import { TodoContext } from "../TodoContext";
import { axiosInstance } from "@/lib/axiosInstance";
import { EmailContext } from "../EmailContext";

export default function SearchBar() {
  const { email } = useContext(EmailContext);
  const { todo, setTodo } = useContext(TodoContext);
  const [input, setInput] = useState<string>("");

  const handleSubmit = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault();
      if (input) {
        axiosInstance
          .post(
            "/task/addData",
            JSON.stringify({
              content: input,
            }),
            {
              headers: {
                "x-email-auth": email,
              },
            }
          )
          .then(({ data }) => {
            const email = localStorage.getItem("email")!;
            setTodo([
              ...todo,
              {
                completed: false,
                content: input,
                _id: data.id,
                createdBy: email,
              },
            ]);
          });
      }
      setInput("");
    },
    [input, email, todo, setTodo]
  );

  return (
    <div className="search">
      <input
        type="text"
        name="userinput"
        value={input}
        placeholder="Add details"
        className="input"
        onChange={(e) => {
          setInput(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit(e);
        }}
        required
      />
      <button
        className="submit"
        onClick={handleSubmit}
        disabled={input.length === 0}
      >
        Add
      </button>
    </div>
  );
}
