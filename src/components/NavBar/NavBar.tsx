"use client";
import styles from "@/styles/NavBar/desktop.module.css";
import { useEffect, useState } from "react";
import throttle from "lodash.throttle";
import { TopBanner } from "../TopBanner";
import { MegaMenuDesktop } from "./MegaMenuDesktop";
import { MegaMenuMobile } from "./MegaMenuMobile";

const topOfPageThreshold = 200; //when the value of window.scrollY is less than this, we consider that to be the "top of the page"
export type MegaMenu = {
  items: {
    label: string;
    href?: string;
    sections: {
      title?: string;
      links: {
        label: string;
        href: string;
      }[];
    }[];
    featured: {
      caption: string;
      imageUrl: string;
      href: string;
    }[];
  }[];
};
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
  const [atTopOfPage, setAtTopOfPage] = useState(true);

  function onFocusTopLevel(focusedIndex: number) {
    if (focusedIndex !== expandedIndex) setExpandedIndex(null);
  }

  function onClickHamburger() {
    setMobileMenuExpanded(!mobileMenuExpanded);
  }

  const tempMega: MegaMenu = {
    items: [
      {
        label: "Tops",
        sections: [
          {
            title: "Shop Category",
            links: [
              {
                href: "",
                label: "Link 1",
              },
              {
                href: "",
                label: "Link 2",
              },
              {
                href: "",
                label: "Link 3",
              },
            ],
          },
          {
            title: "Featured",
            links: [
              {
                href: "",
                label: "Link 1",
              },
              {
                href: "",
                label: "Link 2",
              },
              {
                href: "",
                label: "Link 3",
              },
            ],
          },
        ],
        featured: [
          {
            caption: "Shop Hoodies",
            href: "",
            imageUrl:
              "https://originusa.com/cdn/shop/files/kilo3_511e5237-5e8f-4e3d-9ffe-380fe54631b4_500x.webp?v=1727274561",
          },
          {
            caption: "Shop T-shirts",
            href: "",
            imageUrl:
              "https://originusa.com/cdn/shop/files/coretee_copy_500x.webp?v=1727801072",
          },
        ],
      },
      {
        label: "Bottoms",
        sections: [
          {
            title: "Shop Category",
            links: [
              {
                href: "",
                label: "Link 1",
              },
              {
                href: "",
                label: "Link 2",
              },
              {
                href: "",
                label: "Link 3",
              },
            ],
          },
          {
            title: "Featured",
            links: [
              {
                href: "",
                label: "Link 1",
              },
              {
                href: "",
                label: "Link 2",
              },
              {
                href: "",
                label: "Link 3",
              },
            ],
          },
        ],
        featured: [
          {
            caption: "Britches",
            href: "",
            imageUrl:
              "https://originusa.com/cdn/shop/files/kilo3_511e5237-5e8f-4e3d-9ffe-380fe54631b4_500x.webp?v=1727274561",
          },
          {
            caption: "Pants",
            href: "",
            imageUrl:
              "https://originusa.com/cdn/shop/files/coretee_copy_500x.webp?v=1727801072",
          },
        ],
      },
    ],
  };

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
          data={tempMega}
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
        data={tempMega}
        menuExpanded={mobileMenuExpanded}
        expandedIndex={expandedIndex}
        setExpandedIndex={setExpandedIndex}
      />
    </div>
  );
}
