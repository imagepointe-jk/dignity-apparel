import styles from "@/styles/ProductBrowse/Filters.module.css";
import { FilterItem } from "./FilterItem";
import { FilterGroupType } from "./Filters";

type FilterContentProps = {
  group: FilterGroupType;
};
export function FilterGroup({ group }: FilterContentProps) {
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
        />
      ))}
      {group.name === "fit" && (
        <FilterItem
          parentName={group.name}
          item={{ name: "Unisex", slug: "unisex", id: -1 }}
          type={"radio"}
        />
      )}
    </ul>
  );
}
