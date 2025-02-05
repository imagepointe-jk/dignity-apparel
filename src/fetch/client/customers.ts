import { Customer } from "@/types/schema/woocommerce";

export function updateCustomer(customer: Customer) {
  return fetch(`${window.location.origin}/api/customers`, {
    method: "POST",
    body: JSON.stringify(customer),
  });
}

export function getCurrentCustomer() {
  return fetch(`${window.location.origin}/api/customers/whoami`);
}
