import { Metadata } from "next";
import { LoginForm } from "./LoginForm";
import "@/styles/Login/Login.css";

export default function Page() {
  return (
    <div className={"main"}>
      <h1>Log In</h1>
      <LoginForm />
    </div>
  );
}

export function generateMetadata(): Metadata {
  return {
    title: "Log In - Dignity Apparel",
  };
}
