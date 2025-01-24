import { WithTilingBackground } from "@/types/schema/misc";
import { bgImage } from "@/utility/misc";
import { ReactNode } from "react";
import styles from "@/styles/sections/TwoThirdsImageText.module.css";
import { FlexibleImage } from "@/components/global/FlexibleImage/FlexibleImage";

type Props = {
  id?: string | null;
  textColor: "normal" | "white";
  heading: ReactNode;
  image: {
    src: string;
    alt: string;
  };
  sections: {
    title: ReactNode;
    body: ReactNode;
  }[];
} & WithTilingBackground;
export function TwoThirdsImageText({
  id,
  heading,
  image,
  sections,
  textColor,
  tilingBackground,
  ...rest
}: Props) {
  return (
    <section
      id={id ? id : undefined}
      style={{ ...bgImage(tilingBackground?.src) }}
      {...rest}
    >
      <div
        className={`${styles["main"]} ${textColor === "white" ? styles["content-white"] : ""}`}
      >
        <div className={styles["heading-container"]}>{heading}</div>
        <div className={styles["content-flex"]}>
          <FlexibleImage
            src={image.src}
            alt={image.alt}
            containerClassName={styles["image-container"]}
            behavior="cover"
          />
          <div className={styles["text-sections-container"]}>
            {sections.map((section, i) => (
              <div key={i}>
                {section.title}
                {section.body}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
