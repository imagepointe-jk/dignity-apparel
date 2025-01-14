import { StoryPage } from "@/components/StoryPage/StoryPage";
import { IMAGE_NOT_FOUND_URL } from "@/constants";
import { getStaffStories, getStaffStoryByUID } from "@/fetch/prismic/prismic";
import { PrismicRichText } from "@prismicio/react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: { uid: string } };
export default async function Page({ params: { uid } }: Props) {
  try {
    const story = await getStaffStoryByUID(uid);
    const {
      additional_images,
      first_name,
      highlight_text,
      image,
      job_description_short,
      story_text,
      video,
    } = story.data;
    const additionaImages = additional_images.map((item) => ({
      src: item.image.url || IMAGE_NOT_FOUND_URL,
      alt: item.image.alt || "image",
    }));

    const allStories = await getStaffStories();
    const convertedStories = allStories
      .map((item) => ({
        uid: item.uid,
        firstName: item.data.first_name || "",
        cardImage: {
          src: item.data.card_image.url || IMAGE_NOT_FOUND_URL,
          alt: item.data.card_image.alt || "image",
        },
        jobDescriptionShort: item.data.job_description_short || "",
      }))
      .filter((item) => item.uid !== uid)
      .slice(0, 3);

    return (
      <StoryPage
        additionalImages={additionaImages}
        firstName={first_name || ""}
        image={{
          src: image.url || IMAGE_NOT_FOUND_URL,
          alt: image.alt || "staff headshot",
        }}
        jobDescriptionShort={job_description_short || ""}
        highlightText={highlight_text || undefined}
        videoEmbedCode={video.html || undefined}
        bodyText={<PrismicRichText field={story_text} />}
        additionalStories={convertedStories}
      />
    );
  } catch (error) {
    console.error(error);
    return notFound();
  }
}

export async function generateMetadata({
  params: { uid },
}: Props): Promise<Metadata> {
  try {
    const story = await getStaffStoryByUID(uid);

    return {
      title: `${story.data.first_name} - Dignity Apparel`,
    };
  } catch (error) {
    console.error(error);
    return {
      title: "Story Not Found - Dignity Apparel",
    };
  }
}
