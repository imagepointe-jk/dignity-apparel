import styles from "@/styles/global/LoadingSpinner.module.css";

type Props = {
  containerClassName?: string;
  className?: string;
  message?: string;
};
export function LoadingIndicator({
  containerClassName,
  className,
  message,
}: Props) {
  return (
    <div className={`${styles["main"]} ${containerClassName || ""}`}>
      <img
        src="/spinner1.png"
        alt="spinner"
        className={`${styles["spinner"]} ${className || ""}`}
      />
      {message && <div>{message}</div>}
    </div>
  );
}
