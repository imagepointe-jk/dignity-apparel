import {
  LinkAsButton,
  LinkAsButtonData,
} from "@/components/global/LinkAsButton/LinkAsButton";
import { WithTilingBackground } from "@/types/schema/misc";
import { bgImage } from "@/utility/misc";
import { ReactNode } from "react";
import styles from "@/styles/sections/TextImageCard.module.css";
import { CoveredImage } from "@/components/global/CoveredImage/CoveredImage";

type Props = {
  id?: string | null;
  heading: ReactNode;
  subheading?: ReactNode;
  body: ReactNode;
  link?: LinkAsButtonData;
  image: {
    src: string;
    alt: string;
  };
} & WithTilingBackground;
export function TextImageCard({
  id,
  heading,
  body,
  image,
  link,
  subheading,
  tilingBackground,
  ...rest
}: Props) {
  return (
    <section
      id={id ? id : undefined}
      style={{ ...bgImage(tilingBackground?.src) }}
      {...rest}
    >
      <div className={`${styles["main"]} x-wide-container`}>
        <div className={styles["card"]}>
          <div className={styles["content"]}>
            <div>
              {heading}
              {subheading}
            </div>
            {body}
            {link && <LinkAsButton data={link} />}
          </div>
          <CoveredImage
            src={image.src}
            alt={image.alt}
            containerClassName={styles["image-container"]}
          />
        </div>
      </div>
    </section>
  );
}
