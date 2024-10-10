"use client";
import styles from "@/styles/NavBar.module.css";
import { useState } from "react";

type NavItem = {
  text: string;
  href: string;
};
type CompoundNavItem = NavItem & {
  subItems?: { text: string; href: string }[];
};
export function NavBar() {
  const [expandedIndex, setExpandedIndex] = useState(null as number | null);

  function onFocusTopLevel(focusedIndex: number) {
    if (focusedIndex !== expandedIndex) setExpandedIndex(null);
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

  return (
    <nav aria-label="Main" className={styles["main"]}>
      <ul className={styles["nav-items"]}>
        {tempItems.map((item, i) => (
          <li
            key={i}
            onMouseOver={() => setExpandedIndex(i)}
            onMouseOut={() => setExpandedIndex(null)}
            className={`${styles["nav-item"]} ${
              item.subItems ? styles["has-nav-dropdown"] : ""
            }`}
          >
            {!item.subItems && (
              <a href={item.href} onFocus={() => onFocusTopLevel(i)}>
                {item.text}
              </a>
            )}
            {item.subItems && (
              <NavDropdown
                key={i}
                expanded={i === expandedIndex}
                items={item.subItems}
                text={item.text}
                onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                onFocusTopLevel={() => onFocusTopLevel(i)}
              />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

type NavDropdownProps = {
  text: string;
  items: NavItem[];
  expanded: boolean;
  onClick: () => void;
  onFocusTopLevel: () => void;
};
function NavDropdown({
  text,
  items,
  expanded,
  onClick,
  onFocusTopLevel,
}: NavDropdownProps) {
  return (
    <>
      <a
        href=""
        aria-expanded={expanded}
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
        onFocus={onFocusTopLevel}
      >
        {text}
      </a>
      <ul
        className={`${styles["nav-dropdown-items"]} ${
          expanded ? styles["nav-dropdown-expanded"] : ""
        }`}
      >
        {items.map((item, i) => (
          <li key={i} className={styles["nav-dropdown-item"]}>
            <a href={item.href} tabIndex={expanded ? 0 : -1}>
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
