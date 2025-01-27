import {
  LinkAsButton,
  LinkAsButtonData,
} from "@/components/global/LinkAsButton/LinkAsButton";
import { WithTilingBackground } from "@/types/schema/misc";
import { bgImage } from "@/utility/misc";
import { ReactNode } from "react";
import styles from "@/styles/sections/ThreeImageSection.module.css";
import { FlexibleImage } from "@/components/global/FlexibleImage/FlexibleImage";

type Props = {
  id?: string | null;
  heading: ReactNode;
  subheading?: ReactNode;
  body?: ReactNode;
  textColor?: string;
  button?: LinkAsButtonData;
  primaryImage: {
    src: string;
    alt?: string;
  };
  secondaryImage1: {
    src: string;
    alt?: string;
  };
  secondaryImage2: {
    src: string;
    alt?: string;
  };
} & WithTilingBackground;
export function ThreeImageSection({
  id,
  heading,
  primaryImage,
  secondaryImage1,
  secondaryImage2,
  body,
  button,
  subheading,
  textColor,
  tilingBackground,
  ...rest
}: Props) {
  return (
    <section
      id={id ? id : undefined}
      style={{ color: textColor, ...bgImage(tilingBackground?.src) }}
      {...rest}
    >
      <div className={`${styles["main"]} x-wide-container`}>
        <div className={styles["images-container"]}>
          <FlexibleImage
            src={primaryImage.src}
            alt={primaryImage.alt}
            containerClassName={styles["primary-image-container"]}
            behavior="cover"
          />
          <div className={styles["secondary-images-container"]}>
            <FlexibleImage
              src={secondaryImage1.src}
              alt={secondaryImage1.alt}
              containerClassName={styles["secondary-image-single-container"]}
              behavior="cover"
            />
            <FlexibleImage
              src={secondaryImage2.src}
              alt={secondaryImage2.alt}
              containerClassName={styles["secondary-image-single-container"]}
              behavior="cover"
            />
          </div>
        </div>
        <div className={styles["content-container"]}>
          <div>
            {heading}
            {subheading}
          </div>
          {body}
          {button && <LinkAsButton data={button} />}
        </div>
      </div>
    </section>
  );
}
