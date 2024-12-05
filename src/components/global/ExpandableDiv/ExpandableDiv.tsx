import { ReactNode, useEffect, useRef, useState } from "react";
import styles from "@/styles/global/ExpandableDiv.module.css";

type Props = {
  label?: string;
  content: ReactNode;
  mainClassName?: string;
  labelClassName?: string;
  contentClassName?: string;
  startExpanded?: boolean;
};
export function ExpandableDiv({
  label,
  content,
  mainClassName,
  labelClassName,
  contentClassName,
  startExpanded,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef(null as HTMLDivElement | null);

  function onClick() {
    if (!contentRef.current) return;

    setExpanded(!expanded);
  }

  function getScrollHeight() {
    if (!contentRef.current) return 0;

    return contentRef.current.scrollHeight;
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
      if (expanded) {
        el.removeAttribute("aria-hidden");
        el.removeAttribute("tabindex");
      } else {
        el.setAttribute("aria-hidden", "true");
        el.setAttribute("tabindex", "-1");
      }
    }
  }, [expanded]);

  return (
    <div
      className={`${styles["main"]} ${mainClassName || ""} ${expanded ? styles["expanded"] : ""}`}
    >
      <button
        onClick={onClick}
        className={`${styles["label"]} ${labelClassName || ""}`}
        aria-expanded={expanded}
      >
        {label || "Details"}
      </button>
      <div
        ref={contentRef}
        className={`${styles["content"]} ${contentClassName || ""}`}
        style={{
          height: expanded ? `${getScrollHeight()}px` : "0px",
          overflow: "hidden",
        }}
      >
        {content}
      </div>
    </div>
  );
}
