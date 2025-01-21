import { WithTilingBackground } from "@/types/schema/misc";
import { bgImage } from "@/utility/misc";
import { ReactNode } from "react";
import styles from "@/styles/sections/TextColumns.module.css";

type Props = {
  id?: string | null;
  heading?: ReactNode;
  subheading?: ReactNode;
  textColor?: "normal" | "white";
  columns: {
    title?: ReactNode;
    body?: ReactNode;
  }[];
} & WithTilingBackground;
export function TextColumns({
  columns,
  heading,
  id,
  subheading,
  textColor,
  tilingBackground,
  ...rest
}: Props) {
  return (
    <section
      id={id ? id : undefined}
      className={`${styles["section"]} ${textColor === "white" ? styles["white"] : ""}`}
      style={{ ...bgImage(tilingBackground?.src) }}
      {...rest}
    >
      <div className={styles["heading"]}>{heading}</div>
      <div className={styles["subheading"]}>{subheading}</div>
      <div className={styles["columns"]}>
        {columns.map((column, i) => (
          <div key={i}>
            <div className={styles["column-title"]}>{column.title}</div>
            <div className={styles["column-body"]}>{column.body}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
