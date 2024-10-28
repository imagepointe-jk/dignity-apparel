import styles from "@/styles/NavBar/mobile.module.css";
import { MegaMenu } from "./NavBar";
import { FeaturedCard } from "./FeaturedCard";

type Props = {
  data: MegaMenu;
  menuExpanded: boolean;
  expandedIndex: number | null;
  setExpandedIndex: (index: number | null) => void;
};
export function MegaMenuMobile({
  data,
  menuExpanded,
  expandedIndex,
  setExpandedIndex,
}: Props) {
  return (
    <div
      className={`${styles["main"]} ${
        menuExpanded ? styles["mobile-expanded"] : ""
      }`}
    >
      <ul className={styles["nav-items"]}>
        {data.items.map((item, i) => (
          <li
            key={i}
            className={styles["nav-item"]}
            onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
          >
            {item.href && <a href={item.href}>{item.label}</a>}
            {item.sections.length && (
              <>
                <div>{item.label}</div>
                <ul
                  className={`${styles["mega-menu-dropdown"]} ${expandedIndex === i ? styles["expanded"] : ""}`}
                >
                  {item.sections.map((section, j) => (
                    <li
                      key={section.title || j}
                      className={styles["mega-menu-dropdown-section"]}
                    >
                      {section.title}
                      <ul>
                        {section.links.map((link) => (
                          <li key={link.label}>
                            <a href={link.href}>{link.label}</a>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                  {item.featured.map((featured) => (
                    <li key={featured.caption}>
                      <FeaturedCard data={{ ...featured, tabIndex: 0 }} />
                    </li>
                  ))}
                </ul>
              </>
            )}
            {/* {item.href && <a href={item.href}>{item.label}</a>}
            {item.sections.length && (
              <div>
                <div>{item.label}</div>
                <ul className={styles["mega-menu-dropdown-mobile"]}>
                  {item.sections.map((section, i) => (
                    <li key={section.title || i}>{section.title}</li>
                  ))}
                </ul>
              </div>
            )} */}
          </li>
          //   <li
          //     key={i}
          //     className={`${styles["nav-item-mobile"]} ${
          //       item.subItems ? styles["has-nav-dropdown"] : ""
          //     }`}
          //   >
          //     {!item.subItems && <a href={item.href}>{item.text}</a>}
          //     {item.subItems && (
          //       <div
          //         className={`${styles["nav-dropdown-mobile"]} ${
          //           expandedIndex === i ? styles["expanded"] : ""
          //         }`}
          //         onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
          //       >
          //         <div className={styles["nav-dropdown-item-text"]}>
          //           {item.text}
          //         </div>
          //         <ul className={styles["nav-dropdown-items-mobile"]}>
          //           {item.subItems.map((sub, i) => (
          //             <li key={i} className={styles["nav-dropdown-item-mobile"]}>
          //               <a href={sub.href}>{sub.text}</a>
          //             </li>
          //           ))}
          //         </ul>
          //       </div>
          //     )}
          //   </li>
        ))}
      </ul>
    </div>
  );
}
