"use client";

import { updateCustomer } from "@/fetch/client/customers";
import { Customer } from "@/types/schema/woocommerce";
import { FormEvent } from "react";

type Props = {
  customer: Customer;
};
export function EditForm({ customer }: Props) {
  const { id, databaseId, firstName, lastName, email, username } = customer;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const billingCompany = `${formData.get("billing-company")}`;
    const billingAddress1 = `${formData.get("billing-address1")}`;
    const billingAddress2 = `${formData.get("billing-address2")}`;
    const billingCity = `${formData.get("billing-city")}`;
    const billingPostcode = `${formData.get("billing-postcode")}`;
    const billingCountry = `${formData.get("billing-country")}`;
    const billingState = `${formData.get("billing-state")}`;
    const billingPhone = `${formData.get("billing-phone")}`;

    const shippingCompany = `${formData.get("shipping-company")}`;
    const shippingAddress1 = `${formData.get("shipping-address1")}`;
    const shippingAddress2 = `${formData.get("shipping-address2")}`;
    const shippingCity = `${formData.get("shipping-city")}`;
    const shippingPostcode = `${formData.get("shipping-postcode")}`;
    const shippingCountry = `${formData.get("shipping-country")}`;
    const shippingState = `${formData.get("shipping-state")}`;
    const shippingPhone = `${formData.get("shipping-phone")}`;

    const updatedCustomer: Customer = {
      id,
      databaseId,
      firstName,
      lastName,
      username,
      email,
      billing: {
        company: billingCompany,
        address1: billingAddress1,
        address2: billingAddress2,
        city: billingCity,
        postcode: billingPostcode,
        country: billingCountry,
        state: billingState,
        phone: billingPhone,
        email: `${customer.billing.email}`,
      },
      shipping: {
        company: shippingCompany,
        address1: shippingAddress1,
        address2: shippingAddress2,
        city: shippingCity,
        postcode: shippingPostcode,
        country: shippingCountry,
        state: shippingState,
        phone: shippingPhone,
        email: `${customer.shipping.email}`,
      },
    };

    try {
      console.log("sending...");
      const response = await updateCustomer(updatedCustomer);
      const responseJson = await response.json();
      console.log(responseJson);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div>First Name: {firstName}</div>
      <div>Last Name: {lastName}</div>
      <div>Username: {username}</div>
      <div>Email: {email}</div>

      <h4>Billing Information</h4>
      <div>
        <label htmlFor="billing-company">
          Company:
          <input
            type="text"
            name="billing-company"
            id="billing-company"
            defaultValue={customer.billing.company || ""}
          />
        </label>
      </div>
      <div>
        <label htmlFor="billing-address1">
          Address Line 1:
          <input
            type="text"
            name="billing-address1"
            id="billing-address1"
            defaultValue={customer.billing.address1 || ""}
          />
        </label>
      </div>
      <div>
        <label htmlFor="billing-address2">
          Address Line 2:
          <input
            type="text"
            name="billing-address2"
            id="billing-address2"
            defaultValue={customer.billing.address2 || ""}
          />
        </label>
      </div>
      <div>
        <label htmlFor="billing-city">
          City:
          <input
            type="text"
            name="billing-city"
            id="billing-city"
            defaultValue={customer.billing.city || ""}
          />
        </label>
      </div>
      <div>
        <label htmlFor="billing-postcode">
          Zip Code:
          <input
            type="text"
            name="billing-postcode"
            id="billing-postcode"
            defaultValue={customer.billing.postcode || ""}
          />
        </label>
      </div>
      <div>
        <label htmlFor="billing-country">
          Country:
          <input
            type="text"
            name="billing-country"
            id="billing-country"
            defaultValue={customer.billing.country || ""}
          />
        </label>
      </div>
      <div>
        <label htmlFor="billing-state">
          State:
          <input
            type="text"
            name="billing-state"
            id="billing-state"
            defaultValue={customer.billing.state || ""}
          />
        </label>
      </div>
      <div>
        <label htmlFor="billing-phone">
          Phone Number:
          <input
            type="text"
            name="billing-phone"
            id="billing-phone"
            defaultValue={customer.billing.phone || ""}
          />
        </label>
      </div>

      <h4>Shipping Information</h4>
      <div>
        <label htmlFor="shipping-company">
          Company:
          <input
            type="text"
            name="shipping-company"
            id="shipping-company"
            defaultValue={customer.shipping.company || ""}
          />
        </label>
      </div>
      <div>
        <label htmlFor="shipping-address1">
          Address Line 1:
          <input
            type="text"
            name="shipping-address1"
            id="shipping-address1"
            defaultValue={customer.shipping.address1 || ""}
          />
        </label>
      </div>
      <div>
        <label htmlFor="shipping-address2">
          Address Line 2:
          <input
            type="text"
            name="shipping-address2"
            id="shipping-address2"
            defaultValue={customer.shipping.address2 || ""}
          />
        </label>
      </div>
      <div>
        <label htmlFor="shipping-city">
          City:
          <input
            type="text"
            name="shipping-city"
            id="shipping-city"
            defaultValue={customer.shipping.city || ""}
          />
        </label>
      </div>
      <div>
        <label htmlFor="shipping-postcode">
          Zip Code:
          <input
            type="text"
            name="shipping-postcode"
            id="shipping-postcode"
            defaultValue={customer.shipping.postcode || ""}
          />
        </label>
      </div>
      <div>
        <label htmlFor="shipping-country">
          Country:
          <input
            type="text"
            name="shipping-country"
            id="shipping-country"
            defaultValue={customer.shipping.country || ""}
          />
        </label>
      </div>
      <div>
        <label htmlFor="shipping-state">
          State:
          <input
            type="text"
            name="shipping-state"
            id="shipping-state"
            defaultValue={customer.shipping.state || ""}
          />
        </label>
      </div>
      <div>
        <label htmlFor="shipping-phone">
          Phone Number:
          <input
            type="text"
            name="shipping-phone"
            id="shipping-phone"
            defaultValue={customer.shipping.phone || ""}
          />
        </label>
      </div>
      <div>
        <button type="submit">Save Changes</button>
      </div>
    </form>
  );
}
