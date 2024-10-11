"use client";
import styles from "@/styles/NavBar.module.css";
import { useEffect, useState } from "react";
import { NavItemsDesktop } from "./NavItemsDesktop";
import { NavBarMobile } from "./NavBarMobile";
import throttle from "lodash.throttle";

const topOfPageThreshold = 200; //when the value of window.scrollY is less than this, we consider that to be the "top of the page"
export type NavItem = {
  text: string;
  href: string;
};
export type CompoundNavItem = NavItem & {
  subItems?: { text: string; href: string }[];
};
export function NavBar() {
  const [expandedIndex, setExpandedIndex] = useState(null as number | null);
  const [mobileMenuExpanded, setMobileMenuExpanded] = useState(false);
  const [atTopOfPage, setAtTopOfPage] = useState(
    window.scrollY < topOfPageThreshold
  );

  function onFocusTopLevel(focusedIndex: number) {
    if (focusedIndex !== expandedIndex) setExpandedIndex(null);
  }

  function onClickHamburger() {
    setMobileMenuExpanded(!mobileMenuExpanded);
  }

  const tempItems: CompoundNavItem[] = [
    {
      text: "Page 1",
      href: "",
    },
    {
      text: "Page Group 1",
      href: "",
      subItems: [
        {
          text: "Subpage 1",
          href: "",
        },
        {
          text: "Subpage 2",
          href: "",
        },
        {
          text: "Subpage 3",
          href: "",
        },
        {
          text: "Subpage 4",
          href: "",
        },
        {
          text: "Subpage 5",
          href: "",
        },
        {
          text: "Subpage 6",
          href: "",
        },
        {
          text: "Subpage 7",
          href: "",
        },
        {
          text: "Subpage 8",
          href: "",
        },
      ],
    },
    {
      text: "Page 2",
      href: "",
    },
    {
      text: "Page Group 2",
      href: "",
      subItems: [
        {
          text: "Subpage 1",
          href: "",
        },
        {
          text: "Subpage 2",
          href: "",
        },
        {
          text: "Subpage 3",
          href: "",
        },
      ],
    },
    {
      text: "Page 3",
      href: "",
    },
  ];

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
      <nav
        aria-label="Main"
        className={`${styles["main"]} ${
          !atTopOfPage ? styles["compressed"] : ""
        }`}
      >
        <NavItemsDesktop
          items={tempItems}
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
      <NavBarMobile
        expandedIndex={expandedIndex}
        items={tempItems}
        menuExpanded={mobileMenuExpanded}
        setExpandedIndex={setExpandedIndex}
      />
    </div>
  );
}
