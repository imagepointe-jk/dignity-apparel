import { ReactNode } from "react";
import { ContainedImage } from "../../global/ContainedImage/ContainedImage";
import styles from "@/styles/sections/StandardSection1.module.css";
import {
  LinkAsButton,
  LinkAsButtonProps,
} from "../../global/LinkAsButton/LinkAsButton";

type Props = {
  heading: string;
  bodyTextNode: ReactNode;
  imgSrc: string;
  imgAlt: string;
  horzReversed?: boolean;
  bgColor?: string;
  textColor?: string;
  buttonPrimary?: LinkAsButtonProps;
  buttonSecondary?: Omit<LinkAsButtonProps, "secondaryColor">;
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
            {buttonPrimary && (
              <LinkAsButton
                href={buttonPrimary.href}
                label={buttonPrimary.label}
                mainColor={buttonPrimary.mainColor}
                secondaryColor={buttonPrimary.secondaryColor}
              />
            )}
            {buttonSecondary && (
              <LinkAsButton
                href={buttonSecondary.href}
                label={buttonSecondary.label}
                mainColor={buttonSecondary.mainColor}
                variant={"minor button"}
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
