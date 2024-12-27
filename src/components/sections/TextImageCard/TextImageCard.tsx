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
  heading: ReactNode;
  subheading?: ReactNode;
  body: ReactNode;
  link: LinkAsButtonData;
  image: {
    src: string;
    alt: string;
  };
} & WithTilingBackground;
export function TextImageCard({
  heading,
  body,
  image,
  link,
  subheading,
  tilingBackground,
  ...rest
}: Props) {
  return (
    <section style={{ ...bgImage(tilingBackground?.src) }} {...rest}>
      <div className={`${styles["main"]} x-wide-container`}>
        <div className={styles["card"]}>
          <div className={styles["content"]}>
            <div>
              {heading}
              {subheading}
            </div>
            {body}
            <LinkAsButton data={link} />
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
