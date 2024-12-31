import styles from "@/styles/ProductBrowse/Filters.module.css";
import { FilterItem } from "./FilterItem";
import { FilterGroupType } from "./Filters";
import { Dispatch, SetStateAction } from "react";

type FilterContentProps = {
  group: FilterGroupType;
  mode: "normal" | "modal";
  storedSearchParams: URLSearchParams;
  setStoredSearchParams: Dispatch<SetStateAction<URLSearchParams>>;
};
export function FilterGroup({
  group,
  mode,
  storedSearchParams,
  setStoredSearchParams,
}: FilterContentProps) {
  const useRadioButton = ["availability", "fit", "category"].includes(
    group.name
  );

  return (
    <ul className={styles["expandable-content-list"]}>
      {group.subItems.map((subItem) => (
        <FilterItem
          key={subItem.id}
          parentName={group.name}
          item={subItem}
          type={useRadioButton ? "radio" : "checkbox"}
          mode={mode}
          storedSearchParams={storedSearchParams}
          setStoredSearchParams={setStoredSearchParams}
        />
      ))}
    </ul>
  );
}
