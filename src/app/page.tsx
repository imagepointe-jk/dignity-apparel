import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { AccordionContent } from "@/components/sections/AccordionContent/AccordionContent";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("home_page");

  return (
    <main>
      <AccordionContent
        heading="Lorem Ipsum"
        subtextNode={
          <>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda a
            tempora rem? Maiores nisi, esse minima sunt perferendis beatae
            aspernatur porro rem debitis fuga fugiat delectus dolore adipisci
            totam eveniet!
          </>
        }
        items={[
          {
            heading: "Assumenda a tempora rem",
            bodyNode: (
              <>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime
                laboriosam non, vero quo consectetur adipisci, fugiat deserunt
                earum porro rem sapiente libero distinctio, reprehenderit iure
                quas recusandae vel tenetur hic? Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Esse temporibus et ducimus
                architecto ullam sequi voluptatem laborum dolorem sed qui. Animi
                est eum aut molestias doloremque nesciunt, quasi modi dolorem!
              </>
            ),
            link: {
              href: "",
              label: "View More",
            },
          },
          {
            heading: "Aspernatur distinctio quae asperiores",
            bodyNode: (
              <>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur distinctio quae asperiores, blanditiis expedita ipsum
                pariatur numquam consequuntur nisi quis dolorum, totam ratione!
                Facere, quidem nesciunt alias hic odit vitae.
              </>
            ),
            link: {
              href: "",
              label: "View More",
            },
          },
          {
            heading: "Sequi magni odio numquam nemo",
            bodyNode: (
              <>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi
                magni odio numquam nemo doloremque laboriosam hic illo adipisci
                beatae ea minima consectetur recusandae mollitia molestias
                inventore ratione, nobis voluptatem. Perferendis.
              </>
            ),
            link: {
              href: "",
              label: "View More",
            },
          },
          {
            heading: "Maxime, culpa totam quia nostrum repudiandae",
            bodyNode: (
              <>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
                culpa totam quia nostrum repudiandae, dolorum aperiam
                perspiciatis dolorem id at, harum laboriosam ipsum quisquam vero
                odit ullam. Aut, non inventore.
              </>
            ),
            link: {
              href: "",
              label: "View More",
            },
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
