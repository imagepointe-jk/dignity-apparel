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
  mapboxStyleUrl1: string;
  mapboxStyleUrl2: string;
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
          <div className={styles["map-container"]}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2939.7122730478627!2d-92.3642335!3d42.5401664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87faacb9202b293f%3A0x17ae2a50a51156e6!2s2975%20Airline%20Cir%2C%20Waterloo%2C%20IA%2050703!5e0!3m2!1sen!2sus!4v1736265060900!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className={styles["map-container"]}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6419.405222671859!2d-83.59309610000001!3d36.4405731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x885c8001cc6ef707%3A0xcd04f5ca285565!2s403%20Old%20Knoxville%20Hwy%2C%20New%20Tazewell%2C%20TN%2037825!5e0!3m2!1sen!2sus!4v1736265273264!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
