"use client";

import { PastOrder } from "@/types/schema/woocommerce";
import styles from "@/styles/Account/Orders/Orders.module.css";
import { Arrow } from "@/components/icons/Arrow";
import { useState } from "react";

type Props = {
  order: PastOrder;
};
export function OrderRow({ order }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      key={order.id}
      className={`${styles["order"]} ${expanded ? styles["expanded"] : ""}`}
    >
      <div className={styles["order-top"]}>
        <div>Order #{order.databaseId}</div>
        <div>Jan 1, 1970</div>
        <button
          className={styles["expand-button"]}
          onClick={() => setExpanded(!expanded)}
        >
          <Arrow className={styles["arrow"]} size={15} />
        </button>
      </div>
      <div className={styles["order-content"]}>
        <div>Customer Information</div>
        <ul>
          <li>First Name: {order.customer.firstName}</li>
          <li>Last Name: {order.customer.lastName}</li>
        </ul>
        <div>Line Items</div>
        <ul>
          {order.lineItems.map((item) => (
            <li key={item.id}>
              {item.variation.name} x{item.quantity} - {item.subtotal}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
