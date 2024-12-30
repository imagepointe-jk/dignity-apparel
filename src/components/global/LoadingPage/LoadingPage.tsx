import { LoadingIndicator } from "../LoadingIndicator/LoadingIndicator";
import styles from "@/styles/global/LoadingPage.module.css";

export function LoadingPage() {
  return (
    <LoadingIndicator
      containerClassName={styles["container"]}
      message="Loading page..."
    />
  );
}
