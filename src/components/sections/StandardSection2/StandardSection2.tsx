import { CoveredImage } from "@/components/global/CoveredImage/CoveredImage";
import {
  LinkAsButton,
  LinkAsButtonData,
} from "@/components/global/LinkAsButton/LinkAsButton";
import styles from "@/styles/sections/StandardSection2.module.css";
import { WithTilingBackground } from "@/types/schema/misc";
import { bgImage } from "@/utility/misc";
import { ReactNode } from "react";

type Props = {
  id?: string | null;
  headingNode: ReactNode;
  subtextNode?: ReactNode;
  bodyTextNode: ReactNode;
  img: {
    src: string;
    alt?: string | null | undefined;
  };
  videoEmbedCode?: string;
  horzReversed?: boolean;
  textColor?: string;
  buttons: LinkAsButtonData[];
} & WithTilingBackground;
export function StandardSection2({
  id,
  bodyTextNode,
  buttons,
  headingNode,
  img,
  videoEmbedCode,
  horzReversed,
  subtextNode,
  textColor,
  tilingBackground,
  ...rest
}: Props) {
  //adjust undesired embed code attributes
  const adjustedEmbedCode = videoEmbedCode
    ? videoEmbedCode
        .replace(/width="[^"*]*"/g, 'width="100%"')
        .replace(/height="[^"]*"/g, "")
    : undefined;
  return (
    <section
      id={id ? id : undefined}
      style={{ ...bgImage(tilingBackground?.src), color: textColor }}
      {...rest}
    >
      <div
        className={`${styles["main"]} ${horzReversed ? styles["reversed"] : ""} x-wide-container`}
      >
        <div className={styles["heading-container"]}>
          <div
            className={styles["heading-ornament"]}
            style={{ backgroundColor: textColor || "black" }}
          ></div>
          {headingNode}
          <div
            className={styles["heading-ornament"]}
            style={{ backgroundColor: textColor || "black" }}
          ></div>
        </div>
        <div className={styles["main-flex"]}>
          <div className={styles["content-container"]}>
            {subtextNode}
            {bodyTextNode}
            <div className={styles["buttons-container"]}>
              {buttons.map((button, i) => (
                <LinkAsButton key={i} data={button} />
              ))}
            </div>
          </div>
          <div className={styles["image-or-video-parent"]}>
            {!adjustedEmbedCode && (
              <CoveredImage
                src={img.src}
                alt={img.alt || "image"}
                containerClassName={styles["image-container"]}
              />
            )}
            {adjustedEmbedCode && (
              <div
                className={styles["video-container"]}
                dangerouslySetInnerHTML={{ __html: adjustedEmbedCode }}
              ></div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
