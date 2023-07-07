"use client";

import "./styles/form.scss";
import { useRouter } from "next/navigation";
import { EmailContext } from "./EmailContext";
import { axiosInstance } from "@/lib/axiosInstance";
import { useState, useEffect, useContext, FormEvent, useCallback } from "react";

export default function LoginForm() {
  const { email, setEmail } = useContext(EmailContext);
  const [username, setUsername] = useState<string>("");
  const [keepLoggedIn, setKeepLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const localEmail = localStorage.getItem("email");
    if (localEmail) {
      setEmail(localEmail);
      router.push("/todo");
    }
  }, [router, setEmail]);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      axiosInstance
        .post(
          "/user",
          JSON.stringify({
            email,
            username,
          })
        )
        .then(async ({ data }) => {
          if (data.exists) {
            if (keepLoggedIn) localStorage.setItem("email", email);
            router.push("/todo");
          } else {
            const { data } = await axiosInstance.post(
              "/user/register",
              JSON.stringify({
                username,
                email,
              })
            );
            if (data.user && keepLoggedIn) {
              localStorage.setItem("email", email);
            }
            router.push("/todo");
          }
        });
    },
    [email, username, keepLoggedIn, router]
  );

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        id="name"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your name"
        autoComplete="name"
        required
      />

      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
      />

      <div className="loggedIn">
        <input
          type="checkbox"
          id="keepLoggedIn"
          checked={keepLoggedIn}
          onChange={() => setKeepLoggedIn(!keepLoggedIn)}
        />
        <label htmlFor="keepLoggedIn">Keep me logged in</label>
      </div>

      <button type="submit">Login</button>
    </form>
  );
}
