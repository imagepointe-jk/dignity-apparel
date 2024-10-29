import { ReactNode } from "react";
import styles from "@/styles/PrivacyPolicy/PrivacyPolicy.module.css";

type Props = {
  bodyNode: ReactNode;
};
export function PrivacyPolicy({ bodyNode }: Props) {
  return (
    <section className={styles["main"]}>
      <div className={styles["body"]}>
        <h2>PRIVACY POLICY</h2>
        <div>{bodyNode}</div>
      </div>
    </section>
  );
}
