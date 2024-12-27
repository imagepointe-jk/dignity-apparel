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
        <h2 className={styles["heading-404"]}>404</h2>
        <div className={styles["info-container"]}>
          <div className="subheader-2">
            oops...looks like that doesn't exist
          </div>
          <div className="body-2">
            We couldn't find the content you're looking for on our website. Use
            the links below to navigate to another page.
          </div>
        </div>
        <div className={styles["link-sections-container"]}>
          {sections.map((section) => (
            <div key={section.title} className={styles["link-section"]}>
              <div className={styles["link-section-title"]}>
                {section.title}
              </div>
              {section.links.map((item) => (
                <Link href={item.href || ""}>{item.displayText}</Link>
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
