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
          <a
            href=""
            onClick={(e) => {
              if (
                !item.href ||
                (e.target as HTMLAnchorElement).href === window.location.href
              ) {
                e.preventDefault();
              }
              setExpandedIndex(i === expandedIndex ? null : i);
            }}
            onFocus={() => onFocusTopLevel(i)}
          >
            {item.label}
            <div
              className={`${styles["nav-item-underline"]} ${expandedIndex === i ? styles["expanded"] : ""}`}
            ></div>
          </a>

          {/* Dropdown with sections, if any */}

          {item.sections.length && (
            <ul
              className={`${styles["mega-menu-dropdown"]} ${expandedIndex === i ? styles["expanded"] : ""}`}
            >
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
                            tabIndex={i === expandedIndex ? 0 : -1}
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
                  {item.featured.map((featured, i) => (
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
          )}
        </li>
      ))}

      {specialLink && (
        <li className={styles["special-link-container"]}>
          <Link href={specialLink.href}>
            {/* <span className={styles["special-link"]}>testingtesting</span> */}
            {specialLink.text}
          </Link>
        </li>
      )}
    </ul>
  );
}
