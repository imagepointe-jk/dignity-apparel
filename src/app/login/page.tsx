import { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export default function Page() {
  return (
    <>
      <h1>Log In</h1>
      <LoginForm />
    </>
  );
}

export function generateMetadata(): Metadata {
  return {
    title: "Log In - Dignity Apparel",
  };
}
