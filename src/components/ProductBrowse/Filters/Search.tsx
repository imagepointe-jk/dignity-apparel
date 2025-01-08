import debounce from "lodash.debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import styles from "@/styles/ProductBrowse/Filters.module.css";

export function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const debouncedOnSearchInput = useCallback(
    debounce(async (search: string) => {
      const newSearchParams = new URLSearchParams(searchParams);
      if (!search) newSearchParams.delete("search");
      else newSearchParams.set("search", search);

      router.push(`${pathname}?${newSearchParams}`);
    }, 700),
    []
  );

  return (
    <input
      type="search"
      name="main-search"
      id="main-search"
      placeholder="Search for a product"
      className={styles["search"]}
      onChange={(e) => debouncedOnSearchInput(e.target.value)}
    />
  );
}
