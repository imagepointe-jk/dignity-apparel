import styles from "@/styles/QuickSearch/QuickSearch.module.css";
import { SearchResultVariableProduct } from "./SearchResultVariableProduct";
import debounce from "lodash.debounce";
import { useCallback, useState } from "react";
import { queryProducts } from "@/fetch/client/products";
import { validateWooCommerceProductsResponse } from "@/types/validation/woocommerce/woocommerce";
import { Product } from "@/types/schema/woocommerce";
import { SearchResultVariableProductGroup } from "./SearchResultVariableProductGroup";

export function QuickSearch() {
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
      const response = await queryProducts({
        search,
        category: null,
        before: null,
        after: null,
        first: 25,
        last: null,
      });
      const json = await response.json();
      const parsed = validateWooCommerceProductsResponse(json);
      setResults(parsed.products);
      setStatus("idle");
    } catch (error) {
      setResults([]);
      setStatus("error");
      console.error(error);
    }
  }

  return (
    <>
      <label htmlFor="search" style={{ display: "none" }}>
        Search
      </label>
      <input
        type="text"
        className={styles["search-field"]}
        name="search"
        id="search"
        placeholder="Search for..."
        onChange={(e) => {
          setHasSearched(true);
          setStatus("loading");
          debouncedOnSearchInput(e.target.value);
        }}
      />
      <div className={styles["results-container"]}>
        {hasSearched && (
          <>
            {status === "idle" &&
              results.map((product) => (
                <SearchResultVariableProductGroup
                  key={product.id}
                  product={product}
                />
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
