import styles from "@/styles/sections/VideoSection.module.css";

type Props = {
  src: string;
  heading?: string;
  bgColor?: string;
  textColor?: string;
};
export function VideoSection({ src, heading, bgColor, textColor }: Props) {
  return (
    <section
      className={styles["main"]}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {heading && <h2>{heading}</h2>}
      <div className={styles["video-container"]}>
        <iframe
          src={src}
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
}
