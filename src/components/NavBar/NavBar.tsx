"use client";
import styles from "@/styles/NavBar/desktop.module.css";
import { useEffect, useState } from "react";
import throttle from "lodash.throttle";
import { TopBanner } from "./TopBanner";
import { MegaMenuDesktop } from "./MegaMenuDesktop";
import { MegaMenuMobile } from "./MegaMenuMobile";
import { MegaMenu } from "@/types/schema/navbar";

const topOfPageThreshold = 200; //when the value of window.scrollY is less than this, we consider that to be the "top of the page"
type Props = {
  data: MegaMenu;
};
export function NavBar({ data }: Props) {
  const [expandedIndex, setExpandedIndex] = useState(null as number | null);
  const [mobileMenuExpanded, setMobileMenuExpanded] = useState(false);
  const [atTopOfPage, setAtTopOfPage] = useState(true);

  function onFocusTopLevel(focusedIndex: number) {
    if (focusedIndex !== expandedIndex) setExpandedIndex(null);
  }

  function onClickHamburger() {
    setMobileMenuExpanded(!mobileMenuExpanded);
  }

  useEffect(() => {
    const handleScroll = throttle(() => {
      const atTop = window.scrollY < topOfPageThreshold;
      setAtTopOfPage(atTop);
    }, 200);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles["nav-container"]}>
      <TopBanner
        hidden={!atTopOfPage}
        text="This is a test banner"
        bgColorHexCode="ff0000"
        textColorHexCode="ffffff"
      />

      <nav
        aria-label="Main"
        className={`${styles["main"]} ${
          !atTopOfPage ? styles["compressed"] : ""
        }`}
      >
        <MegaMenuDesktop
          data={data}
          expandedIndex={expandedIndex}
          onFocusTopLevel={onFocusTopLevel}
          setExpandedIndex={setExpandedIndex}
        />
        <button
          className={styles["hamburger-button"]}
          onClick={onClickHamburger}
        >
          ☰
        </button>
      </nav>
      <MegaMenuMobile
        data={data}
        menuExpanded={mobileMenuExpanded}
        expandedIndex={expandedIndex}
        setExpandedIndex={setExpandedIndex}
      />
    </div>
  );
}
