import styles from "@/styles/ProductBrowse/ProductResults.module.css";

export function ProductResults() {
  const temp = Array.from({ length: 4 }, () => 0);
  return (
    <div className={styles["cards-container"]}>
      {temp.map((item) => (
        <div className={styles["card"]}>Card</div>
      ))}
    </div>
  );
}
