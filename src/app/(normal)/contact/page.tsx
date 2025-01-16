import { PrismicRichText } from "@prismicio/react";
import { Metadata } from "next";

import { Contact } from "@/components/Contact/Contact";
import { createClient } from "@/prismicio";
import styles from "@/styles/Contact/Contact.module.css";
import { getPrismicLinkUrl } from "@/utility/prismic";

export default async function Page() {
  const client = createClient();
  const {
    data: {
      contact_form_heading,
      email_address,
      phone_information,
      social_links,
      map_1_style_url,
      map_2_style_url,
      contact_form_code,
    },
  } = await client.getSingle("contact_page");

  return (
    <Contact
      contactFormHeading={<PrismicRichText field={contact_form_heading} />}
      emailAddress={email_address || "UNKNOWN"}
      phoneInformation={phone_information.map((item, i) => (
        <div key={i} className={styles["contact-paragraph"]}>
          <PrismicRichText field={item.paragraph} />
        </div>
      ))}
      socialLinkUrls={social_links.map((item) => getPrismicLinkUrl(item.link))}
      contactFormCode={contact_form_code || ""}
      mapboxStyleUrl1={map_1_style_url || ""}
      mapboxStyleUrl2={map_2_style_url || ""}
    />
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Contact - Dignity Apparel",
  };
}
