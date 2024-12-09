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
  heading: string;
  bodyTextNode: ReactNode;
  imgSrc: string;
  imgAlt: string;
  horzReversed?: boolean;
  textColor?: string;
  buttonPrimary?: LinkAsButtonData;
  buttonSecondary?: Omit<LinkAsButtonData, "secondaryColor">;
} & WithTilingBackground;
export function StandardSection1({
  heading,
  bodyTextNode,
  imgSrc,
  imgAlt,
  horzReversed,
  tilingBackground,
  textColor,
  buttonPrimary,
  buttonSecondary,
}: Props) {
  return (
    <section
      className={`${styles["main"]} ${horzReversed ? styles["reversed"] : ""}`}
      style={{ ...bgImage(tilingBackground?.src), color: textColor }}
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
