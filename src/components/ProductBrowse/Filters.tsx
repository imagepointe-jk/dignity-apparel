import { env } from "@/envClient";
import {
  Attribute,
  Category,
  ProductBrowseURLParams,
} from "@/types/schema/woocommerce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ExpandableDiv } from "../global/ExpandableDiv/ExpandableDiv";
import styles from "@/styles/ProductBrowse/Filters.module.css";
import { validateBrowseSearchParams } from "@/utility/products";

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
  const attributesToUse = attributes.filter(
    (item) => !["size", "color"].includes(item.attribute.attribute_name)
  );

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
      {attributesToUse.map((item) => (
        <ExpandableDiv
          key={item.attribute.attribute_id}
          content={<FilterContent attribute={item} />}
          label={item.attribute.attribute_label}
          mainClassName={styles["expandable-main"]}
          labelClassName={styles["expandable-label"]}
          contentClassName={styles["expandable-content"]}
          startExpanded={true}
        />
      ))}
    </div>
  );
}

type FilterContentProps = {
  attribute: Attribute;
};
function FilterContent({ attribute }: FilterContentProps) {
  const useRadioButton = ["availability", "fit"].includes(
    attribute.attribute.attribute_name
  );
  const attName = attribute.attribute.attribute_name;

  return (
    <ul className={styles["expandable-content-list"]}>
      {attribute.terms.map((term) => (
        <FilterItem
          key={term.term_id}
          attribute={attribute}
          term={term}
          type={useRadioButton ? "radio" : "checkbox"}
        />
      ))}
      {attName === "fit" && (
        <FilterItem
          attribute={attribute}
          term={{ name: "Unisex", slug: "unisex", term_id: -1 }}
          type={"radio"}
        />
      )}
    </ul>
  );
}

type FilterItemProps = {
  attribute: Attribute;
  term: {
    term_id: number;
    slug: string;
    name: string;
  };
  type: "radio" | "checkbox";
};
function FilterItem({ attribute, term, type }: FilterItemProps) {
  const attName = attribute.attribute.attribute_name;
  const inputId = `${attName}-${term.slug}`;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const validatedParams = validateBrowseSearchParams(searchParams);

  function isChecked() {
    const key = attName as keyof ProductBrowseURLParams;
    const value = validatedParams[key];

    //if this filter item corresponds to a param that can have multiple values, check if it matches any of the values
    if (type === "checkbox") {
      if (!Array.isArray(value)) return false;
      return value.includes(term.slug);
    }

    //otherwise, check if it matches the singular value
    return value === term.slug;
  }

  function onClick() {
    const key = attName as keyof ProductBrowseURLParams;
    const attNameToUse = attName === "features" ? "feature" : attName;
    const value = validatedParams[key];
    const newParams = new URLSearchParams(searchParams);

    //if this filter item corresponds to a param that can have multiple values, handle adding/removing from the values
    if (type === "checkbox") {
      if (!Array.isArray(value)) return;

      //if the filter is on, toggle it off
      if (value.includes(term.slug)) {
        newParams.delete(attNameToUse);
        const filtered = value.filter((item) => item !== term.slug);
        for (const item of filtered) {
          newParams.append(attNameToUse, item);
        }
        //if it's off, toggle it on
      } else {
        newParams.append(attNameToUse, term.slug);
      }
      //if this filter item corresponds to a param that can only have one value
    } else {
      if (value !== term.slug) {
        newParams.set(attNameToUse, term.slug);
      } else {
        //an already-on radio button has been clicked, so ignore
        return;
      }
    }

    router.push(`${pathname}?${newParams.toString()}`);
  }

  return (
    <li key={term.term_id}>
      <label htmlFor={inputId} className={styles["input-container"]}>
        {type === "radio" && (
          <input
            type="radio"
            name={attName}
            id={inputId}
            onChange={onClick}
            checked={isChecked()}
          />
        )}
        {type === "checkbox" && (
          <input
            type="checkbox"
            name={attName}
            id={inputId}
            onChange={onClick}
            checked={isChecked()}
          />
        )}
        {term.name}
      </label>
    </li>
  );
}
