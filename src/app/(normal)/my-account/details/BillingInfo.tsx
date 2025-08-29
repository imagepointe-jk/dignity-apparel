import { Customer } from "@/types/schema/woocommerce";

type Props = {
  customer: Customer;
};
export function BillingInfo({ customer }: Props) {
  return (
    <>
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
    </>
  );
}
