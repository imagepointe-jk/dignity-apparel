import styles from "@/styles/QuickSearch/QuickSearch.module.css";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";
import { queryProducts } from "@/fetch/client/products";
import { validateWooCommerceProducts } from "@/types/validation/woocommerce/woocommerce";
import { Product } from "@/types/schema/woocommerce";
import { VariableProductGroup } from "./SearchResults/VariableProductGroup";
import { getRepresentedCategories } from "@/utility/products";
import { Collection } from "./SearchResults/Collection";
import { XMark } from "../icons/XMark";
import { LoadingIndicator } from "../global/LoadingIndicator/LoadingIndicator";

type Props = {
  toggleDialog: () => void;
};
export function QuickSearch({ toggleDialog }: Props) {
  const [search, setSearch] = useState("");
  const [gotNoResults, setGotNoResults] = useState(false); //whether the user got 0 results from their most recent search
  const [viewType, setViewType] = useState(
    "products" as "products" | "collections"
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

  function onClickClear() {
    if (search) setSearch("");
    else toggleDialog();
  }

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
      const parsed = validateWooCommerceProducts(json);
      if (parsed.length > 0) {
        setResults(parsed);
        setStatus("idle");
        return;
      }

      const newResponse = await queryProducts({
        search: null,
        category: null,
        before: null,
        after: null,
        first: 25,
        last: null,
      });
      const newJson = await newResponse.json();
      const newParsed = validateWooCommerceProducts(newJson);
      setGotNoResults(true);
      setResults(newParsed);
      setStatus("idle");
    } catch (error) {
      setResults([]);
      setStatus("error");
      console.error(error);
    }
  }

  useEffect(() => {
    setStatus("loading");
    setGotNoResults(false);
    debouncedOnSearchInput(search);
  }, [search]);

  return (
    <>
      <div className={styles["clear-button-container"]}>
        <button onClick={onClickClear} aria-label={search ? "Clear" : "Close"}>
          {search && "Clear"} <XMark />
        </button>
      </div>
      <label htmlFor="search" style={{ display: "none" }}>
        Search
      </label>
      <input
        type="text"
        className={styles["search-field"]}
        name="search"
        id="search"
        placeholder="Search for..."
        onChange={(e) => setSearch(e.target.value)}
        value={search}
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
        aria-live="polite"
        aria-atomic="true"
      >
        {search && (
          <>
            {status === "idle" && gotNoResults && (
              <div className={styles["search-result-message"]}>
                No results found. Please try another term or view products
                below.
              </div>
            )}
            {status === "idle" && (
              <ul>
                {viewType === "products" &&
                  results.map((product) => (
                    <VariableProductGroup key={product.id} product={product} />
                  ))}
                {viewType === "collections" &&
                  categories.map((cat) => (
                    <li key={cat.id}>
                      <Collection category={cat} />
                    </li>
                  ))}
              </ul>
            )}
            {status === "error" && <>Something went wrong.</>}
            {status === "loading" && (
              <LoadingIndicator
                message="Loading results..."
                containerClassName={styles["loading-indicator-container"]}
              />
            )}
          </>
        )}
        {!search && (
          <div className={styles["search-result-message"]}>
            Start typing to find products
          </div>
        )}
      </div>
    </>
  );
}
