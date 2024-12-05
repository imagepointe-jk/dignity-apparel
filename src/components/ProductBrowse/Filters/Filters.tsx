import styles from "@/styles/ProductBrowse/Filters.module.css";
import { Attribute, Category } from "@/types/schema/woocommerce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ExpandableDiv } from "../../global/ExpandableDiv/ExpandableDiv";
import { FilterGroup } from "./FilterGroup";

export type FilterItemType = {
  id: number;
  name: string;
  slug: string;
};
export type FilterGroupType = {
  name: string;
  label: string;
  subItems: FilterItemType[];
};
type Props = {
  categories: Category[];
  attributes: Attribute[];
};
export function Filters({ categories, attributes }: Props) {
  return (
    <Suspense>
      <FiltersWrapped categories={categories} attributes={attributes} />
    </Suspense>
  );
}
export function FiltersWrapped({ categories, attributes }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const categoriesAsFilterGroup: FilterGroupType = {
    label: "Collections",
    name: "category",
    subItems: categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
    })),
  };
  const filterGroups: FilterGroupType[] = [categoriesAsFilterGroup].concat(
    attributes
      .filter(
        (item) => !["size", "color"].includes(item.attribute.attribute_name)
      )
      .map((attr) => attributeToFilterGroup(attr))
  );

  function attributeToFilterGroup(attribute: Attribute): FilterGroupType {
    return {
      label: attribute.attribute.attribute_label,
      name: attribute.attribute.attribute_name,
      subItems: attribute.terms.map((term) => ({
        id: term.term_id,
        name: term.name,
        slug: term.slug,
      })),
    };
  }

  function clearFilters() {
    router.push(pathname);
  }

  return (
    <div className={styles["main"]}>
      {searchParams.size > 0 && (
        <button onClick={clearFilters} className={styles["clear-filters"]}>
          Clear All Filters
        </button>
      )}
      {filterGroups.map((group) => (
        <ExpandableDiv
          key={group.name}
          content={<FilterGroup group={group} />}
          label={group.label}
          mainClassName={styles["expandable-main"]}
          labelClassName={styles["expandable-label"]}
          contentClassName={styles["expandable-content"]}
          startExpanded={true}
        />
      ))}
    </div>
  );
}
