import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { CardSlider } from "@/components/global/CardSlider/CardSlider";
import { ProductSlider } from "@/components/sections/ProductSlider/ProductSlider";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("home_page");

  return (
    <main>
      <ProductSlider
        products={[
          {
            id: 0,
            SKU: "AS123",
            colors: ["red", "green", "blue"],
            img: {
              src: "https://cdn.britannica.com/79/232779-050-6B0411D7/German-Shepherd-dog-Alsatian.jpg",
              alt: "",
            },
            name: "Some Product",
            url: "",
          },
          {
            id: 1,
            SKU: "AS123",
            colors: [
              "red",
              "green",
              "blue",
              "red",
              "green",
              "blue",
              "red",
              "green",
              "blue",
              "red",
              "green",
              "blue",
              "red",
              "green",
              "blue",
            ],
            img: {
              src: "https://cdn.guidedogs.com.au/wp-content/uploads/2024/07/GD-Homepage-Manton-Mobile.jpg",
              alt: "",
            },
            name: "Some Product",
            url: "",
          },
          {
            id: 2,
            SKU: "AS123",
            colors: ["red", "green", "blue"],
            img: {
              src: "https://cdn.britannica.com/79/232779-050-6B0411D7/German-Shepherd-dog-Alsatian.jpg",
              alt: "",
            },
            name: "Some Product",
            url: "",
          },
          {
            id: 3,
            SKU: "AS123",
            colors: ["red", "green", "blue"],
            img: {
              src: "https://cdn.britannica.com/79/232779-050-6B0411D7/German-Shepherd-dog-Alsatian.jpg",
              alt: "",
            },
            name: "Some Product",
            url: "",
          },
          {
            id: 4,
            SKU: "AS123",
            colors: ["red", "green", "blue"],
            img: {
              src: "https://cdn.britannica.com/79/232779-050-6B0411D7/German-Shepherd-dog-Alsatian.jpg",
              alt: "",
            },
            name: "Some Product",
            url: "",
          },
          {
            id: 5,
            SKU: "AS123",
            colors: ["red", "green", "blue"],
            img: {
              src: "https://cdn.britannica.com/79/232779-050-6B0411D7/German-Shepherd-dog-Alsatian.jpg",
              alt: "",
            },
            name: "Some Product",
            url: "",
          },
        ]}
        buttons={{
          mainColor: "orange",
          secondaryColor: "white",
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
