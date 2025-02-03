"use client";

import { Cart } from "@/types/schema/woocommerce";
import { CartRow } from "./CartRow";
import styles from "@/styles/CartArea/CartArea.module.css";

type Props = {
  cart: Cart;
};
export function CartArea({ cart }: Props) {
  return (
    <div className={styles["main"]}>
      {cart.items.map((item) => (
        <CartRow key={item.key} item={item} />
      ))}
      <div>Subtotal: {cart.subtotal}</div>
    </div>
  );
}
