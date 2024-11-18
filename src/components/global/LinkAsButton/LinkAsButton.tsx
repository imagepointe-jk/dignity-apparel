"use client";

import styles from "@/styles/global/LinkAsButton.module.css";
import Link from "next/link";
import { useState } from "react";

export type LinkAsButtonProps = {
  href: string;
  label: string;
  mainColor: string;
  secondaryColor?: string;
  variant?: "minor button";
  fullWidth?: boolean;
  type?: "filled" | "outlined";
  states: {
    normal: {
      primaryColor: string;
      secondaryColor?: string;
    };
    hover: {
      primaryColor: string;
      secondaryColor?: string;
    };
  };
};
export function LinkAsButton({
  href,
  label,
  mainColor,
  secondaryColor,
  variant,
  fullWidth,
  states,
  type,
}: LinkAsButtonProps) {
  const [hovered, setHovered] = useState(false);

  function chooseTextColor() {
    if (type === "outlined") {
      return hovered ? states.hover.primaryColor : states.normal.primaryColor;
    } else {
      return hovered
        ? states.hover.secondaryColor || states.hover.primaryColor
        : states.normal.secondaryColor || states.normal.primaryColor;
    }
  }

  function chooseBackgroundColor() {
    if (type === "outlined") {
      return "00000000";
    } else {
      return hovered ? states.hover.primaryColor : states.normal.primaryColor;
    }
  }

  function chooseBorderStyle() {
    if (type === "outlined") {
      const color = hovered
        ? states.hover.primaryColor
        : states.normal.primaryColor;
      return `2px solid #${color}`;
    } else {
      return "";
    }
  }

  return (
    // <a
    //   href={href}
    //   className={`${styles["main"]} ${variant === "minor button" ? styles["minor"] : ""}`}
    //   style={{
    //     backgroundColor:
    //       variant === "minor button" ? undefined : mainColor || BRAND_COLOR,
    //     outlineColor: variant === "minor button" ? mainColor : undefined,
    //     color:
    //       variant === "minor button" ? mainColor : secondaryColor || "white",
    //       width: fullWidth ? "100%" : undefined
    //   }}
    // >
    //   {label}
    // </a>
    <Link
      href={href}
      className={styles["main"]}
      style={{
        color: `#${chooseTextColor()}`,
        backgroundColor: `#${chooseBackgroundColor()}`,
        width: fullWidth ? "100%" : undefined,
        border: chooseBorderStyle(),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </Link>
  );
}
