import { ReactNode } from "react";
import {
  LinkAsButton,
  LinkAsButtonData,
} from "../global/LinkAsButton/LinkAsButton";
import styles from "@/styles/Hero/Hero.module.css";

type Props = {
  heading: string;
  subtextNode: ReactNode;
  buttonPrimary: LinkAsButtonData;
  buttonSecondary?: LinkAsButtonData;
  bgImageUrl?: string;
  bgVideoUrl?: string;
  alignment: "left" | "right" | "center";
};
export function Hero({
  bgImageUrl,
  heading,
  subtextNode,
  buttonPrimary,
  buttonSecondary,
}: Props) {
  return (
    <section
      className={styles["main"]}
      style={{
        backgroundImage: bgImageUrl
          ? `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${bgImageUrl})`
          : undefined,
      }}
    >
      <div className={styles["content"]}>
        <h1>{heading}</h1>
        {subtextNode}
        <div className={styles["buttons-container"]}>
          <LinkAsButton data={buttonPrimary} />
          {buttonSecondary && <LinkAsButton data={buttonSecondary} />}
        </div>
      </div>
    </section>
  );
}
