import {
  LinkAsButton,
  LinkAsButtonData,
} from "@/components/global/LinkAsButton/LinkAsButton";
import { WithTilingBackground } from "@/types/schema/misc";
import { bgImage } from "@/utility/misc";
import { ReactNode } from "react";
import styles from "@/styles/sections/VideoCards.module.css";

type Props = {
  heading: ReactNode;
  textColor?: string;
  cardBgColor?: string;
  cards: {
    embedCode?: string;
    heading: ReactNode;
    body: ReactNode;
    button?: LinkAsButtonData;
  }[];
} & WithTilingBackground;
export function VideoCards({
  cards,
  heading,
  cardBgColor,
  textColor,
  tilingBackground,
  ...rest
}: Props) {
  const cardCount = cards.length;

  return (
    <section style={{ ...bgImage(tilingBackground?.src) }} {...rest}>
      <div
        className={`${styles["main"]} ${styles[`cards-${cardCount}`] || ""} x-wide-container`}
        style={{ color: textColor }}
      >
        {heading}
        <div className={styles["cards-flex"]}>
          {cards.map((card, i) => {
            //adjust undesired embed code attributes
            const adjustedCode = card.embedCode
              ? card.embedCode
                  .replace(/width="[^"*]*"/g, 'width="100%"')
                  .replace(/height="[^"]*"/g, "")
              : "";

            return (
              <div
                key={i}
                className={styles["card"]}
                style={{ backgroundColor: cardBgColor }}
              >
                <div
                  className={styles["video-container"]}
                  dangerouslySetInnerHTML={{ __html: adjustedCode || "" }}
                ></div>
                <div className={styles["card-content"]}>
                  {card.heading}
                  {card.body}
                  {card.button && <LinkAsButton data={card.button} />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
