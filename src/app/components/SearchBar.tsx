"use client";

import "../styles/search.scss";
import { SyntheticEvent, useCallback, useContext, useState } from "react";
import { TodoContext } from "../TodoContext";

export default function SearchBar() {
  const { todo, setTodo } = useContext(TodoContext);
  const [input, setInput] = useState<string>("");

  const handleSubmit = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault();
      if (input) {
        fetch("/api/task/addData", {
          method: "POST",
          body: JSON.stringify({
            content: input,
          }),
        })
          .then((r) => r.json())
          .then(({ id }) => {
            setTodo([
              ...todo,
              {
                completed: false,
                content: input,
                _id: id,
              },
            ]);
          });
      }
      setInput("");
    },
    [input, todo, setTodo]
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
