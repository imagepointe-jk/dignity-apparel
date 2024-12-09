import styles from "@/styles/sections/VideoSection.module.css";
import { WithTilingBackground } from "@/types/schema/misc";
import { bgImage } from "@/utility/misc";
import { ReactNode } from "react";

type Props = {
  embedCode?: string;
  heading?: string;
  headingColor?: string;
  bodyText?: ReactNode;
  textColor?: string;
} & WithTilingBackground;
export function VideoSection({
  embedCode,
  heading,
  headingColor,
  tilingBackground,
  bodyText,
  textColor,
  ...rest
}: Props) {
  //adjust undesired embed code attributes
  const adjustedCode = embedCode
    ? embedCode
        .replace(/width="[^"*]*"/g, 'width="100%"')
        .replace(/height="[^"]*"/g, "")
    : undefined;

  return (
    <section
      style={{ ...bgImage(tilingBackground?.src), color: textColor }}
      {...rest}
    >
      <div className={`${styles["main"]} x-wide-container`}>
        {heading && <h2 style={{ color: headingColor }}>{heading}</h2>}
        <div
          className={styles["video-container"]}
          dangerouslySetInnerHTML={{ __html: adjustedCode || "" }}
        ></div>
        <div style={{ color: textColor }}>{bodyText}</div>
      </div>
    </section>
  );
}
