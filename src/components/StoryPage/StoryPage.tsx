// import { IMAGE_NOT_FOUND_URL } from "@/constants";
import styles from "@/styles/StoryPage/StoryPage.module.css";
import { ReactNode } from "react";
import { CoveredImage } from "../global/CoveredImage/CoveredImage";
import { QuotationMark } from "../icons/QuotationMark";
import { StoryData } from "@/types/schema/prismic";
import { StoryCard } from "../StoryBrowse/StoryCard";

type ImageData = {
  src: string;
  alt: string;
};
type Props = {
  additionalImages: ImageData[];
  firstName: string;
  highlightText?: string;
  image: ImageData;
  jobDescriptionShort: string;
  videoEmbedCode?: string;
  bodyText: ReactNode;
  additionalStories: StoryData[];
};
//? The additional images section has been temporarily removed.
export function StoryPage({
  // additionalImages,
  firstName,
  image,
  jobDescriptionShort,
  highlightText,
  videoEmbedCode,
  bodyText,
  additionalStories,
}: Props) {
  // const additionalImage1 = additionalImages[0];
  // const additionalImage2 = additionalImages[1];
  // const additionalImage3 = additionalImages[2];
  const adjustedCode = videoEmbedCode
    ? videoEmbedCode
        .replace(/width="[^"*]*"/g, 'width="100%"')
        .replace(/height="[^"]*"/g, "")
    : undefined;

  return (
    <>
      <section className={styles["section"]}>
        <div
          className={`${styles["main"]} ${adjustedCode ? styles["with-video"] : ""} x-wide-container`}
        >
          <div className={styles["main-flex"]}>
            {!adjustedCode && (
              <CoveredImage
                src={image.src}
                alt={firstName || "staff headshot"}
                containerClassName={`${styles["featured-img-container"]} ${styles["desktop-only"]}`}
              />
            )}
            <div className={styles["content-container"]}>
              <h1>{firstName}</h1>
              <div className={`${styles["job-description"]} metropolis-24`}>
                {jobDescriptionShort}
              </div>
              {adjustedCode && (
                <div
                  className={styles["video-container"]}
                  dangerouslySetInnerHTML={{ __html: adjustedCode }}
                ></div>
              )}
              {!adjustedCode && (
                <CoveredImage
                  src={image.src}
                  alt={firstName || "staff headshot"}
                  containerClassName={`${styles["featured-img-container"]} ${styles["tablet"]}`}
                />
              )}
              <div className={styles["body-text"]}>{bodyText}</div>
            </div>
          </div>

          {highlightText && (
            <div
              className={`${styles["highlight-text-container"]} metropolis-24`}
            >
              {highlightText}
              <QuotationMark
                size={80}
                className={`${styles["quote-mark"]} ${styles["quote-mark-left"]}`}
              />
              <QuotationMark
                size={80}
                className={`${styles["quote-mark"]} ${styles["quote-mark-right"]}`}
              />
            </div>
          )}
        </div>
      </section>
      <section className={styles["more-stories"]}>
        <h2>MORE STORIES</h2>
        <div className={styles["more-stories-flex"]}>
          {additionalStories.map((story) => (
            <StoryCard key={story.uid} story={story} />
          ))}
        </div>
      </section>
    </>
  );
}
