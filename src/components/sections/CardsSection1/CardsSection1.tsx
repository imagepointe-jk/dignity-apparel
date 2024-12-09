import { ReactNode } from "react";
import styles from "@/styles/sections/CardsSection1.module.css";
import {
  LinkAsButton,
  LinkAsButtonData,
} from "@/components/global/LinkAsButton/LinkAsButton";
import { WithTilingBackground } from "@/types/schema/misc";
import { bgImage } from "@/utility/misc";

type Props = {
  cards: {
    image: {
      src: string;
      alt: string;
    };
    heading: string;
    bodyNode: ReactNode;
    button: LinkAsButtonData;
  }[];
} & WithTilingBackground;
export function CardsSection1({ tilingBackground, cards, ...rest }: Props) {
  return (
    <section
      className={styles["main"]}
      {...rest}
      style={{ ...bgImage(tilingBackground?.src) }}
    >
      {cards.map((card) => (
        <div key={card.heading} className={styles["card"]}>
          <img src={card.image.src} alt={card.image.alt} />
          <h2>{card.heading}</h2>
          <div>{card.bodyNode}</div>
          {card.button && (
            <div>
              <LinkAsButton data={card.button} />
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
