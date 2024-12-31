import styles from "@/styles/Contact/Contact.module.css";
import Link from "next/link";
import { ReactNode } from "react";
import { SocialMediaLink } from "../global/SocialMediaLink/SocialMediaLink";
import { Envelope } from "../icons/Envelope";
import { People } from "../icons/People";
import { Phone } from "../icons/Phone";

type Props = {
  emailAddress: string;
  phoneInformation: ReactNode;
  contactFormHeading: ReactNode;
  socialLinkUrls: string[];
};
export function Contact({
  emailAddress,
  phoneInformation,
  contactFormHeading,
  socialLinkUrls,
}: Props) {
  return (
    <div className={styles["main"]}>
      <h1>Contact Us</h1>
      <div
        className={`${styles["content-container"]} ${styles["contact-info-flex"]}`}
      >
        <div className={styles["contact-info-container"]}>
          <div>
            <h4 className={`${styles["contact-heading"]} h4-semi-bold`}>
              <Phone size={24} className={styles["contact-icon"]} />
              Phone
            </h4>
            {phoneInformation}
          </div>
          <div>
            <h4 className={`${styles["contact-heading"]} h4-semi-bold`}>
              <Envelope size={18} className={styles["contact-icon"]} /> Email
            </h4>
            <div className={styles["contact-paragraph"]}>
              <Link href={`mailto:${emailAddress}`}>{emailAddress}</Link>
            </div>
          </div>
          <div>
            <h4 className={`${styles["contact-heading"]} h4-semi-bold`}>
              <People size={18} className={styles["contact-icon"]} /> Follow Us
            </h4>
            <div className={styles["social-links-container"]}>
              {socialLinkUrls.map((url, i) => (
                <SocialMediaLink key={i} href={url} size={24} />
              ))}
            </div>
          </div>
        </div>
        <div className={styles["contact-form-container"]}>
          {contactFormHeading}
          <div>
            <p>Contact form placeholder</p>
            <p>Contact form placeholder</p>
            <p>Contact form placeholder</p>
            <p>Contact form placeholder</p>
            <p>Contact form placeholder</p>
            <p>Contact form placeholder</p>
            <button type="submit">Submit</button>
          </div>
          <div className="body-2">
            We&apos;ll respond within 24-48 business hours.{" "}
          </div>
        </div>
      </div>
      <h2>Locations</h2>
      <div className={styles["locations-container"]}>
        <div className={`${styles["locations-heading"]} subheader-1-regular`}>
          Born, Built, and Sewn in the USA. We&apos;re proud to produce 100%
          USA-made apparel.
        </div>
        <div className={styles["maps-flex"]}>
          <div className={styles["map-container"]}></div>
          <div className={styles["map-container"]}></div>
        </div>
      </div>
    </div>
  );
}
