import styles from "@/styles/StoryBrowse/StoryCard.module.css";
import { StoryData } from "@/types/schema/prismic";
import Link from "next/link";
import { FlexibleImage } from "../global/FlexibleImage/FlexibleImage";

type Props = {
  story: StoryData;
};
export function StoryCard({ story }: Props) {
  return (
    <Link
      key={story.uid}
      href={`/dignified-life-changing-stories/${story.uid}`}
      className={styles["card"]}
    >
      <FlexibleImage
        src={story.cardImage.src}
        alt={story.firstName}
        imageClassName={styles["card-img"]}
        containerClassName={styles["card-img-container"]}
        behavior="cover"
      >
        <div className={styles["image-overlay"]}>
          <div className={styles["image-hover-text"]}>View Story</div>
        </div>
      </FlexibleImage>
      <div className={styles["card-content-container"]}>
        <div className={`${styles["staff-name"]} metropolis-32`}>
          {story.firstName}
        </div>
        <div className={`${styles["job-description"]} merriweather-19`}>
          {story.jobDescriptionShort}
        </div>
      </div>
      <div className={styles["hover-line"]}></div>
    </Link>
  );
}
