import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { VideoSection } from "@/components/VideoSection/VideoSection";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("home_page");

  return (
    <main>
      <VideoSection
        heading="Creating Dignitfied, Life-Changing Jobs"
        src={"https://www.youtube.com/embed/XDqEvmxnLeY?si=FKDa-ETr4O_WMyZ0"}
        bgColor="black"
        textColor="white"
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
