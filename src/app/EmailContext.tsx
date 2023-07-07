"use client";

import { ReactNode, createContext, useEffect, useState } from "react";

interface IEmail {
  email: string;
  setEmail: (newmail: string) => void;
}

export const EmailContext = createContext<IEmail>({
  email: "",
  setEmail: () => {},
});

export const EmailProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState<string>("");
  return (
    <EmailContext.Provider value={{ email, setEmail }}>
      {children}
    </EmailContext.Provider>
  );
};
