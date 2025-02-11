"use client";

import Link from "next/link";
import styles from "@/styles/Account/Account.module.css";
import { usePathname } from "next/navigation";

export function AccountNavbar() {
  const pathname = usePathname();

  return (
    <nav>
      <ul>
        <li>
          <Link
            href="details"
            className={
              pathname.endsWith("/details") ? styles["nav-current"] : undefined
            }
          >
            Account Details
          </Link>
        </li>
        <li>
          <Link
            href="cart"
            className={
              pathname.endsWith("/cart") ? styles["nav-current"] : undefined
            }
          >
            Cart
          </Link>
        </li>
        <li>
          <Link
            href="orders"
            className={
              pathname.endsWith("/orders") ? styles["nav-current"] : undefined
            }
          >
            Orders
          </Link>
        </li>
        <li>
          <Link href="/login?action=logout">Log Out</Link>
        </li>
      </ul>
    </nav>
  );
}
