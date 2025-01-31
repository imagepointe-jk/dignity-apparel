"use client";

import { Cutting as CuttingIcon } from "@/components/icons/production/Cutting";
import { Dyeing as DyeingIcon } from "@/components/icons/production/Dyeing";
import { Growing as GrowingIcon } from "@/components/icons/production/Growing";
import { Knitting as KnittingIcon } from "@/components/icons/production/Knitting";
import { Sewing as SewingIcon } from "@/components/icons/production/Sewing";
import styles from "@/styles/sections/ValueChain.module.css";
import { useEffect, useRef, useState } from "react";
import { Cutting } from "./Cutting";
import { Dyeing } from "./Dyeing";
import { Growing } from "./Growing";
import { Knitting } from "./Knitting";
import { Sewing } from "./Sewing";

type Props = {
  id?: string | null;
};
type Section = "growing" | "knitting" | "dyeing" | "cutting" | "sewing";
export function ValueChain({ id }: Props) {
  const [selected, setSelected] = useState("growing" as Section);
  const sectionRef = useRef(null as HTMLDivElement | null);
  const growingRef = useRef(null as HTMLButtonElement | null);

  useEffect(() => {
    const doScrolling = window.innerWidth <= 1280;
    if (!doScrolling || !growingRef.current || !sectionRef.current) return;

    const growingRect = growingRef.current.getBoundingClientRect();
    const growingRectAbsoluteY = growingRect.top + window.scrollY;
    const perSectionHeight = growingRect.height; //assume that every unexpanded button is the same height
    const extraScroll = -80;

    let targetAbsoluteY = growingRectAbsoluteY;
    if (selected === "knitting") targetAbsoluteY += perSectionHeight * 1;
    if (selected === "dyeing") targetAbsoluteY += perSectionHeight * 2;
    if (selected === "cutting") targetAbsoluteY += perSectionHeight * 3;
    if (selected === "sewing") targetAbsoluteY += perSectionHeight * 4;

    window.scrollTo(0, targetAbsoluteY + extraScroll);
  }, [selected]);

  return (
    <section
      id={id ? id : undefined}
      className={styles["section"]}
      ref={sectionRef}
    >
      <div className={styles["main"]}>
        <h2 className="merriweather">
          USA-Made Garment Production Value Chain
        </h2>
        <ul className={styles["expandable-list"]}>
          <li className={selected === "growing" ? styles["selected"] : ""}>
            <button
              className={styles["expand-button"]}
              onClick={() => setSelected("growing")}
              ref={growingRef}
            >
              <GrowingIcon size={70} /> Growing
            </button>
            <Growing />
          </li>
          <li className={selected === "knitting" ? styles["selected"] : ""}>
            <button
              className={styles["expand-button"]}
              onClick={() => setSelected("knitting")}
            >
              <KnittingIcon size={70} /> Knitting
            </button>
            <Knitting />
          </li>
          <li className={selected === "dyeing" ? styles["selected"] : ""}>
            <button
              className={styles["expand-button"]}
              onClick={() => setSelected("dyeing")}
            >
              <DyeingIcon size={70} /> Dyeing
            </button>
            <Dyeing />
          </li>
          <li className={selected === "cutting" ? styles["selected"] : ""}>
            <button
              className={styles["expand-button"]}
              onClick={() => setSelected("cutting")}
            >
              <CuttingIcon size={70} /> Cutting
            </button>
            <Cutting />
          </li>
          <li className={selected === "sewing" ? styles["selected"] : ""}>
            <button
              className={styles["expand-button"]}
              onClick={() => setSelected("sewing")}
            >
              <SewingIcon size={70} /> Sewing
            </button>
            <Sewing />
          </li>
        </ul>
      </div>
    </section>
  );
}
