import { ReactNode } from "react";
import styles from "@/styles/sections/StandardSection1.module.css";
import {
  LinkAsButton,
  LinkAsButtonData,
} from "../../global/LinkAsButton/LinkAsButton";
import { WithTilingBackground } from "@/types/schema/misc";
import { bgImage } from "@/utility/misc";
import { FlexibleImage } from "@/components/global/FlexibleImage/FlexibleImage";

type Props = {
  id?: string | null;
  headingNode: ReactNode;
  subtextNode?: ReactNode;
  bodyTextNode: ReactNode;
  img: {
    src: string;
    alt?: string | null | undefined;
  };
  horzReversed?: boolean;
  textColor?: string;
  buttonPrimary?: LinkAsButtonData;
  buttonSecondary?: Omit<LinkAsButtonData, "secondaryColor">;
  sectionHeight?: number;
} & WithTilingBackground;
export function StandardSection1({
  id,
  headingNode,
  subtextNode,
  bodyTextNode,
  img,
  horzReversed,
  tilingBackground,
  textColor,
  buttonPrimary,
  sectionHeight,
  ...rest
}: Props) {
  return (
    <section
      id={id ? id : undefined}
      style={{ ...bgImage(tilingBackground?.src), color: textColor }}
      {...rest}
    >
      <div
        className={`${styles["main"]} ${horzReversed ? styles["reversed"] : ""}`}
        style={{ height: sectionHeight ? `${sectionHeight}px` : undefined }}
      >
        <div>
          <div className={styles["content-container"]}>
            <div>
              {headingNode}
              {subtextNode}
            </div>
            {bodyTextNode}
            {buttonPrimary && <LinkAsButton data={buttonPrimary} />}
          </div>
        </div>
        <FlexibleImage
          src={img.src}
          alt={img.alt || "image"}
          containerClassName={styles["image-container"]}
          behavior="cover"
        />
      </div>
    </section>
  );
}
