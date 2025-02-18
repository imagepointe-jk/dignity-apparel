import styles from "@/styles/NotFound/NotFound.module.css";
import { Footer } from "@/types/schema/footer";
import Link from "next/link";
import { SocialLinks } from "../sections/SocialLinks/SocialLinks";

//TODO: Implement a page/content search on this page so the user can try to find what they were looking for
type Props = {
  data: Footer;
};
export function NotFound({ data }: Props) {
  const { sections, iconLinks } = data;

  return (
    <section>
      <div className={styles["main"]}>
        <h1 className={styles["heading-404"]}>404</h1>
        <div className={styles["info-container"]}>
          <div className="merriweather-24">
            oops...looks like that doesn&apos;t exist
          </div>
          <div className="merriweather-16">
            We couldn&apos;t find the content you&apos;re looking for on our
            website. Use the links below to navigate to another page.
          </div>
        </div>
        <div className={styles["link-sections-container"]}>
          {sections.map((section) => (
            <div key={section.title} className={styles["link-section"]}>
              <div className={styles["link-section-title"]}>
                {section.title}
              </div>
              {section.links.map((item) => (
                <Link key={item.displayText} href={item.href || ""}>
                  {item.displayText}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <SocialLinks
          contentColor="normal"
          linkUrls={iconLinks.map((item) => item.href || "")}
        />
      </div>
    </section>
  );
}
