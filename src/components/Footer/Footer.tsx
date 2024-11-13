import { Footer as FooterType } from "@/types/schema/footer";
import styles from "@/styles/Footer/Footer.module.css";
import Link from "next/link";

type Props = {
  data: FooterType;
};
export function Footer({ data: { iconLinks, sections } }: Props) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles["main"]}>
      <div className={styles["main-row"]}>
        {sections.map((section, i) => (
          <div key={`${section.title}-${i}`}>
            <ul className={styles["link-list"]}>
              {section.title && (
                <li className={styles["title"]}>{section.title}</li>
              )}
              {section.links.map((link, i) => (
                <li key={`${link.displayText}-${i}`}>
                  <a href={link.href}>{link.displayText}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <div className={styles["title"]}>Newsletter Sign Up</div>
          <div>Sign up for exclusive updates & new arrivals</div>
          <form className={styles["subscribe-form"]}>
            <label htmlFor="email" style={{ display: "none" }}>
              Email
            </label>
            <input type="email" name="email" id="email" />
            <button>Submit</button>
          </form>
          <div className={styles["icon-links-row"]}>
            {iconLinks.map((link, i) => (
              <a
                key={`${link.href}-${i}`}
                href={link.href}
                className={styles["icon-link"]}
                style={{
                  backgroundImage: `url(${link.imageUrl})`,
                }}
              >
                <span style={{ display: "none" }}>
                  {link.name || "Social Link"}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className={styles["bottom-row"]}>
        <Link href={""}>Privacy Policy</Link>
        <Link href={""}>Terms & Conditions</Link>
        <div>&copy;{currentYear} Dignity Apparel. All Rights Reserved </div>
      </div>
    </footer>
  );
}
