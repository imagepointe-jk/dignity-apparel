import styles from "@/styles/NavBar/TopBanner.module.css";

type Props = {
  text: string;
  hidden: boolean;
  bgColorHexCode: string;
  textColorHexCode: string;
};
export function TopBanner({
  text,
  hidden,
  bgColorHexCode,
  textColorHexCode,
}: Props) {
  return (
    <div
      className={styles["main"]}
      style={{
        display: hidden ? "none" : undefined,
        backgroundColor: `#${bgColorHexCode}`,
        color: `#${textColorHexCode}`,
      }}
    >
      {text}
    </div>
  );
}
