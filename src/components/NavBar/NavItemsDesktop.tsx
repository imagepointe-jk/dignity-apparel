import { CompoundNavItem } from "./NavBar";
import styles from "@/styles/NavBar.module.css";
import { NavDropdown } from "./NavDropdown";

type Props = {
  items: CompoundNavItem[];
  expandedIndex: number | null;
  setExpandedIndex: (index: number | null) => void;
  onFocusTopLevel: (focusedIndex: number) => void;
};
export function NavItemsDesktop({
  items,
  expandedIndex,
  setExpandedIndex,
  onFocusTopLevel,
}: Props) {
  return (
    <ul className={styles["nav-items"]}>
      {items.map((item, i) => (
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
  );
}
