import { WithTilingBackground } from "@/types/schema/misc";
import { bgImage } from "@/utility/misc";
import { ReactNode } from "react";
import styles from "@/styles/sections/TextWithHeading.module.css";

type Props = {
  id?: string | null;
  heading: ReactNode;
  subheading: ReactNode;
  body: ReactNode;
  textColor?: string;
} & WithTilingBackground;
export function TextWithHeading({
  id,
  body,
  heading,
  subheading,
  textColor,
  tilingBackground,
  ...rest
}: Props) {
  return (
    <section
      id={id ? id : undefined}
      style={{ ...bgImage(tilingBackground?.src), color: textColor }}
      {...rest}
    >
      <div className={`${styles["main"]} x-wide-container`}>
        <div className={styles["heading-subheading-container"]}>
          {heading}
          {subheading}
        </div>
        <div className={styles["body-container"]}>{body}</div>
      </div>
    </section>
  );
}
