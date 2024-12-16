import {
  LinkAsButton,
  LinkAsButtonData,
} from "@/components/global/LinkAsButton/LinkAsButton";
import { WithTilingBackground } from "@/types/schema/misc";
import { bgImage } from "@/utility/misc";
import { ReactNode } from "react";
import styles from "@/styles/sections/ContentCards.module.css";

type Props = {
  heading: ReactNode;
  textColor?: string;
  cardType: "text overlay" | "text below";
  cards: {
    heading: ReactNode;
    body: ReactNode;
    button?: LinkAsButtonData;
    image: {
      src: string;
      alt?: string;
    };
  }[];
} & WithTilingBackground;
export function ContentCards({
  heading,
  textColor,
  cardType,
  cards,
  tilingBackground,
  ...rest
}: Props) {
  const cardCount = cards.length;
  const textBelow = cardType === "text below";

  return (
    <section
      style={{ color: textColor, ...bgImage(tilingBackground?.src) }}
      {...rest}
    >
      <div
        className={`${styles["main"]} ${styles[`cards-${cardCount}`]} ${textBelow ? styles["card-type-text-below"] : ""} x-wide-container`}
      >
        {heading}
        <div className={styles["cards-flex"]}>
          {cards.map((card, i) => (
            <div key={i} className={styles["card"]}>
              <div className={styles["card-bg-container"]}>
                <img src={card.image.src} alt={card.image.alt} />
                <div className={styles["card-image-overlay"]}></div>
                <div className={styles["card-hover-line"]}></div>
              </div>
              <div className={styles["card-content"]}>
                <div style={{ color: textBelow ? textColor : undefined }}>
                  {card.heading}
                  {card.body}
                </div>
                {card.button && <LinkAsButton data={card.button} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
