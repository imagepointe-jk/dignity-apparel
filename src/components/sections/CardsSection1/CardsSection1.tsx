import { ReactNode } from "react";
import styles from "@/styles/sections/CardsSection1.module.css";
import {
  LinkAsButton,
  LinkAsButtonData,
} from "@/components/global/LinkAsButton/LinkAsButton";
import { WithTilingBackground } from "@/types/schema/misc";
import { bgImage } from "@/utility/misc";

type Props = {
  id?: string | null;
  cards: {
    image: {
      src: string;
      alt: string;
    };
    headingNode: ReactNode;
    bodyNode: ReactNode;
    button?: LinkAsButtonData;
  }[];
} & WithTilingBackground;
export function CardsSection1({ id, tilingBackground, cards, ...rest }: Props) {
  return (
    <section
      id={id ? id : undefined}
      className={styles["main"]}
      {...rest}
      style={{ ...bgImage(tilingBackground?.src) }}
    >
      {cards.map((card, i) => (
        <div key={i} className={styles["card"]}>
          <img src={card.image.src} alt={card.image.alt} />
          {card.headingNode}
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
