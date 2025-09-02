import styles from "@/styles/Account/Orders/Orders.module.css";
import { OrderRow } from "./OrderRow";
import { Metadata } from "next";
import { getLoggedInOrders } from "@/utility/woocommerce";

export default async function Page() {
  try {
    const orders = await getLoggedInOrders();

    return (
      <div className={styles["main"]}>
        {orders.map((order) => (
          <OrderRow key={order.id} order={order} />
        ))}
      </div>
    );
  } catch (error) {
    console.error(error);
    return <div>Something went wrong.</div>;
  }
}

export function generateMetadata(): Metadata {
  return {
    title: "Orders - Dignity Apparel",
  };
}
