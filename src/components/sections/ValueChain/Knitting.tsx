import { Tennessee } from "@/components/icons/geography/Tennessee";
import { IUPAT_DC81_L247_Bug } from "@/components/icons/organizations/IUPAT_DC81_L247_Bug";
import { WorkersUnited } from "@/components/icons/organizations/WorkersUnited";
import styles from "@/styles/sections/ValueChain.module.css";

export function Knitting() {
  return (
    <div className={styles["expanded-content"]}>
      <div className={styles["divided-content"]}>
        <div className={styles["content-subsection"]}>
          <Tennessee className={styles["orange"]} size={80} />
          <div
            className={`${styles["content-subheading"]} ${styles["tennessee-heading-container"]}`}
          >
            Knitted in Tennessee
          </div>
          <div className="subheader-2">
            100% union-knit fabric & fleece made from US-sourced yarn in our
            Dignity Apparel Tennessee mill.
          </div>
        </div>
        <div className={styles["content-subsection"]}>
          <div className={styles["content-subheading"]}>Union Partners</div>
          <div className={styles["logos-container"]}>
            <div className={styles["logo-with-bug-container"]}>
              <WorkersUnited size={60} />
              <IUPAT_DC81_L247_Bug size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
