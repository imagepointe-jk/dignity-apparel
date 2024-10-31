"use client";
import { Arrow } from "@/components/icons/Arrow";
import styles from "@/styles/global/CardSlider.module.css";
import { clamp } from "@/utility/misc";
import throttle from "lodash.throttle";
import { ReactNode, useRef } from "react";

type HasId = {
  id: number | string;
};
type Props<T> = {
  dataset: T[];
  createCard: (data: T) => ReactNode;
};
export function CardSlider<T extends HasId>({ dataset, createCard }: Props<T>) {
  const mainRef = useRef(null as HTMLDivElement | null);
  const onClickArrowThrottled = throttle(
    (direction: "left" | "right") => {
      if (!mainRef.current) return;

      const mainBoundingRect = mainRef.current.getBoundingClientRect();
      const slidingContainer = mainRef.current.children[0] as HTMLElement;
      if (!slidingContainer) return;

      const newOffset = getNewOffset(
        direction,
        mainBoundingRect,
        slidingContainer
      );

      if (newOffset !== null) slidingContainer.style.left = `${newOffset}px`;
    },
    1200,
    {
      trailing: false,
    }
  );

  function getNewOffset(
    moveDirection: "left" | "right",
    mainBoundingRect: DOMRect,
    slidingContainer: HTMLElement
  ) {
    const firstCard = slidingContainer.children[0];
    if (!firstCard) return;

    //figure out which of the card containers are fully visible (have all their pixels within the parent container)
    const cardContainerFullVisibilities = Array.from(
      slidingContainer.children
    ).map((element) => {
      const boundingRect = element.getBoundingClientRect();

      return {
        element,
        fullyVisible:
          boundingRect.left >= mainBoundingRect.left &&
          boundingRect.right <= mainBoundingRect.right,
      };
    });

    //if moving left, we'll want the first not-fully-visible container in the opposite direction
    if (moveDirection === "left") cardContainerFullVisibilities.reverse();

    //check one at a time in the given direction until we find the first container that isn't fully visible
    const firstNotFullyVisibleContainer = cardContainerFullVisibilities.find(
      (cardVisibility, i, arr) => {
        const prevCardVisibility = arr[i - 1];
        return !cardVisibility.fullyVisible && prevCardVisibility?.fullyVisible;
      }
    );

    //if there are no more containers to be revealed in the given direction, refuse to scroll more
    if (!firstNotFullyVisibleContainer) return null;

    //calculate the + or - distance to move from current offset
    const distToMove =
      moveDirection === "left"
        ? mainBoundingRect.right -
          firstNotFullyVisibleContainer.element.getBoundingClientRect().right
        : mainBoundingRect.left -
          firstNotFullyVisibleContainer.element.getBoundingClientRect().left;

    //clamp to prevent scrolling past end of cards
    const cardWidth = firstCard.getBoundingClientRect().width;
    const minOffset = clamp(
      mainBoundingRect.width - cardWidth * slidingContainer.children.length,
      Number.MIN_SAFE_INTEGER,
      0
    );
    const curOffset = +slidingContainer.style.left.replace("px", "");
    const newOffset = clamp(curOffset + distToMove, minOffset, 0);

    return newOffset;
  }

  return (
    <div className={styles["main"]} ref={mainRef}>
      <div className={styles["sliding-container"]} style={{ left: "0" }}>
        {dataset.map((data) => (
          <div key={data.id} className={styles["card-container"]}>
            <div className={styles["card"]}>{createCard(data)}</div>
          </div>
        ))}
      </div>
      <div
        className={`${styles["arrow-button"]} ${styles["arrow-icon-left"]}`}
        onClick={() => onClickArrowThrottled("left")}
      >
        <Arrow size={20} />
      </div>
      <div
        className={`${styles["arrow-button"]} ${styles["arrow-icon-right"]}`}
        onClick={() => onClickArrowThrottled("right")}
      >
        <Arrow size={20} />
      </div>
    </div>
  );
}
