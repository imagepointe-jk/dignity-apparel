import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { inspect } from "util";
import { getSettingsWithMegaMenu } from "@/fetch/prismic/prismic";
import { CardsSection1 } from "@/components/sections/CardsSection1/CardsSection1";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("home_page");
  await getSettingsWithMegaMenu();

  return (
    <main>
      <CardsSection1
        cards={[
          {
            image: {
              src: "//img1.wsimg.com/isteam/ip/666f7853-a571-4432-8fde-c4cc7fb8af77/20240530_DA_Lookbook_Mockup.jpg/:/cr=t:8.7%25,l:0%25,w:100%25,h:71.43%25/rs=w:600,h:300,cg:true",
              alt: "",
            },
            heading: "View Our Exclusive Catalog",
            button: {
              label: "View Online Catalog",
              href: "",
              bgColor: "orange",
              textColor: "white",
            },
            bodyNode: (
              <>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
                architecto vero maxime, excepturi ipsam blanditiis expedita
                placeat minus error et labore, neque saepe, dolor quo
                dignissimos. Sed sint velit eligendi.
              </>
            ),
          },
          {
            image: {
              src: "//img1.wsimg.com/isteam/ip/666f7853-a571-4432-8fde-c4cc7fb8af77/20240530_DA_Lookbook_Mockup.jpg/:/cr=t:8.7%25,l:0%25,w:100%25,h:71.43%25/rs=w:600,h:300,cg:true",
              alt: "",
            },
            heading: "Stories",
            button: {
              label: "View Online Catalog",
              href: "",
              bgColor: "orange",
              textColor: "white",
            },
            bodyNode: (
              <>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
                architecto vero maxime, excepturi ipsam blanditiis expedita
                placeat minus error et labore, neque saepe, dolor quo
                dignissimos. Sed sint velit eligendi. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Dignissimos quo quia numquam nobis
                corporis maiores, minima quisquam odio quas eos ducimus?
                Praesentium, illo? Vero ab accusamus dolorem, doloremque veniam
                suscipit.
              </>
            ),
          },
        ]}
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
