import stylesDesktop from "@/styles/NavBar/desktop.module.css";
import styles from "@/styles/NavBar/mobile.module.css";
import { MegaMenu, MegaMenuSection } from "@/types/schema/navbar";
import Link from "next/link";
import { useState } from "react";
import { XMark } from "../icons/XMark";

type Props = {
  data: MegaMenu;
  menuExpanded: boolean;
  closeFn: () => void;
  specialLink?: {
    text: string;
    href: string;
  };
};
export function MegaMenuMobile({
  data,
  menuExpanded,
  closeFn,
  specialLink,
}: Props) {
  const [expandedIndex, setExpandedIndex] = useState(null as number | null);

  return (
    <div
      className={`${styles["main"]} ${
        menuExpanded ? styles["mobile-expanded"] : ""
      }`}
    >
      <div className={styles["nav-main-container"]}>
        <button className={styles["close-x"]} onClick={closeFn}>
          <XMark size={32} />
        </button>
        <div className={styles["nav-items-container"]}>
          {/* Map through each nav item */}

          {data.items.map((navItem, i) => (
            <div
              key={navItem.label}
              className={`${styles["nav-item"]} ${expandedIndex === i ? styles["expanded"] : ""}`}
              onClick={() => setExpandedIndex(i)}
            >
              <div
                className={`${styles["nav-item-label"]} subheader-1-regular`}
              >
                {navItem.sections.length === 0 &&
                  navItem.featured.length === 0 && (
                    <Link href={navItem.href || ""}>{navItem.label}</Link>
                  )}
                {(navItem.sections.length > 0 || navItem.featured.length > 0) &&
                  navItem.label}
                <div className={styles["animated-line"]}></div>
              </div>

              {/* Within the nav item, map through each of the nav item's sections */}

              {(navItem.sections.length > 0 || navItem.featured.length > 0) && (
                <div className={styles["nav-item-sections-container"]}>
                  <Sections sections={navItem.sections} />

                  {/* Also map through the nav item's "featured" images and display them as normal subitems for the mobile view */}

                  {navItem.featured.map((featured) => (
                    <div key={featured.caption}>
                      <Link
                        href={featured.href}
                        className={styles["nav-subitem-label"]}
                      >
                        {featured.caption}
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          {specialLink && (
            <div
              className={`${stylesDesktop["special-link-container"]} ${styles["special-link-container"]}`}
            >
              <Link href={specialLink.href}>{specialLink.text}</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

type SectionsProps = {
  sections: MegaMenuSection[];
};
function Sections({ sections }: SectionsProps) {
  const [expandedIndex, setExpandedIndex] = useState(null as number | null);

  return sections.map((section, i) => (
    <>
      {!section.title &&
        section.links.map((link) => (
          <div key={link.label}>
            <Link href={link.href} className={styles["nav-subitem-label"]}>
              {link.label}
            </Link>
          </div>
        ))}
      {section.title && (
        <div
          className={`${styles["nav-subitem"]} ${expandedIndex === i ? styles["expanded"] : ""}`}
        >
          <div
            className={styles["nav-subitem-label"]}
            onClick={() => setExpandedIndex(i)}
          >
            {section.title}
          </div>
          <div className={styles["nav-subitem-links-container"]}>
            {section.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={styles["nav-subitem-link"]}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  ));
}
