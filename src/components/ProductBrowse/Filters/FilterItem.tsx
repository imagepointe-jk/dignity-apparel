import styles from "@/styles/ProductBrowse/Filters.module.css";
import { ProductBrowseURLParams } from "@/types/schema/woocommerce";
import { validateBrowseSearchParams } from "@/utility/products";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FilterItemType } from "./Filters";

type FilterItemProps = {
  parentName: string;
  item: FilterItemType;
  type: "radio" | "checkbox";
};
export function FilterItem({ parentName, item, type }: FilterItemProps) {
  const inputId = `${parentName}-${item.slug}`;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const validatedParams = validateBrowseSearchParams(searchParams);

  function isChecked() {
    const key = parentName as keyof ProductBrowseURLParams;
    const value = validatedParams[key];

    //if this filter item corresponds to a param that can have multiple values, check if it matches any of the values
    if (type === "checkbox") {
      if (!Array.isArray(value)) return false;
      return value.includes(item.slug);
    }

    //otherwise, check if it matches the singular value
    return value === item.slug;
  }

  function onClick() {
    const key = parentName as keyof ProductBrowseURLParams;
    const parentNameToUse = parentName === "features" ? "feature" : parentName;
    const value = validatedParams[key];
    const newParams = new URLSearchParams(searchParams);

    //if this filter item corresponds to a param that can have multiple values, handle adding/removing from the values
    if (type === "checkbox") {
      if (!Array.isArray(value)) return;

      //if the filter is on, toggle it off
      if (value.includes(item.slug)) {
        newParams.delete(parentNameToUse);
        const filtered = value.filter((paramValue) => paramValue !== item.slug);
        for (const item of filtered) {
          newParams.append(parentNameToUse, item);
        }
        //if it's off, toggle it on
      } else {
        newParams.append(parentNameToUse, item.slug);
      }
      //if this filter item corresponds to a param that can only have one value
    } else {
      if (value !== item.slug) {
        newParams.set(parentNameToUse, item.slug);
      } else {
        //an already-on radio button has been clicked, so ignore
        return;
      }
    }

    router.push(`${pathname}?${newParams.toString()}`);
  }

  return (
    <li>
      <label htmlFor={inputId} className={styles["input-container"]}>
        {type === "radio" && (
          <input
            type="radio"
            name={parentName}
            id={inputId}
            onChange={onClick}
            checked={isChecked()}
          />
        )}
        {type === "checkbox" && (
          <input
            type="checkbox"
            name={parentName}
            id={inputId}
            onChange={onClick}
            checked={isChecked()}
          />
        )}
        {item.name}
      </label>
    </li>
  );
}
