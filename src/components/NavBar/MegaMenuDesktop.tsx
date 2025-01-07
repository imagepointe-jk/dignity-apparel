import styles from "@/styles/NavBar/desktop.module.css";
import { FeaturedCard } from "./FeaturedCard";
import { MegaMenu } from "@/types/schema/navbar";
import Link from "next/link";

type Props = {
  data: MegaMenu;
  specialLink?: {
    text: string;
    href: string;
  };
  expandedIndex: number | null;
  setExpandedIndex: (i: number | null) => void;
  onFocusTopLevel: (focusedIndex: number) => void;
};
export function MegaMenuDesktop({
  data,
  specialLink,
  expandedIndex,
  setExpandedIndex,
  onFocusTopLevel,
}: Props) {
  return (
    <ul className={styles["nav-items"]}>
      {/* Top level nav items */}

      {data.items.map((item, i) => (
        <li
          key={item.label}
          className={`${styles["nav-item"]} ${styles["has-nav-dropdown"]}`}
          onMouseOver={() => setExpandedIndex(i)}
          onMouseOut={() => setExpandedIndex(null)}
        >
          {/* If there are sections for a dropdown, show a button here */}
          {item.sections.length > 0 && (
            <button
              onClick={() => setExpandedIndex(i === expandedIndex ? null : i)}
              onFocus={() => onFocusTopLevel(i)}
            >
              {item.label}
              <div
                className={`${styles["nav-item-underline"]} ${expandedIndex === i ? styles["expanded"] : ""}`}
              ></div>
            </button>
          )}

          {/* if there are no sections for a dropdown, show a link */}
          {item.sections.length === 0 && (
            <Link href={item.href || ""} onFocus={() => onFocusTopLevel(i)}>
              {item.label}
              <div
                className={`${styles["nav-item-underline"]} ${expandedIndex === i ? styles["expanded"] : ""}`}
              ></div>
            </Link>
          )}

          {/* Dropdown with sections, if any */}

          {item.sections.length > 0 && (
            <div
              className={`${styles["mega-menu-dropdown-container"]} ${expandedIndex === i ? styles["expanded"] : undefined}`}
            >
              <ul className={styles["mega-menu-dropdown"]}>
                {/* The link sections */}
                <li className={styles["mega-menu-dropdown-sections-container"]}>
                  <ul>
                    {item.sections.map((section, j) => (
                      <li key={section.title || `${j}`}>
                        <ul className={styles["mega-menu-dropdown-section"]}>
                          {section.title && (
                            <li
                              className={
                                styles["mega-menu-dropdown-section-title"]
                              }
                            >
                              {section.title}
                            </li>
                          )}
                          <li>
                            <ul>
                              {section.links.map((link) => (
                                <li key={link.label}>
                                  <a
                                    href={link.href}
                                    tabIndex={i === expandedIndex ? 0 : -1}
                                  >
                                    {link.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </li>
                        </ul>
                      </li>
                    ))}
                  </ul>
                </li>
                {/* Featured images wrapped with links */}
                <li>
                  <ul
                    className={
                      styles["mega-menu-dropdown-featured-items-container"]
                    }
                  >
                    {item.featured.map((featured) => (
                      <li key={featured.caption}>
                        <FeaturedCard
                          data={{
                            ...featured,
                            tabIndex: i === expandedIndex ? 0 : -1,
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
          )}
        </li>
      ))}

      {specialLink && (
        <li className={styles["special-link-container"]}>
          <Link href={specialLink.href}>{specialLink.text}</Link>
        </li>
      )}
    </ul>
  );
}
