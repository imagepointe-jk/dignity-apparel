import { Customer } from "@/types/schema/woocommerce";

type Props = {
  customer: Customer;
};
export function ShippingInfo({ customer }: Props) {
  return (
    <>
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
    </>
  );
}
