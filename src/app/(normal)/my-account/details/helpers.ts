import { Customer } from "@/types/schema/woocommerce";

export function createUpdateCustomerData(
  formData: FormData,
  customer: Customer
) {
  const { id, databaseId, firstName, lastName, username, email } = customer;
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

  return updatedCustomer;
}
