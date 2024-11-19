import { ReactNode } from "react";
import { ContainedImage } from "../../global/ContainedImage/ContainedImage";
import styles from "@/styles/sections/StandardSection1.module.css";
import {
  LinkAsButton,
  LinkAsButtonData,
} from "../../global/LinkAsButton/LinkAsButton";

type Props = {
  heading: string;
  bodyTextNode: ReactNode;
  imgSrc: string;
  imgAlt: string;
  horzReversed?: boolean;
  bgColor?: string;
  textColor?: string;
  buttonPrimary?: LinkAsButtonData;
  buttonSecondary?: Omit<LinkAsButtonData, "secondaryColor">;
};
export function StandardSection1({
  heading,
  bodyTextNode,
  imgSrc,
  imgAlt,
  horzReversed,
  bgColor,
  textColor,
  buttonPrimary,
  buttonSecondary,
}: Props) {
  return (
    <section
      className={`${styles["main"]} ${horzReversed ? styles["reversed"] : ""}`}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className={styles["content-container"]}>
        <h2>{heading}</h2>
        <div className={styles["body-container"]}>{bodyTextNode}</div>
        {(buttonPrimary || buttonSecondary) && (
          <div className={styles["button-row"]}>
            {/* Temp values */}
            {buttonPrimary && (
              <LinkAsButton
                data={{
                  href: buttonPrimary.href,
                  label: buttonPrimary.label,
                  states: {
                    hover: {
                      primaryColor: "",
                    },
                    normal: {
                      primaryColor: "",
                    },
                  },
                }}
              />
            )}
            {buttonSecondary && (
              <LinkAsButton
                data={{
                  href: buttonSecondary.href,
                  label: buttonSecondary.label,
                  states: {
                    hover: {
                      primaryColor: "",
                    },
                    normal: {
                      primaryColor: "",
                    },
                  },
                }}
              />
            )}
          </div>
        )}
      </div>
      <ContainedImage
        src={imgSrc}
        alt={imgAlt}
        containerClassName={styles["image-container"]}
      ></ContainedImage>
    </section>
  );
}
