import styles from "@/styles/sections/ValueChain.module.css";

export function Dyeing() {
  return (
    <div className={styles["expanded-content"]}>
      <div className={styles["centered-content"]}>
        <div>
          <img
            className={styles["flag-img"]}
            src="https://images.prismic.io/dignity-apparel/Z2GWn5bqstJ98m0x_flag.png?auto=format,compress"
            alt="american flag"
          />
        </div>
        <div
          className={`${styles["content-subheading"]} ${styles["dyed-heading-container"]}`}
        >
          Dyed in Various US Dye Houses
        </div>
        <div className={`${styles["dyed-body-container"]} subheader-2`}>
          Union-made fabric & fleece sent to US factories to be dyed.
        </div>
      </div>
    </div>
  );
}
