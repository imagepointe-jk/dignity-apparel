import { WithTilingBackground } from "@/types/schema/misc";
import { bgImage } from "@/utility/misc";
import { ReactNode } from "react";
import styles from "@/styles/sections/Accordion.module.css";
import { ExpandableDiv } from "@/components/global/ExpandableDiv/ExpandableDiv";

type Props = {
  id?: string | null;
  heading: ReactNode;
  contentColor: "normal" | "white";
  sections: {
    title: string;
    body: ReactNode;
  }[];
} & WithTilingBackground;
export function Accordion({
  id,
  tilingBackground,
  contentColor,
  heading,
  sections,
  ...rest
}: Props) {
  const white = contentColor === "white";

  return (
    <section
      id={id ? id : undefined}
      style={{ ...bgImage(tilingBackground?.src) }}
      {...rest}
    >
      <div
        className={`${styles["main"]} ${white ? styles["content-white"] : ""} x-wide-container`}
      >
        <div className={styles["heading"]}>{heading}</div>
        <div className={styles["accordion"]}>
          {sections.map((section) => (
            <ExpandableDiv
              key={section.title}
              content={section.body}
              label={section.title}
              mainClassName={styles["accordion-container"]}
              mainExpandedClassName={styles["accordion-container-expanded"]}
              labelClassName={styles["accordion-label"]}
              labelExpandedClassName={styles["accordion-label-expanded"]}
              contentClassName={styles["accordion-content"]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
