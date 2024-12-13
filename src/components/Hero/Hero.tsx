import { ReactNode } from "react";
import {
  LinkAsButton,
  LinkAsButtonData,
} from "../global/LinkAsButton/LinkAsButton";
import styles from "@/styles/Hero/Hero.module.css";

type Props = {
  heading: string;
  subtextNode: ReactNode;
  body?: ReactNode;
  buttonPrimary: LinkAsButtonData;
  buttonSecondary?: LinkAsButtonData;
  bgImageUrl?: string;
  bgVideoUrl?: string;
  alignment: "left" | "right" | "center";
  overlayNormalized?: number;
  heightOverride?: number;
};
export function Hero({
  bgImageUrl,
  heading,
  subtextNode,
  body,
  buttonPrimary,
  buttonSecondary,
  alignment,
  bgVideoUrl,
  overlayNormalized,
  heightOverride,
}: Props) {
  const alignmentClassName =
    alignment === "left"
      ? styles["align-left"]
      : alignment === "right"
        ? styles["align-right"]
        : "";

  return (
    <section
      className={styles["section"]}
      style={{
        backgroundImage:
          bgImageUrl && !bgVideoUrl
            ? `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${bgImageUrl})`
            : undefined,
        height: heightOverride ? `${heightOverride}px` : undefined,
      }}
    >
      {bgVideoUrl && (
        <div className={styles["video-container"]}>
          <video autoPlay loop playsInline muted>
            <source src={bgVideoUrl} />
          </video>
        </div>
      )}
      <div
        className={`${styles["main"]} ${alignmentClassName} x-wide-container`}
      >
        <div
          className={styles["dark-overlay"]}
          style={{ backgroundColor: `rgba(0, 0, 0, ${overlayNormalized})` }}
        ></div>
        <div className={styles["content"]}>
          <div>
            <h1 className="h1-black">{heading}</h1>
            <div className={styles["subtext-container"]}>{subtextNode}</div>
          </div>
          {body}
          <div className={styles["buttons-container"]}>
            <LinkAsButton data={buttonPrimary} />
            {buttonSecondary && alignment === "center" && (
              <LinkAsButton data={buttonSecondary} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
