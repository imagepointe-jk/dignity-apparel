import styles from "@/styles/NavBar/TopBanner.module.css";
import { ReactNode } from "react";
import { LinkAsButton } from "../global/LinkAsButton/LinkAsButton";
import { BRAND_COLOR, BRAND_COLOR_HOVER } from "@/constants";

type Props = {
  bodyNode: ReactNode;
  link?: {
    href: string;
    label: string;
  };
  hidden: boolean;
  bgColorHexCode: string;
  textColorHexCode: string;
};
export function TopBanner({
  bodyNode,
  link,
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
      {bodyNode}
      {link && (
        <LinkAsButton
          data={{
            href: link.href,
            label: link.label,
            states: {
              hover: {
                primaryColor: BRAND_COLOR_HOVER,
                secondaryColor: "#ffffff",
              },
              normal: {
                primaryColor: BRAND_COLOR,
                secondaryColor: "#ffffff",
              },
            },
          }}
          className={styles["link"]}
        />
      )}
    </div>
  );
}
