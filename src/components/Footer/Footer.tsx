import { FooterSection, Footer as FooterType } from "@/types/schema/footer";
import styles from "@/styles/Footer/Footer.module.css";
import Link from "next/link";
import { Flag } from "../icons/Flag";
import { env } from "@/envClient";
import { SocialMediaLink } from "../global/SocialMediaLink/SocialMediaLink";
import { SubscriptionForm } from "./SubscriptionForm";
import { IUPAT_DC81_L246_Bug } from "../icons/organizations/IUPAT_DC81_L246_Bug";
import { IUPAT_DC81_L247_Bug } from "../icons/organizations/IUPAT_DC81_L247_Bug";

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
        <h3 className={`${styles["footer-main-heading"]} h3-bold`}>
          MADE IN THE USA
        </h3>
      </div>
      <div className="x-wide-container">
        <div className={styles["main-row"]}>
          <div>
            <div className={styles["home-link-container"]}>
              <Link href={env.NEXT_PUBLIC_BASE_URL}>
                <img src={homeLinkImageUrl} alt="Dignity Apparel Home" />
              </Link>
              <div className={styles["mission-statement"]}>
                We exist to create dignified, life-changing jobs.
              </div>
            </div>
            <div className={`${styles["bugs-flex"]} ${styles["tablet"]}`}>
              <IUPAT_DC81_L246_Bug size={24} />
              <IUPAT_DC81_L247_Bug size={24} />
            </div>
          </div>
          <Sections sections={sections} className={styles["desktop"]} />
          <div className={styles["subscribe-connect-container"]}>
            <div className={styles["subscribe-description"]}>
              Sign up for updates & new arrivals
            </div>
            <SubscriptionForm />
            <div className={styles["icon-links-row"]}>
              {iconLinks.map((link, i) => (
                <SocialMediaLink key={i} href={link.href} />
              ))}
            </div>
            <div className={`${styles["bugs-flex"]} ${styles["desktop"]}`}>
              <IUPAT_DC81_L246_Bug size={24} />
              <IUPAT_DC81_L247_Bug size={24} />
            </div>
          </div>
        </div>
        <div className={styles["tablet-view-sections"]}>
          <Sections sections={sections} />
          <div className={`${styles["bugs-flex"]} ${styles["mobile"]}`}>
            <IUPAT_DC81_L246_Bug size={24} />
            <IUPAT_DC81_L247_Bug size={24} />
          </div>
        </div>
      </div>
      <div className={styles["bottom-row-container"]}>
        <div className="x-wide-container">
          <div className={styles["bottom-row"]}>
            <div className={styles["copyright"]}>
              &copy;{currentYear} Dignity Apparel. All Rights Reserved{" "}
            </div>
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

type SectionsProps = {
  sections: FooterSection[];
  className?: string;
};
function Sections({ sections, className }: SectionsProps) {
  return sections.map((section, i) => (
    <div key={`${section.title}-${i}`} className={styles["link-section"]}>
      <ul className={`${styles["link-list"]} ${className || ""}`}>
        {section.title && <li className={styles["title"]}>{section.title}</li>}
        {section.links.map((link, i) => (
          <li key={`${link.displayText}-${i}`}>
            <a href={link.href}>{link.displayText}</a>
          </li>
        ))}
      </ul>
    </div>
  ));
}
