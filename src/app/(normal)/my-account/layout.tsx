import { ReactNode } from "react";
import styles from "@/styles/Account/Account.module.css";
import { AccountNavbar } from "./AccountNavbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={`${styles["main"]} x-wide-container`}>
      <h1>My Account</h1>
      <AccountNavbar />
      <div>{children}</div>
    </div>
  );
}
