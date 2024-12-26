"use client";

import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import styles from "@/styles/global/ExpandableDiv.module.css";

type Props = {
  label?: ReactNode;
  content: ReactNode;
  mainClassName?: string;
  mainExpandedClassName?: string;
  labelClassName?: string;
  labelExpandedClassName?: string;
  labelStyle?: CSSProperties;
  contentClassName?: string;
  contentStyle?: CSSProperties;
  startExpanded?: boolean;
  expanded?: boolean;
  onClick?: () => void;
};
export function ExpandableDiv({
  label,
  content,
  mainClassName,
  mainExpandedClassName,
  labelClassName,
  labelStyle,
  labelExpandedClassName,
  contentClassName,
  contentStyle,
  startExpanded,
  expanded: expandedOverride,
  onClick: onClickOverride,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const expandedStateToUse =
    expandedOverride !== undefined ? expandedOverride : expanded;
  const contentRef = useRef(null as HTMLDivElement | null);

  function onClick() {
    if (!contentRef.current) return;

    setExpanded(!expandedStateToUse);
  }

  useEffect(() => {
    //if we should start expanded, simulate a click on mount
    if (startExpanded) onClick();
  }, []);

  useEffect(() => {
    if (!contentRef.current) return;

    //we can't directly access all the focusable children because content is dynamic
    //loop through and set aria-hidden based on focus state
    const focusableElements = Array.from(
      contentRef.current.querySelectorAll(
        'div, a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      )
    );
    for (const el of focusableElements) {
      if (expandedStateToUse) {
        el.removeAttribute("aria-hidden");
        el.removeAttribute("tabindex");
      } else {
        el.setAttribute("aria-hidden", "true");
        el.setAttribute("tabindex", "-1");
      }
    }
  }, [expandedStateToUse]);

  return (
    <div
      className={`${styles["main"]} ${mainClassName || ""} ${expandedStateToUse ? styles["expanded"] : ""} ${expandedStateToUse && mainExpandedClassName ? mainExpandedClassName : ""}`}
    >
      <button
        onClick={onClickOverride ? onClickOverride : onClick}
        className={`${styles["label"]} ${labelClassName || ""} ${expandedStateToUse && labelExpandedClassName ? labelExpandedClassName : ""}`}
        style={labelStyle}
        aria-expanded={expandedStateToUse}
      >
        {label}
      </button>
      <div
        ref={contentRef}
        className={`${styles["content"]} ${contentClassName || ""}`}
        style={{
          overflow: "hidden",
          ...contentStyle,
        }}
      >
        {content}
      </div>
    </div>
  );
}
