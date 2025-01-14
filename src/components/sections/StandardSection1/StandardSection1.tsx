import { ReactNode } from "react";
import styles from "@/styles/sections/StandardSection1.module.css";
import {
  LinkAsButton,
  LinkAsButtonData,
} from "../../global/LinkAsButton/LinkAsButton";
import { WithTilingBackground } from "@/types/schema/misc";
import { bgImage } from "@/utility/misc";
import { CoveredImage } from "@/components/global/CoveredImage/CoveredImage";

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
        <CoveredImage
          src={img.src}
          alt={img.alt || "image"}
          containerClassName={styles["image-container"]}
        />
      </div>
    </section>
  );
}
