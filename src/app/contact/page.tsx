import { PrismicRichText } from "@prismicio/react";
import { Metadata } from "next";

import { SocialMediaLink } from "@/components/global/SocialMediaLink/SocialMediaLink";
import { Envelope } from "@/components/icons/Envelope";
import { People } from "@/components/icons/People";
import { Phone } from "@/components/icons/Phone";
import { createClient } from "@/prismicio";
import styles from "@/styles/Contact/Contact.module.css";
import { getPrismicLinkUrl } from "@/utility/prismic";
import Link from "next/link";

export default async function Page() {
  const client = createClient();
  const {
    data: {
      contact_form_heading,
      email_address,
      phone_information,
      social_links,
    },
  } = await client.getSingle("contact_page");

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
            {phone_information.map((item, i) => (
              <div key={i} className={styles["contact-paragraph"]}>
                <PrismicRichText field={item.paragraph} />
              </div>
            ))}
            {/* <PrismicRichText field={phone_information} /> */}
          </div>
          <div>
            <h4 className={`${styles["contact-heading"]} h4-semi-bold`}>
              <Envelope size={18} className={styles["contact-icon"]} /> Email
            </h4>
            <div className={styles["contact-paragraph"]}>
              <Link href={`mailto:${email_address}`}>{email_address}</Link>
            </div>
          </div>
          <div>
            <h4 className={`${styles["contact-heading"]} h4-semi-bold`}>
              <People size={18} className={styles["contact-icon"]} /> Follow Us
            </h4>
            <div className={styles["social-links-container"]}>
              {social_links.map((link, i) => (
                <SocialMediaLink
                  key={i}
                  href={getPrismicLinkUrl(link.link)}
                  size={24}
                />
              ))}
            </div>
          </div>
        </div>
        <div className={styles["contact-form-container"]}>
          <PrismicRichText field={contact_form_heading} />
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

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Contact - Dignity Apparel",
  };
}
