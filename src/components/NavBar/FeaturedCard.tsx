import styles from "@/styles/NavBar/desktop.module.css";

type Props = {
  data: {
    href: string;
    tabIndex: number;
    imageUrl: string;
    imageAlt: string;
    caption: string;
  };
};
export function FeaturedCard({
  data: { href, tabIndex, imageUrl, imageAlt, caption },
}: Props) {
  return (
    <a
      href={href}
      className={styles["mega-menu-dropdown-featured-container"]}
      tabIndex={tabIndex}
    >
      <img src={imageUrl} alt={imageAlt} />
      <div className={styles["mega-menu-dropdown-featured-caption"]}>
        {caption}
        <img
          src="/da-tri.png"
          className={styles["mega-menu-dropdown-featured-arrow"]}
        />
      </div>
    </a>
  );
}
