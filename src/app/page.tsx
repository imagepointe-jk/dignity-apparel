import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { StandardSection1 } from "@/components/StandardSection1/StandardSection1";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("home_page");

  return (
    <main>
      <StandardSection1
        heading="Lorem Ipsum"
        bodyTextNode={
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet iusto
            saepe vero facere dolor? Culpa non possimus in voluptatum laboriosam
            voluptate. Officia quo fugit debitis iure hic, ad omnis cumque?
          </div>
        }
        imgSrc="https://images.squarespace-cdn.com/content/v1/54822a56e4b0b30bd821480c/4e17ec01-850d-4fda-a446-e68ff71854ba/German+Shepherds+dans+pet+care.jpeg"
        imgAlt="alt"
        buttonPrimary={{
          href: "",
          label: "View Products",
          mainColor: "orange",
          secondaryColor: "white",
        }}
        buttonSecondary={{
          href: "",
          label: "View Products",
          mainColor: "blue",
        }}
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
