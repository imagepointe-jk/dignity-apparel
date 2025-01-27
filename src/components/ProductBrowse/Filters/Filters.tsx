import { XMark2 } from "@/components/icons/XMark2";
import styles from "@/styles/ProductBrowse/Filters.module.css";
import { Attribute, Category } from "@/types/schema/woocommerce";
import { searchParamsArray } from "@/utility/url";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { ExpandableDiv } from "../../global/ExpandableDiv/ExpandableDiv";
import { FilterGroup } from "./FilterGroup";
import { Search } from "./Search";
import { filterOrder, filtersToInclude } from "./filterSettings";

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
export type FilterProps = {
  categories: Category[];
  attributes: Attribute[];
  mode: "normal" | "modal";
};
export function Filters({ categories, attributes, mode }: FilterProps) {
  return (
    <Suspense>
      <FiltersWrapped
        categories={categories}
        attributes={attributes}
        mode={mode}
      />
    </Suspense>
  );
}
export function FiltersWrapped({ categories, attributes, mode }: FilterProps) {
  const windowSearchParams = useSearchParams();
  const [storedSearchParams, setStoredSearchParams] = useState(
    new URLSearchParams(windowSearchParams)
  );
  const searchParamsToUse =
    mode === "normal" ? windowSearchParams : storedSearchParams;
  const pathname = usePathname();
  const router = useRouter();
  const includeSearch = mode === "normal";
  const categoriesAsFilterGroup: FilterGroupType = {
    label: "Collections",
    name: "category",
    subItems: categories
      .filter((cat) => cat.slug !== "uncategorized")
      .map((cat) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
      })),
  };
  const filterGroups: FilterGroupType[] = [categoriesAsFilterGroup]
    .concat(
      attributes
        .filter(
          (item) => !["size", "color"].includes(item.attribute.attribute_name)
        )
        .map((attr) => attributeToFilterGroup(attr))
    )
    .filter(
      (item) =>
        !!filtersToInclude.find(
          (includeItem) => includeItem.name === item.name && includeItem.include
        )
    );
  filterGroups.sort((a, b) => {
    const aOrder = filterOrder.find((item) => item.name === a.name)?.order || 0;
    const bOrder = filterOrder.find((item) => item.name === b.name)?.order || 0;
    return aOrder - bOrder;
  });

  const searchParamsArr = searchParamsArray(searchParamsToUse.toString());

  //for each of the search params (some of which have multiple values), cross-reference with the filterGroups to build "clear button" data
  const clearFilterButtons = searchParamsArr
    .filter((param) => param.key !== "search")
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
    if (mode === "normal") router.push(pathname);
    else setStoredSearchParams(new URLSearchParams());
  }

  function clearParam(pair: { key: string; value: string }) {
    const rawPairs = Array.from(
      new URLSearchParams(searchParamsToUse).entries()
    );
    const withoutPair = rawPairs.filter(
      (raw) => !(raw[0] === pair.key && raw[1] === pair.value)
    );
    const newParams = new URLSearchParams();
    for (const filteredPair of withoutPair) {
      newParams.append(filteredPair[0], filteredPair[1]);
    }

    if (mode === "normal") router.push(`${pathname}?${newParams}`);
    else setStoredSearchParams(newParams);
  }

  function countFilterParams() {
    //counts the number of search params corresponding to actual filters (i.e. not "search")
    //"clear filters" button will appear when this returns more than 0
    const filteredParams = new URLSearchParams(searchParamsToUse);
    filteredParams.delete("search");
    return filteredParams.size;
  }

  function applyStoredFilters() {
    if (mode === "normal") return;
    router.push(`${pathname}?${storedSearchParams}`);
  }

  useEffect(() => {
    setStoredSearchParams(windowSearchParams);
  }, [windowSearchParams]);

  return (
    <div className={styles["main"]}>
      {includeSearch && <Search />}
      {mode === "modal" && (
        <button
          className={styles["save-and-close-modal"]}
          onClick={applyStoredFilters}
        >
          Select Filters And Close
        </button>
      )}
      {countFilterParams() > 0 && (
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
                aria-label={`clear ${item.label} filter`}
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
          content={
            <FilterGroup
              group={group}
              mode={mode}
              storedSearchParams={storedSearchParams}
              setStoredSearchParams={setStoredSearchParams}
            />
          }
          label={group.label}
          mainClassName={styles["expandable-main"]}
          labelClassName={styles["expandable-label"]}
          contentClassName={styles["expandable-content"]}
        />
      ))}
    </div>
  );
}
