import { PastOrder } from "@/types/schema/woocommerce";
import styles from "@/styles/Account/Orders/Orders.module.css";
import { OrderRow } from "./OrderRow";

export default function Page() {
  const testOrders: PastOrder[] = [
    {
      id: "abc",
      databaseId: 1,
      customer: {
        firstName: "John",
        lastName: "Doe",
      },
      lineItems: [
        {
          id: "abc",
          databaseId: 1,
          product: {
            id: "abc",
            databaseId: 1,
            name: "Test Product",
            sku: "ABC123",
            slug: "test-product",
          },
          quantity: 42,
          subtotal: "$12.34",
          variation: {
            id: "abc",
            databaseId: 1,
            name: "Test Product (Orange)",
          },
        },
        {
          id: "bbc",
          databaseId: 2,
          product: {
            id: "bbc",
            databaseId: 2,
            name: "Test Product",
            sku: "ABC123",
            slug: "test-product",
          },
          quantity: 13,
          subtotal: "$12.34",
          variation: {
            id: "bbc",
            databaseId: 2,
            name: "Test Product (White)",
          },
        },
        {
          id: "cbc",
          databaseId: 3,
          product: {
            id: "cbc",
            databaseId: 3,
            name: "Test Product",
            sku: "ABC123",
            slug: "test-product",
          },
          quantity: 42,
          subtotal: "$12.34",
          variation: {
            id: "cbc",
            databaseId: 3,
            name: "Test Product (Orange)",
          },
        },
      ],
    },
    {
      id: "bbc",
      databaseId: 2,
      customer: {
        firstName: "John",
        lastName: "Doe",
      },
      lineItems: [
        {
          id: "bbc",
          databaseId: 2,
          product: {
            id: "bbc",
            databaseId: 2,
            name: "Test Product",
            sku: "ABC123",
            slug: "test-product",
          },
          quantity: 42,
          subtotal: "$12.34",
          variation: {
            id: "bbc",
            databaseId: 2,
            name: "Test Product (Orange)",
          },
        },
      ],
    },
  ];

  return (
    <div className={styles["main"]}>
      {testOrders.map((order) => (
        <OrderRow key={order.id} order={order} />
      ))}
    </div>
  );
}
