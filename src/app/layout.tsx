import { EmailProvider } from "./EmailContext";
import { TodoProvider } from "./TodoContext";
import "./styles/globals.scss";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Todo App",
  description: "A simple todo app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <EmailProvider>
          <TodoProvider>{children}</TodoProvider>
        </EmailProvider>
      </body>
    </html>
  );
}
