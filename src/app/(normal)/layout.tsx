import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./sendpulse.css";
import { createClient, repositoryName } from "@/prismicio";
import { NavBarPrismic } from "@/components/NavBar/NavBarPrismic";
import FooterPrismic from "@/components/Footer/FooterPrismic";
import { PrismicPreview } from "@prismicio/next";
import { getAnnouncementBanner } from "@/fetch/prismic/prismic";
import { validateAnnouncementBannerResponse } from "@/types/validation/prismic/validation";

const metropolisRegular = localFont({
  src: "../fonts/Metropolis-Regular.woff",
  variable: "--font-metropolis-regular",
});
const metropolisMedium = localFont({
  src: "../fonts/Metropolis-Medium.woff",
  variable: "--font-metropolis-medium",
});
const metropolisMediumItalic = localFont({
  src: "../fonts/Metropolis-MediumItalic.woff",
  variable: "--font-metropolis-medium-italic",
});
const metropolisExtraBold = localFont({
  src: "../fonts/Metropolis-ExtraBold.woff",
  variable: "--font-metropolis-extra-bold",
});
const metropolisBold = localFont({
  src: "../fonts/Metropolis-Bold.woff",
  variable: "--font-metropolis-bold",
});
const metropolisExtraBoldItalic = localFont({
  src: "../fonts/Metropolis-ExtraBold.woff",
  variable: "--font-metropolis-extra-bold-italic",
});
const metropolisBlack = localFont({
  src: "../fonts/Metropolis-Black.woff",
  variable: "--font-metropolis-black",
});
const merriweatherRegular = localFont({
  src: "../fonts/Merriweather-Regular.ttf",
  variable: "--font-merriweather-regular",
});
const merriweatherItalic = localFont({
  src: "../fonts/Merriweather-Italic.ttf",
  variable: "--font-merriweather-italic",
});

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();

  const page = await client.getSingle("settings");

  return {
    title: page.data.site_title || "Dignity Apparel",
    description: page.data.meta_description || "Dignity Apparel - Main Site",
    openGraph: {
      images: [page.data.og_image.url || ""],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontClassNames = [
    metropolisRegular.variable,
    metropolisExtraBold.variable,
    metropolisExtraBoldItalic.variable,
    merriweatherRegular.variable,
    merriweatherItalic.variable,
    metropolisBlack.variable,
    metropolisMedium.variable,
    metropolisMediumItalic.variable,
    metropolisBold.variable,
  ].join(" ");
  const announcementBannerResponse = await getAnnouncementBanner();
  const parsedAnnouncementBanner = validateAnnouncementBannerResponse(
    announcementBannerResponse
  );

  return (
    <html lang="en">
      <body
        className={`${fontClassNames} ${parsedAnnouncementBanner.showBanner ? "with-announcement-banner" : ""}`}
      >
        <a href="#main" className="skip-to-main">
          Skip to Main Content
        </a>
        <NavBarPrismic />
        <div id="main" tabIndex={-1}>
          {children}
        </div>
        <FooterPrismic />
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
