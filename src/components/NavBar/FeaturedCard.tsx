import styles from "@/styles/NavBar/desktop.module.css";

type Props = {
  data: {
    href: string;
    tabIndex: number;
    imageUrl: string;
    caption: string;
  };
};
export function FeaturedCard({
  data: { href, tabIndex, imageUrl, caption },
}: Props) {
  return (
    <a
      href={href}
      className={styles["mega-menu-dropdown-featured-container"]}
      tabIndex={tabIndex}
    >
      <img src={imageUrl} style={{ height: "300px" }} />
      <div className={styles["mega-menu-dropdown-featured-caption"]}>
        {caption}
      </div>
    </a>
  );
}
