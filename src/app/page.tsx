import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { Hero } from "@/components/Hero/Hero";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("home_page");

  return (
    <main>
      <Hero
        alignment={"center"}
        heading="100% USA-Made Apparel Without Exception"
        subtext="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus iure asperiores labore aut officia dignissimos ipsam distinctio cumque perspiciatis unde provident quis accusamus amet, quisquam eaque fuga, dolore laboriosam veritatis!"
        buttonPrimary={{
          href: "",
          label: "View Our Products",
          mainColor: "orange",
          secondaryColor: "white",
        }}
        buttonSecondary={{
          href: "",
          label: "Quote Request",
          mainColor: "orange",
        }}
        bgImageUrl="https://cdn.britannica.com/79/232779-050-6B0411D7/German-Shepherd-dog-Alsatian.jpg"
      />
    </main>
  );

  // return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("home_page");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}
