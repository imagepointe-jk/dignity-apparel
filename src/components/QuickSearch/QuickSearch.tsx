import styles from "@/styles/QuickSearch/QuickSearch.module.css";
import { VariableProduct } from "./SearchResults/VariableProduct";
import debounce from "lodash.debounce";
import { useCallback, useState } from "react";
import { queryProducts } from "@/fetch/client/products";
import { validateWooCommerceProductsResponse } from "@/types/validation/woocommerce/woocommerce";
import { Product } from "@/types/schema/woocommerce";
import { VariableProductGroup } from "./SearchResults/VariableProductGroup";
import { getRepresentedCategories } from "@/utility/products";
import { Collection } from "./SearchResults/Collection";

export function QuickSearch() {
  const [hasSearched, setHasSearched] = useState(false); //whether the user has made any searches yet
  const [viewType, setViewType] = useState(
    "collections" as "products" | "collections"
  );
  const [status, setStatus] = useState("idle" as "idle" | "loading" | "error");
  const [results, setResults] = useState([] as Product[]);
  const debouncedOnSearchInput = useCallback(
    debounce(async (search: string) => {
      doSearch(search);
    }, 700),
    []
  );
  const categories = getRepresentedCategories(results);

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
      <div className={styles["view-types-container"]}>
        <button
          onClick={() => setViewType("products")}
          className={viewType === "products" ? styles["active"] : undefined}
        >
          Products
        </button>
        <button
          onClick={() => setViewType("collections")}
          className={viewType === "collections" ? styles["active"] : undefined}
        >
          Collections
        </button>
      </div>
      <div
        className={`${viewType === "products" ? styles["products-container"] : styles["collections-container"]}`}
      >
        {hasSearched && (
          <>
            {status === "idle" && (
              <>
                {viewType === "products" &&
                  results.map((product) => (
                    <VariableProductGroup key={product.id} product={product} />
                  ))}
                {viewType === "collections" &&
                  categories.map((cat) => (
                    <Collection key={cat.id} category={cat} />
                  ))}
              </>
            )}
            {status === "idle" && results?.length === 0 && <>No results.</>}
            {status === "error" && <>Something went wrong.</>}
            {status === "loading" && <div>Loading...</div>}
          </>
        )}
      </div>
    </>
  );
}
