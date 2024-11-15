import { queryProducts } from "@/fetch/client/products";
import styles from "@/styles/ProductBrowse/ProductResults.module.css";
import { Product } from "@/types/schema/woocommerce";
import { validateWooCommerceProductsResponse } from "@/types/validation/woocommerce/woocommerce";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function ProductResults() {
  const [results, setResults] = useState([] as Product[]);
  const [status, setStatus] = useState("idle" as "idle" | "loading" | "error");
  const searchParams = useSearchParams();

  async function getResults() {
    setStatus("loading");
    try {
      const search = searchParams.get("search");
      const category = searchParams.get("category");

      const response = await queryProducts({ search, category });
      const json = await response.json();
      const parsed = validateWooCommerceProductsResponse(json);

      setResults(parsed);
      setStatus("idle");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  useEffect(() => {
    getResults();
  }, [searchParams]);

  return (
    <div className={styles["cards-container"]}>
      {status === "idle" &&
        results.length > 0 &&
        results.map((item) => (
          <div className={styles["card"]}>{item.name}</div>
        ))}
      {status === "idle" && results.length === 0 && <>No results.</>}
      {status === "loading" && <>Loading...</>}
      {status === "error" && <>Something went wrong.</>}
    </div>
  );
}
