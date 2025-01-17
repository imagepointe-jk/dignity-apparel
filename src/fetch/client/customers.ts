import { env } from "@/envClient";
import { Customer } from "@/types/schema/woocommerce";

export function updateCustomer(customer: Customer) {
  return fetch(`${env.NEXT_PUBLIC_BASE_URL}/api/customers`, {
    method: "POST",
    body: JSON.stringify(customer),
  });
}
