import {
  LinkAsButton,
  LinkAsButtonProps,
} from "../global/LinkAsButton/LinkAsButton";
import styles from "@/styles/Hero/Hero.module.css";

type Props = {
  heading: string;
  subtext: string;
  buttonPrimary: LinkAsButtonProps;
  buttonSecondary?: Omit<LinkAsButtonProps, "secondaryColor">;
  bgImageUrl?: string;
  bgVideoUrl?: string;
  alignment: "left" | "right" | "center";
};
export function Hero({
  bgImageUrl,
  heading,
  subtext,
  buttonPrimary,
  buttonSecondary,
}: Props) {
  return (
    <section
      className={styles["main"]}
      style={{
        backgroundImage: bgImageUrl
          ? `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${bgImageUrl})`
          : undefined,
      }}
    >
      <div className={styles["content"]}>
        <h1>{heading}</h1>
        <p>{subtext}</p>
        <div className={styles["buttons-container"]}>
          {/* Temp values */}
          <LinkAsButton
            href={buttonPrimary.href}
            label={buttonPrimary.label}
            mainColor={buttonPrimary.mainColor}
            secondaryColor={buttonPrimary.secondaryColor}
            states={{
              hover: {
                primaryColor: "",
              },
              normal: {
                primaryColor: "",
              },
            }}
          />
          {buttonSecondary && (
            <LinkAsButton
              states={{
                hover: {
                  primaryColor: "",
                },
                normal: {
                  primaryColor: "",
                },
              }}
              href={buttonSecondary.href}
              label={buttonSecondary.label}
              mainColor={buttonSecondary.mainColor}
              variant={"minor button"}
            />
          )}
        </div>
      </div>
    </section>
  );
}
