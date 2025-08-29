"use client";

import { updateCustomer } from "@/fetch/client/customers";
import { Customer } from "@/types/schema/woocommerce";
import { FormEvent } from "react";
import { ShippingInfo } from "./ShippingInfo";
import { BillingInfo } from "./BillingInfo";
import { PrimaryInfo } from "./PrimaryInfo";
import { createUpdateCustomerData } from "./helpers";

type Props = {
  customer: Customer;
};
export function EditForm({ customer }: Props) {
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const updatedCustomer = createUpdateCustomerData(formData, customer);

    try {
      const response = await updateCustomer(updatedCustomer);
      if (!response.ok) {
        throw new Error("Unknown error updating customer details");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <PrimaryInfo customer={customer} />
      <BillingInfo customer={customer} />
      <ShippingInfo customer={customer} />
      <div>
        <button type="submit">Save Changes</button>
      </div>
    </form>
  );
}
