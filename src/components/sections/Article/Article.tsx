import { ReactNode } from "react";
import styles from "@/styles/sections/Article.module.css";

type Props = {
  id?: string | null;
  heading: ReactNode;
  subheading?: ReactNode;
  body: ReactNode;
};
export function Article({ id, body, heading, subheading, ...rest }: Props) {
  return (
    <section id={id ? id : undefined} {...rest}>
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
