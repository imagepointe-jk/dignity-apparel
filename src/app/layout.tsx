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
  variable: "--font-metropolis-semibold",
});
const metropolisExtraBold = localFont({
  src: "./fonts/Metropolis-ExtraBold.woff",
  variable: "--font-metropolis-extrabold",
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
  return (
    <html lang="en">
      <body
        className={`${metropolisRegular.variable} ${metropolisItalic.variable} ${metropolisSemiBold.variable} ${metropolisExtraBold.variable}`}
      >
        <NavBarPrismic />
        {children}
      </body>
    </html>
  );
}
