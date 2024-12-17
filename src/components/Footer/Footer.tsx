import { Footer as FooterType } from "@/types/schema/footer";
import styles from "@/styles/Footer/Footer.module.css";
import Link from "next/link";
import { Flag } from "../icons/Flag";
import { env } from "@/envClient";
import { SocialMediaLink } from "../global/SocialMediaLink/SocialMediaLink";

type Props = {
  data: FooterType;
};
export function Footer({
  data: { iconLinks, sections, homeLinkImageUrl },
}: Props) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles["main"]}>
      <div className={styles["top-banner"]}>
        <Flag />
        <h3 className="h3-bold">MADE IN THE USA</h3>
      </div>
      <div className="x-wide-container">
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
          <div className={styles["subscribe-connect-container"]}>
            <div className={styles["subscribe-description"]}>
              Sign up for updates & new arrivals
            </div>
            <form className={styles["subscribe-form"]}>
              <label htmlFor="email" style={{ display: "none" }}>
                Email
              </label>
              <div className={styles["email-submit-container"]}>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email..."
                />
                <button>Submit</button>
              </div>
            </form>
            <div className={styles["icon-links-row"]}>
              {iconLinks.map((link, i) => (
                <SocialMediaLink key={i} href={link.href} />
              ))}
            </div>
            <div className={styles["home-link-container"]}>
              <Link href={env.NEXT_PUBLIC_BASE_URL}>
                <img src={homeLinkImageUrl} alt="Dignity Apparel" />
              </Link>
            </div>
            <p className={styles["mission-statement"]}>
              We exist to create dignified, life-changing jobs.
            </p>
          </div>
        </div>
      </div>
      <div className={styles["bottom-row-container"]}>
        <div className="x-wide-container">
          <div className={styles["bottom-row"]}>
            <div>&copy;{currentYear} Dignity Apparel. All Rights Reserved </div>
            <div className={styles["bottom-row-links"]}>
              <div>
                <Link href={""}>Privacy Policy</Link>
              </div>
              <div>
                <Link href={""}>Terms & Conditions</Link>
              </div>
              <div>
                <Link href={""}>Site Map</Link>
              </div>
              <div>
                <Link href={""}>Cookies Policy</Link>
              </div>
              <div>
                <Link href={""}>Accessibility Statement</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
