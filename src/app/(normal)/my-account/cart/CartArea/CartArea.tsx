"use client";

import { Cart, CartQuantityUpdate } from "@/types/schema/woocommerce";
import { CartRow } from "./CartRow";
import styles from "@/styles/Account/CartArea/CartArea.module.css";
import { removeFromCart, updateCart } from "@/fetch/client/cart";
import { useImmer } from "use-immer";
import { clamp } from "@/utility/misc";
import { useState } from "react";
import { LoadingIndicator } from "@/components/global/LoadingIndicator/LoadingIndicator";
import { getColorDisplayName, getSizeDisplayName } from "@/utility/products";

type Props = {
  cart: Cart;
};
export function CartArea({ cart }: Props) {
  const [pendingUpdate, setPendingUpdate] = useImmer({
    items: [],
  } as CartQuantityUpdate);
  const [cartState, setCartState] = useImmer(cart);
  const [status, setStatus] = useState(
    "idle" as "idle" | "loading" | "error" | "success"
  );

  const anyUpdates = pendingUpdate.items.length > 0;
  const allowUpdate = anyUpdates && status !== "loading";

  async function clickUpdateCart() {
    if (!allowUpdate) return;

    setStatus("loading");
    try {
      const response = await updateCart({
        items: pendingUpdate.items,
      });
      if (!response.ok)
        throw new Error(`Update cart response ${response.status}`);

      const json = await response.json();
      setCartState((draft) => {
        draft.subtotal = json.newSubtotal;
      });

      setPendingUpdate((draft) => {
        draft.items = [];
      });
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  function onChangeItemQuantity(itemKey: string, newQuantity: number) {
    if (status === "loading") return;

    const cleanedQuantity = Math.floor(
      clamp(newQuantity, 1, Number.MAX_SAFE_INTEGER)
    );

    setPendingUpdate((draft) => {
      const existingItem = draft.items.find((item) => item.key === itemKey);
      if (existingItem) {
        existingItem.quantity = cleanedQuantity;
      } else {
        draft.items.push({ key: itemKey, quantity: cleanedQuantity });
      }
    });

    setCartState((draft) => {
      const existingItem = draft.items.find((item) => item.key === itemKey);
      if (existingItem) {
        const newSubtotal =
          +existingItem.variation.price.replace("$", "") * cleanedQuantity;
        existingItem.subtotal = `$${newSubtotal.toFixed(2)}`;
        existingItem.quantity = cleanedQuantity;
      }
    });
  }

  async function clickDeleteItem(itemKey: string) {
    const targetItem = cart.items.find((item) => item.key === itemKey);
    if (!targetItem) return;

    const name = targetItem.product.name;
    const color = getColorDisplayName(
      targetItem.variation.attributes.find((attr) => attr.name === "pa_color")
        ?.value || ""
    );
    const size = getSizeDisplayName(
      targetItem.variation.attributes.find((attr) => attr.name === "pa_size")
        ?.value || ""
    );

    if (!window.confirm(`Remove "${name} (${color}, ${size})" from cart?`))
      return;

    setStatus("loading");
    try {
      const response = await removeFromCart(itemKey);
      if (!response.ok) throw new Error("Failed to remove product");

      const json = await response.json();

      setPendingUpdate((draft) => {
        draft.items = draft.items.filter((item) => item.key !== itemKey); //if there was a pending update for the item that just got removed, get rid of it
      });
      setCartState((draft) => {
        draft.items = draft.items.filter((item) => item.key !== itemKey); //remove item from state
        draft.subtotal = json.newSubtotal;
      });

      setStatus("idle");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  return (
    <div className={styles["main"]}>
      {cartState.items.map((item) => (
        <CartRow
          key={item.key}
          item={item}
          onChangeItemQuantity={onChangeItemQuantity}
          onClickDelete={clickDeleteItem}
        />
      ))}
      <div>Subtotal: {cartState.subtotal}</div>
      <div>
        <button disabled={!allowUpdate} onClick={clickUpdateCart}>
          Update Cart
        </button>
        {status === "error" && <div>Error updating cart.</div>}
        {status === "success" && <div>Cart updated successfully.</div>}
      </div>
      {status === "loading" && (
        <div className={styles["loading-overlay"]}>
          <LoadingIndicator />
        </div>
      )}
    </div>
  );
}
