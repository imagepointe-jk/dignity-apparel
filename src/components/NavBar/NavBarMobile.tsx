import { CompoundNavItem } from "./NavBar";
import styles from "@/styles/NavBar.module.css";

type Props = {
  items: CompoundNavItem[];
  expandedIndex: number | null;
  menuExpanded: boolean;
  setExpandedIndex: (index: number | null) => void;
};
export function NavBarMobile({
  items,
  expandedIndex,
  menuExpanded,
  setExpandedIndex,
}: Props) {
  return (
    <div
      className={`${styles["nav-menu-mobile-container"]} ${
        menuExpanded ? styles["mobile-expanded"] : ""
      }`}
    >
      <ul className={styles["nav-items-mobile"]}>
        {items.map((item, i) => (
          <li
            key={i}
            className={`${styles["nav-item-mobile"]} ${
              item.subItems ? styles["has-nav-dropdown"] : ""
            }`}
          >
            {!item.subItems && <a href={item.href}>{item.text}</a>}
            {item.subItems && (
              <div
                className={`${styles["nav-dropdown-mobile"]} ${
                  expandedIndex === i ? styles["expanded"] : ""
                }`}
                onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
              >
                <div className={styles["nav-dropdown-item-text"]}>
                  {item.text}
                </div>
                <ul className={styles["nav-dropdown-items-mobile"]}>
                  {item.subItems.map((sub, i) => (
                    <li key={i} className={styles["nav-dropdown-item-mobile"]}>
                      <a href={sub.href}>{sub.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
