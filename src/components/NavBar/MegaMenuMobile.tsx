import stylesDesktop from "@/styles/NavBar/desktop.module.css";
import styles from "@/styles/NavBar/mobile.module.css";
import { MegaMenu, MegaMenuSection } from "@/types/schema/navbar";
import Link from "next/link";
import { Fragment, useState } from "react";

type Props = {
  data: MegaMenu;
  closeFn: () => void;
  specialLink?: {
    text: string;
    href: string;
  };
};
export function MegaMenuMobile({ data, closeFn, specialLink }: Props) {
  const [expandedIndex, setExpandedIndex] = useState(null as number | null);

  return (
    <nav className={styles["nav-main-container"]} id="nav-mobile">
      <ul className={styles["nav-items-container"]}>
        {/* Map through each nav item */}

        {data.items.map((navItem, i) => (
          <li
            key={navItem.label}
            className={`${styles["nav-item"]} ${expandedIndex === i ? styles["expanded"] : ""}`}
            onClick={() => setExpandedIndex(i)}
          >
            <div className={styles["nav-item-label"]}>
              {navItem.sections.length === 0 &&
                navItem.featured.length === 0 && (
                  <Link
                    href={navItem.href || ""}
                    className="metropolis-24"
                    onClick={closeFn}
                  >
                    {navItem.label}
                  </Link>
                )}
              {(navItem.sections.length > 0 || navItem.featured.length > 0) && (
                <button
                  className="metropolis-24"
                  aria-expanded={expandedIndex === i}
                  aria-controls={`${navItem.label}-submenu`}
                >
                  {navItem.label}
                </button>
              )}
              <div className={styles["animated-line"]}></div>
            </div>

            {/* Within the nav item, map through each of the nav item's sections */}

            {(navItem.sections.length > 0 || navItem.featured.length > 0) && (
              <ul
                className={styles["nav-item-sections-container"]}
                id={`${navItem.label}-submenu`}
                inert={expandedIndex !== i ? true : undefined}
              >
                <Sections sections={navItem.sections} closeFn={closeFn} />

                {/* Also map through the nav item's "featured" images and display them as normal subitems for the mobile view */}

                {navItem.featured.map((featured) => (
                  <li key={featured.caption}>
                    <Link
                      href={featured.href}
                      className={styles["nav-subitem-label"]}
                      onClick={closeFn}
                    >
                      {featured.caption}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
        {specialLink && (
          <div
            className={`${stylesDesktop["special-link-container"]} ${styles["special-link-container"]}`}
          >
            <Link href={specialLink.href}>{specialLink.text}</Link>
          </div>
        )}
      </ul>
    </nav>
  );
}

type SectionsProps = {
  sections: MegaMenuSection[];
  closeFn: () => void;
};
function Sections({ sections, closeFn }: SectionsProps) {
  const [expandedIndex, setExpandedIndex] = useState(null as number | null);

  return sections.map((section, i) => (
    <Fragment key={section.title || i}>
      {!section.title &&
        section.links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className={styles["nav-subitem-label"]}
              onClick={closeFn}
            >
              {link.label}
            </Link>
          </li>
        ))}
      {section.title && (
        <li
          className={`${styles["nav-subitem"]} ${expandedIndex === i ? styles["expanded"] : ""}`}
        >
          <button
            className={styles["nav-subitem-label"]}
            aria-expanded={expandedIndex === i}
            aria-controls={`${section.title}-submenu`}
            onClick={() => setExpandedIndex(i)}
          >
            {section.title}
            <img src="da-tri.png" alt="n/a" aria-hidden={true} />
          </button>
          <ul
            className={styles["nav-subitem-links-container"]}
            id={`${section.title}-submenu`}
            inert={expandedIndex !== i ? true : undefined}
          >
            {section.links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={styles["nav-subitem-link"]}
                  onClick={closeFn}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      )}
    </Fragment>
  ));
}
