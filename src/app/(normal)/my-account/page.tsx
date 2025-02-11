import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { EditForm } from "./EditForm";
import { getCustomer } from "@/fetch/woocommerce/customers";
import { validateCustomer } from "@/types/validation/woocommerce/woocommerce";
import { ZodError } from "zod";
import { inspect } from "util";
import { Metadata } from "next";

export default async function Page() {
  const cookieStore = await cookies();
  const token = `${cookieStore.get("wp_jwt_auth")?.value}`;

  try {
    const customerResponse = await getCustomer(token);
    const customerJson = await customerResponse.json();
    const customerParsed = validateCustomer(customerJson.data.customer);

    return (
      <>
        <h1>My Account</h1>
        <EditForm customer={customerParsed} />
      </>
    );
  } catch (error) {
    if (error instanceof ZodError) {
      console.error(inspect(error, false, null));
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
