import { StoryBrowse } from "@/components/StoryBrowse/StoryBrowse";
import { IMAGE_NOT_FOUND_URL } from "@/constants";
import { getStaffStories } from "@/fetch/prismic/prismic";
import { Metadata } from "next";

export default async function Page() {
  const stories = await getStaffStories();
  const storiesConverted = stories.map((item) => ({
    uid: item.uid,
    firstName: item.data.first_name || "",
    cardImage: {
      src: item.data.image.url || IMAGE_NOT_FOUND_URL,
      alt: item.data.image.alt || "image",
    },
    jobDescriptionShort: item.data.job_description_short || "",
  }));

  return <StoryBrowse stories={storiesConverted} />;
}

export function generateMetadata(): Metadata {
  return {
    title: "Dignified, Life-Changing Stories - Dignity Apparel",
  };
}
