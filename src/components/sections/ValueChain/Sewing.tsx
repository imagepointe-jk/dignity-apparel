import { Iowa } from "@/components/icons/geography/Iowa";
import { Tennessee } from "@/components/icons/geography/Tennessee";
import { IUPAT } from "@/components/icons/organizations/IUPAT";
import { IUPAT_DC81_L246_Bug } from "@/components/icons/organizations/IUPAT_DC81_L246_Bug";
import { IUPAT_DC81_L247_Bug } from "@/components/icons/organizations/IUPAT_DC81_L247_Bug";
import { WorkersUnited } from "@/components/icons/organizations/WorkersUnited";
import styles from "@/styles/sections/ValueChain.module.css";

export function Sewing() {
  return (
    <div className={styles["expanded-content"]}>
      <div className={styles["divided-content"]}>
        <div
          className={styles["content-subsection"]}
          style={{ justifyContent: "initial", paddingTop: "39px" }}
        >
          <div
            className={`${styles["iowa-tennessee-container"]} ${styles["orange"]}`}
          >
            <Iowa size={90} />
            <Tennessee size={50} />
          </div>
          <div className={styles["content-subheading"]}>
            Sewn in Iowa & Tennessee
          </div>
          <div className="merriweather-19">
            100% union-sewn garments at Dignity Apparel factories in Iowa &
            Tennessee.
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
