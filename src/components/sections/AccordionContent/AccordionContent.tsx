"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import styles from "@/styles/sections/AccordionContent.module.css";
import Link from "next/link";

type Props = {
  heading: string;
  subtextNode: ReactNode;
  items: {
    heading: string;
    bodyNode: ReactNode;
    link?: {
      href: string;
      label: string;
    };
  }[];
};
export function AccordionContent({ heading, items, subtextNode }: Props) {
  const accordionRef = useRef(null as HTMLUListElement | null);
  const [expandedIndex, setExpandedIndex] = useState(null as number | null);
  const [maxHeights, setMaxHeights] = useState(
    Array.from({ length: items.length }, () => "0px")
  );

  function getAccordionItemScrollHeight(itemIndex: number) {
    if (!accordionRef.current) return null;

    const accordionItem = accordionRef.current.children[itemIndex];
    if (!accordionItem) return null;

    const bodyContainer = accordionItem.children[1];
    if (!bodyContainer) return null;

    return bodyContainer.scrollHeight;
  }

  useEffect(() => {
    setMaxHeights(
      items.map((_, i) =>
        i === expandedIndex ? `${getAccordionItemScrollHeight(i)}px` : "0px"
      )
    );
  }, [expandedIndex]);

  return (
    <section className={styles["main"]}>
      <div className={styles["container"]}>
        <h2>{heading}</h2>
        <div>{subtextNode}</div>
        <ul className={styles["accordion-container"]} ref={accordionRef}>
          {items.map((item, i) => (
            <li
              key={item.heading}
              className={`${styles["accordion-item"]} ${expandedIndex === i ? styles["expanded"] : ""}`}
            >
              <button
                className={styles["accordion-item-heading-row"]}
                onClick={() => setExpandedIndex(i)}
                aria-expanded={i === expandedIndex}
              >
                <h3>{item.heading}</h3>
                <div
                  className={styles["expand-contract-icon"]}
                  aria-hidden={true}
                >
                  +
                </div>
              </button>
              <div
                className={styles["accordion-item-body-container"]}
                style={{ maxHeight: maxHeights[i] || "0px" }}
              >
                {item.bodyNode}
                {item.link && (
                  <div className={styles["accordion-item-bottom-row"]}>
                    <Link
                      href={item.link.href}
                      tabIndex={i === expandedIndex ? 0 : -1}
                    >
                      {item.link.label} →
                    </Link>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
