import { IMAGE_NOT_FOUND_URL } from "@/constants";
import styles from "@/styles/StoryPage/StoryPage.module.css";
import { ReactNode } from "react";
import { CoveredImage } from "../global/CoveredImage/CoveredImage";
import { QuotationMark } from "../icons/QuotationMark";

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
};
export function StoryPage({
  additionalImages,
  firstName,
  image,
  jobDescriptionShort,
  highlightText,
  videoEmbedCode,
  bodyText,
}: Props) {
  const additionalImage1 = additionalImages[0];
  const additionalImage2 = additionalImages[1];
  const additionalImage3 = additionalImages[2];
  const adjustedCode = videoEmbedCode
    ? videoEmbedCode
        .replace(/width="[^"*]*"/g, 'width="100%"')
        .replace(/height="[^"]*"/g, "")
    : undefined;

  return (
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
            <div
              className={`${styles["job-description"]} subheader-1-semi-bold`}
            >
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
            <div className={`${styles["body-text"]} body-2`}>{bodyText}</div>
          </div>
        </div>

        <div
          className={`${styles["highlight-text-container"]} subheader-1-semi-bold`}
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

        <div className={styles["additional-images-flex"]}>
          <div className={styles["additional-images-column"]}>
            <CoveredImage
              containerClassName={styles["additional-image-horz"]}
              src={additionalImage1?.src || IMAGE_NOT_FOUND_URL}
              alt={additionalImage1?.alt || "image"}
            />
            <CoveredImage
              containerClassName={styles["additional-image-horz"]}
              src={additionalImage2?.src || IMAGE_NOT_FOUND_URL}
              alt={additionalImage2?.alt || "image"}
            />
            <CoveredImage
              containerClassName={`${styles["additional-image-horz"]} ${styles["tablet"]}`}
              src={additionalImage3?.src || IMAGE_NOT_FOUND_URL}
              alt={additionalImage3?.alt || "image"}
            />
          </div>
          <CoveredImage
            containerClassName={`${styles["additional-image-vert"]} ${styles["desktop-only"]}`}
            src={additionalImage3?.src || IMAGE_NOT_FOUND_URL}
            alt={additionalImage3?.alt || "image"}
          />
        </div>
      </div>
    </section>
  );
}
