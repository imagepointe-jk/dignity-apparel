import { env } from "@/envClient";
import styles from "@/styles/StoryBrowse/StoryCard.module.css";
import { CoveredImage } from "../global/CoveredImage/CoveredImage";
import { StoryData } from "@/types/schema/prismic";
import Link from "next/link";

type Props = {
  story: StoryData;
};
export function StoryCard({ story }: Props) {
  return (
    <Link
      key={story.uid}
      href={`${env.NEXT_PUBLIC_BASE_URL}/dignified-life-changing-stories/${story.uid}`}
      className={styles["card"]}
    >
      <CoveredImage
        src={story.cardImage.src}
        alt={story.firstName}
        className={styles["card-img"]}
        containerClassName={styles["card-img-container"]}
      >
        <div className={styles["image-overlay"]}>
          <div className={styles["image-hover-text"]}>WHY DIGNITY APPAREL</div>
        </div>
      </CoveredImage>
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
