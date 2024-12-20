"use client";

import styles from "@/styles/global/LinkAsButton.module.css";
import Link from "next/link";
import { useState } from "react";

export type LinkAsButtonData = {
  href: string;
  label: string;
  extraPadding?: boolean;
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
type Props = {
  data: LinkAsButtonData;
};
export function LinkAsButton({
  data: { href, label, extraPadding, states, type },
}: Props) {
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
      return `2px solid ${color}`;
    } else {
      return "";
    }
  }

  return (
    <Link
      href={href}
      className={`${styles["main"]} ${extraPadding ? styles["extra-padding"] : ""}`}
      style={{
        color: `${chooseTextColor()}`,
        backgroundColor: `${chooseBackgroundColor()}`,
        border: chooseBorderStyle(),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </Link>
  );
}
