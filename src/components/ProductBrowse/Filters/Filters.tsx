import styles from "@/styles/ProductBrowse/Filters.module.css";
import { Attribute, Category } from "@/types/schema/woocommerce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ExpandableDiv } from "../../global/ExpandableDiv/ExpandableDiv";
import { FilterGroup } from "./FilterGroup";
import { searchParamsArray } from "@/utility/url";
import { XMark2 } from "@/components/icons/XMark2";

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
  const searchParamsArr = searchParamsArray(searchParams.toString());

  //for each of the search params (some of which have multiple values), cross-reference with the filterGroups to build "clear button" data
  const clearFilterButtons = searchParamsArr
    .map((param) => {
      const nameToMatch = param.key === "feature" ? "features" : param.key;
      const matchingFilterGroup = filterGroups.find(
        (group) => group.name === nameToMatch
      );
      return param.value.map((value) => {
        const matchingSubItem = matchingFilterGroup?.subItems.find(
          (sub) => sub.slug === value
        );
        return {
          pairToClear: { key: param.key, value },
          label: matchingSubItem?.name || "UNKNOWN",
          id: `${matchingFilterGroup?.name}-${matchingSubItem?.id}`,
        };
      });
    })
    .flat();

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

  function clearParam(pair: { key: string; value: string }) {
    const rawPairs = Array.from(new URLSearchParams(searchParams).entries());
    const withoutPair = rawPairs.filter(
      (raw) => !(raw[0] === pair.key && raw[1] === pair.value)
    );
    const newParams = new URLSearchParams();
    for (const filteredPair of withoutPair) {
      newParams.append(filteredPair[0], filteredPair[1]);
    }
    router.push(`${pathname}?${newParams}`);
  }

  return (
    <div className={styles["main"]}>
      {searchParams.size > 0 && (
        <>
          <button onClick={clearFilters} className={styles["clear-filters"]}>
            Clear All Filters
          </button>
          <div className={styles["clear-filter-buttons-container"]}>
            {clearFilterButtons.map((item) => (
              <button
                key={item.id}
                className={styles["clear-filter-button"]}
                onClick={() => clearParam(item.pairToClear)}
              >
                <XMark2 size={10} />
                {item.label}
              </button>
            ))}
          </div>
        </>
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
