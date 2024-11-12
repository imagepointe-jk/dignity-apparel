import styles from "@/styles/QuickSearch/QuickSearch.module.css";
import { SearchResult } from "./SearchResult";
import debounce from "lodash.debounce";
import { useCallback, useState } from "react";
import { searchProducts } from "@/fetch/client/products";
import { validateWooCommerceProductsResponse } from "@/types/validation/woocommerce/woocommerce";
import { Product } from "@/types/schema/woocommerce";

export function QuickSearch() {
  // const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); //whether the user has made any searches yet
  const [status, setStatus] = useState("idle" as "idle" | "loading" | "error");
  const [results, setResults] = useState([] as Product[]);
  const debouncedOnSearchInput = useCallback(
    debounce(async (search: string) => {
      doSearch(search);
    }, 700),
    []
  );

  async function doSearch(search: string) {
    try {
      const response = await searchProducts(search);
      const json = await response.json();
      const parsed = validateWooCommerceProductsResponse(json);
      setResults(parsed);
      setStatus("idle");
    } catch (error) {
      setResults([]);
      setStatus("error");
      console.error(error);
    }
  }

  return (
    <>
      <h2>Search</h2>
      <label htmlFor="search" style={{ display: "none" }}>
        Search
      </label>
      <input
        type="text"
        className={styles["search-field"]}
        name="search"
        id="search"
        placeholder="Search..."
        onChange={(e) => {
          setHasSearched(true);
          setStatus("loading");
          debouncedOnSearchInput(e.target.value);
        }}
      />
      <div className={styles["results-container"]}>
        {!hasSearched && <>Search our catalog.</>}
        {hasSearched && (
          <>
            {status === "idle" &&
              results.map((result, i) => (
                <SearchResult key={i} name={result.name} />
              ))}
            {status === "idle" && results?.length === 0 && <>No results.</>}
            {status === "error" && <>Something went wrong.</>}
            {status === "loading" && <div>Loading...</div>}
          </>
        )}
      </div>
    </>
  );
}
