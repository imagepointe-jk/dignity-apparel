import { ReactNode } from "react";
import { ContainedImage } from "../../global/ContainedImage/ContainedImage";
import styles from "@/styles/sections/StandardSection1.module.css";
import {
  LinkAsButton,
  LinkAsButtonData,
} from "../../global/LinkAsButton/LinkAsButton";
import { WithTilingBackground } from "@/types/schema/misc";
import { bgImage } from "@/utility/misc";

type Props = {
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
} & WithTilingBackground;
export function StandardSection1({
  headingNode,
  subtextNode,
  bodyTextNode,
  img,
  horzReversed,
  tilingBackground,
  textColor,
  buttonPrimary,
  ...rest
}: Props) {
  return (
    <section
      style={{ ...bgImage(tilingBackground?.src), color: textColor }}
      {...rest}
    >
      <div
        className={`${styles["main"]} ${horzReversed ? styles["reversed"] : ""}`}
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
        <div className={styles["image-container"]}>
          <img src={img.src} alt={img.alt || "image"} />
        </div>
      </div>
    </section>
  );
}
