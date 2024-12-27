import { ReactNode } from "react";
import styles from "@/styles/sections/Article.module.css";

type Props = {
  heading: ReactNode;
  subheading?: ReactNode;
  body: ReactNode;
};
export function Article({ body, heading, subheading, ...rest }: Props) {
  return (
    <section {...rest}>
      <div className={styles["main"]}>
        <div className={styles["heading-container"]}>
          <div className={styles["main-heading"]}>{heading}</div>
          {subheading}
        </div>
        <div>{body}</div>
      </div>
    </section>
  );
}
