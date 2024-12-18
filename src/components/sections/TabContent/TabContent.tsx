"use client";

import { WithTilingBackground } from "@/types/schema/misc";
import { bgImage } from "@/utility/misc";
import { ReactNode, useEffect, useState } from "react";
import styles from "@/styles/sections/TabContent.module.css";
import { ExpandableDiv } from "@/components/global/ExpandableDiv/ExpandableDiv";

type Props = {
  tabBgColor?: string;
  heading: ReactNode;
  contentColor: "normal" | "white";
  sections: {
    title: ReactNode;
    body: ReactNode;
  }[];
} & WithTilingBackground;
export function TabContent({
  contentColor,
  heading,
  sections,
  tabBgColor,
  tilingBackground,
  ...rest
}: Props) {
  const [viewedIndex, setViewedIndex] = useState(-1);
  const viewedSection = sections[viewedIndex];

  useEffect(() => {
    //this is a hack to allow the ExpandableDiv to appear to start expanded. Currently it relies on its state changing from "false" to "true" for the expansion to happen, and this can only happen once its ref is non-null.
    //a better solution is needed when more time is available.
    setTimeout(() => {
      setViewedIndex(0);
    }, 500);
  }, []);

  return (
    <section style={{ ...bgImage(tilingBackground?.src) }} {...rest}>
      <div
        className={`${styles["main"]} ${contentColor === "white" ? styles["content-white"] : ""}`}
      >
        <div className={styles["heading-container"]}>{heading}</div>
        <div className={styles["non-mobile"]}>
          <ul className={styles["tabs-list"]}>
            {sections.map((section, i) => (
              <li
                key={i}
                className={`${styles["tab"]} ${viewedIndex === i ? styles["selected"] : ""}`}
                style={{ backgroundColor: tabBgColor }}
              >
                <button
                  onClick={() => setViewedIndex(i)}
                  aria-expanded={i === viewedIndex}
                >
                  {section.title}
                  <div className={styles["animated-line"]}></div>
                </button>
              </li>
            ))}
          </ul>
          <div
            className={styles["content-container"]}
            style={{ backgroundColor: tabBgColor }}
          >
            {viewedSection && viewedSection.body}
          </div>
        </div>
        <div
          className={styles["mobile"]}
          style={{ backgroundColor: tabBgColor }}
        >
          {sections.map((section, i) => (
            <ExpandableDiv
              key={i}
              label={section.title}
              content={section.body}
              mainClassName={styles["mobile-expandable-div"]}
              labelClassName={styles["mobile-label"]}
              labelExpandedClassName={styles["mobile-label-selected"]}
              labelStyle={{ backgroundColor: tabBgColor }}
              contentClassName={styles["mobile-content"]}
              contentStyle={{ backgroundColor: tabBgColor }}
              expanded={i === viewedIndex}
              onClick={() => setViewedIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
