import { SocialMediaLink } from "@/components/global/SocialMediaLink/SocialMediaLink";
import { WithTilingBackground } from "@/types/schema/misc";
import { bgImage } from "@/utility/misc";
import styles from "@/styles/sections/SocialLinks.module.css";

type Props = {
  id?: string | null;
  contentColor: "normal" | "white";
  linkUrls: string[];
} & WithTilingBackground;
export function SocialLinks({
  id,
  contentColor,
  linkUrls,
  tilingBackground,
  ...rest
}: Props) {
  return (
    <section
      id={id ? id : undefined}
      style={{ ...bgImage(tilingBackground?.src) }}
      {...rest}
    >
      <div
        className={`${styles["main"]} ${contentColor === "white" ? styles["white"] : ""} x-wide-container`}
      >
        <h2>Follow Us</h2>
        <div className={styles["links-container"]}>
          {linkUrls.map((url) => (
            <SocialMediaLink key={url} href={url} size={30} />
          ))}
        </div>
      </div>
    </section>
  );
}
