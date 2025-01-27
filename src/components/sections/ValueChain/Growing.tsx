import { NorthCarolina } from "@/components/icons/geography/NorthCarolina";
import { SouthCarolina } from "@/components/icons/geography/SouthCarolina";
import styles from "@/styles/sections/ValueChain.module.css";

export function Growing() {
  return (
    <div className={styles["expanded-content"]}>
      <div className={styles["centered-content"]}>
        <div className={`${styles["carolinas-container"]} ${styles["orange"]}`}>
          <NorthCarolina size={90} className={styles["north-carolina"]} />
          <SouthCarolina size={90} className={styles["south-carolina"]} />
        </div>
        <div
          className={`${styles["content-subheading"]} ${styles["dyed-heading-container"]}`}
        >
          Grown in the Carolinas
        </div>
        <div className={`${styles["growing-body-container"]} merriweather-19`}>
          Our garments are made with 100% US-sourced cotton
        </div>
      </div>
    </div>
  );
}
