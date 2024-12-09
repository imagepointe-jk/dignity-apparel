import styles from "@/styles/sections/VideoSection.module.css";
import { ReactNode } from "react";

type Props = {
  embedCode?: string;
  heading?: string;
  headingColor?: string;
  bgColor?: string;
  bodyText?: ReactNode;
  textColor?: string;
};
export function VideoSection({
  embedCode,
  heading,
  headingColor,
  bgColor,
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
    <section style={{ backgroundColor: bgColor, color: textColor }} {...rest}>
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
