import styles from "@/styles/LinkAsButton.module.css";

export type LinkAsButtonProps = {
  href: string;
  label: string;
  mainColor: string;
  secondaryColor?: string;
  variant?: "minor button";
};
export function LinkAsButton({
  href,
  label,
  mainColor,
  secondaryColor,
  variant,
}: LinkAsButtonProps) {
  return (
    <a
      href={href}
      className={`${styles["main"]} ${variant === "minor button" ? styles["minor"] : ""}`}
      style={{
        backgroundColor: variant === "minor button" ? undefined : mainColor,
        outlineColor: variant === "minor button" ? mainColor : undefined,
        color:
          variant === "minor button" ? mainColor : secondaryColor || "blue",
      }}
    >
      {label}
    </a>
  );
}
