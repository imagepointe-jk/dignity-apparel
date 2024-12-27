import { env } from "@/envClient";
import styles from "@/styles/StoryBrowse/StoryBrowse.module.css";
import { CoveredImage } from "../global/CoveredImage/CoveredImage";

type Props = {
  stories: {
    uid: string;
    cardImage: {
      src: string;
      alt: string;
    };
    firstName: string;
    jobDescriptionShort: string;
  }[];
};
export function StoryBrowse({ stories }: Props) {
  return (
    <section className={styles["section"]}>
      <div className={styles["main"]}>
        <div className={styles["heading-container"]}>
          <h1>Dignified, Life-Changing Stories</h1>
          <div className="subheader-4">
            Select a story below to read more about the hardworking Americans
            who make Dignity Apparel garments.
          </div>
        </div>
        <div className={styles["cards-flex"]}>
          {stories.map((story) => (
            <a
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
                  <div className={styles["image-hover-text"]}>
                    WHY DIGNITY APPAREL
                  </div>
                </div>
              </CoveredImage>
              <div className={styles["card-content-container"]}>
                <div className={`${styles["staff-name"]} subheader-1-medium`}>
                  {story.firstName}
                </div>
                <div className={`${styles["job-description"]} body-2`}>
                  {story.jobDescriptionShort}
                </div>
              </div>
              <div className={styles["hover-line"]}></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
