import { NorthCarolina } from "@/components/icons/geography/NorthCarolina";
import { SouthCarolina } from "@/components/icons/geography/SouthCarolina";
import { IUPAT } from "@/components/icons/organizations/IUPAT";
import { IUPAT_DC81_L246_Bug } from "@/components/icons/organizations/IUPAT_DC81_L246_Bug";
import { IUPAT_DC81_L247_Bug } from "@/components/icons/organizations/IUPAT_DC81_L247_Bug";
import { WorkersUnited } from "@/components/icons/organizations/WorkersUnited";
import styles from "@/styles/sections/ValueChain.module.css";

export function Growing() {
  return (
    <div className={styles["expanded-content"]}>
      <div className={styles["divided-content"]}>
        <div className={styles["content-subsection"]}>
          <div
            className={`${styles["carolinas-container"]} ${styles["orange"]}`}
          >
            <NorthCarolina size={90} className={styles["north-carolina"]} />
            <SouthCarolina size={90} className={styles["south-carolina"]} />
          </div>
          <div className={styles["content-subheading"]}>
            Grown in the Carolinas
          </div>
          <div className="subheader-2">
            Our garments are made with 100% US-sourced cotton
          </div>
        </div>
        <div className={styles["content-subsection"]}>
          <div className={styles["content-subheading"]}>Union Partners</div>
          <div className={styles["logos-container"]}>
            <div className={styles["logo-with-bug-container"]}>
              <WorkersUnited size={60} />
              <IUPAT_DC81_L247_Bug size={20} />
            </div>
            <div className={styles["logo-with-bug-container"]}>
              <IUPAT size={60} />
              <IUPAT_DC81_L246_Bug size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
