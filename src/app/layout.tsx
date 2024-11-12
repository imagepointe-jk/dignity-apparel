import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { createClient } from "@/prismicio";
import { NavBarPrismic } from "@/components/NavBar/NavBarPrismic";

const metropolisRegular = localFont({
  src: "./fonts/Metropolis-Regular.woff",
  variable: "--font-metropolis-regular",
});
const metropolisItalic = localFont({
  src: "./fonts/Metropolis-RegularItalic.woff",
  variable: "--font-metropolis-italic",
});
const metropolisSemiBold = localFont({
  src: "./fonts/Metropolis-SemiBold.woff",
  variable: "--font-metropolis-semi-bold",
});
const metropolisExtraBold = localFont({
  src: "./fonts/Metropolis-ExtraBold.woff",
  variable: "--font-metropolis-extra-bold",
});
const metropolisExtraBoldItalic = localFont({
  src: "./fonts/Metropolis-ExtraBold.woff",
  variable: "--font-metropolis-extra-bold-italic",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontClassNames = [
    metropolisRegular.variable,
    metropolisItalic.variable,
    metropolisSemiBold.variable,
    metropolisExtraBold.variable,
    metropolisExtraBoldItalic.variable,
  ].join(" ");

  return (
    <html lang="en">
      <body className={fontClassNames}>
        <NavBarPrismic />
        {children}
      </body>
    </html>
  );
}
