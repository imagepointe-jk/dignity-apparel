import { NavItem } from "./NavBar";
import styles from "@/styles/NavBar.module.css";

type NavDropdownProps = {
  text: string;
  items: NavItem[];
  expanded: boolean;
  onClick: () => void;
  onFocusTopLevel: () => void;
};
export function NavDropdown({
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
