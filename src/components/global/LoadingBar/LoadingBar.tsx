"use client";
import styles from "@/styles/global/LoadingBar.module.css";

type Props = {
  progress: number; //between 0 and 1
  barBgClassName?: string;
  barClassName?: string;
};
export function LoadingBar({ progress, barBgClassName, barClassName }: Props) {
  return (
    <div className={`${styles["main"]} ${barBgClassName || ""}`}>
      <div
        className={`${styles["bar"]} ${barClassName || ""}`}
        style={{ right: `${100 - progress * 100}%` }}
      ></div>
    </div>
  );
}
