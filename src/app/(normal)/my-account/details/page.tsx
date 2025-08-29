import { redirect } from "next/navigation";
import { EditForm } from "./EditForm";
import { ZodError } from "zod";
import { Metadata } from "next";
import { getLoggedInCustomer } from "@/utility/auth";

export default async function Page() {
  try {
    const customer = await getLoggedInCustomer();
    return (
      <>
        <EditForm customer={customer} />
      </>
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return (
        <>
          <h1>My Account</h1>
          <p>There was an error retrieving your data.</p>
        </>
      );
    }

    redirect("/login");
  }
}

export function generateMetadata(): Metadata {
  return {
    title: "My Account - Dignity Apparel",
  };
}
