import {
  LinkAsButton,
  LinkAsButtonData,
} from "@/components/global/LinkAsButton/LinkAsButton";
import { ReactNode } from "react";
import styles from "@/styles/sections/IconCards.module.css";
import { bgImage } from "@/utility/misc";

type Props = {
  bgImage: {
    src?: string;
    behavior: "tile" | "fill" | "parallax";
    overlayOpacity: number;
  };
  primaryTextColor?: "black" | "white";
  iconDetailTextColor?: string;
  heading?: ReactNode;
  subheading?: ReactNode;
  body?: ReactNode;
  button?: LinkAsButtonData;
  cards: {
    image?: {
      src: string;
      alt: string;
    };
    title?: ReactNode;
    detailText?: ReactNode;
    link?: {
      label: string;
      href: string;
    };
  }[];
};
export function IconCards({
  bgImage: bgImageData,
  cards,
  body,
  button,
  heading,
  iconDetailTextColor,
  primaryTextColor,
  subheading,
  ...rest
}: Props) {
  const bgStyle = {
    ...bgImage(bgImageData.src),
    backgroundSize:
      bgImageData.behavior === "fill" || bgImageData.behavior === "parallax"
        ? "cover"
        : undefined,
    backgroundPosition:
      bgImageData.behavior === "fill" || bgImageData.behavior === "parallax"
        ? "center"
        : undefined,
    backgroundAttachment:
      bgImageData.behavior === "parallax" ? "fixed" : undefined,
  };

  return (
    <section className={styles["section"]} style={bgStyle} {...rest}>
      <div
        className={styles["bg-overlay"]}
        style={{
          backgroundColor: `rgba(0, 0, 0, ${bgImageData.overlayOpacity})`,
        }}
      ></div>
      <div
        className={`${styles["main"]} ${primaryTextColor === "white" ? styles["content-white"] : ""}`}
      >
        {heading}
        <div className={styles["main-text-content"]}>
          {subheading}
          {body}
        </div>
        <div className={styles["cards-flex"]}>
          {cards.map((card, i) => (
            <div key={i} className={styles["card"]}>
              {card.image && <img src={card.image.src} alt={card.image.alt} />}
              <div className={styles["card-title"]}>{card.title}</div>
              <div
                className={styles["card-details"]}
                style={{ color: iconDetailTextColor }}
              >
                {card.detailText}
              </div>
              {card.link && (
                <a
                  href={card.link.href}
                  className={`${styles["card-link"]} link-with-arrow`}
                >
                  {card.link.label}
                </a>
              )}
            </div>
          ))}
        </div>
        {button && <LinkAsButton data={button} />}
      </div>
    </section>
  );
}
