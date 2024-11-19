import { ReactNode } from "react";
import styles from "@/styles/sections/CardsSection1.module.css";
import {
  LinkAsButton,
  LinkAsButtonData,
} from "@/components/global/LinkAsButton/LinkAsButton";

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
};
export function CardsSection1({ cards, ...rest }: Props) {
  return (
    <section className={styles["main"]} {...rest}>
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
