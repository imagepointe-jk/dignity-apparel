import { DEFAULT_PRODUCTS_PAGE_SIZE } from "@/constants";
import { env } from "@/envClient";
import { queryProducts } from "@/fetch/client/products";
import styles from "@/styles/ProductBrowse/ProductResults.module.css";
import { PageInfo, Product } from "@/types/schema/woocommerce";
import { validateWooCommerceProductsResponse } from "@/types/validation/woocommerce/woocommerce";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function ProductResults() {
  const [results, setResults] = useState([] as Product[]);
  const [pageInfo, setPageInfo] = useState(null as PageInfo | null);
  const [status, setStatus] = useState("idle" as "idle" | "loading" | "error");
  const searchParams = useSearchParams();

  function createPageButtonUrl(type: "next" | "previous") {
    const newParams = new URLSearchParams(searchParams);

    newParams.delete("before");
    newParams.delete("after");
    newParams.delete("first");
    newParams.delete("last");

    if (type === "next") {
      if (!pageInfo?.hasNextPage) return null;
      newParams.set("first", `${DEFAULT_PRODUCTS_PAGE_SIZE}`);
      newParams.set("after", pageInfo.endCursor);
    }
    if (type === "previous") {
      if (!pageInfo?.hasPreviousPage) return null;
      newParams.set("last", `${DEFAULT_PRODUCTS_PAGE_SIZE}`);
      newParams.set("before", pageInfo.startCursor);
    }

    return `${env.NEXT_PUBLIC_BASE_URL}/products?${newParams}`;
  }

  const nextUrl = createPageButtonUrl("next");
  const prevUrl = createPageButtonUrl("previous");

  async function getResults() {
    setStatus("loading");
    try {
      const search = searchParams.get("search");
      const category = searchParams.get("category");
      const before = searchParams.get("before");
      const after = searchParams.get("after");
      const first = searchParams.get("first");
      const last = searchParams.get("last");

      const response = await queryProducts({
        search,
        category,
        before: before ? decodeURIComponent(before) : null,
        after: after ? decodeURIComponent(after) : null,
        first: first ? +first : null,
        last: last ? +last : null,
      });
      const json = await response.json();
      const parsed = validateWooCommerceProductsResponse(json);

      setResults(parsed.products);
      setPageInfo(parsed.pageInfo);
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
    <div>
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
      {(prevUrl || nextUrl) && (
        <div>
          {prevUrl && <Link href={prevUrl}>&lt; Previous</Link>}
          {nextUrl && <Link href={nextUrl}>Next &gt;</Link>}
        </div>
      )}
      {/* <div>
        <Link>&lt; Previous</Link>
        <Link>&gt; Next</Link>
      </div> */}
    </div>
  );
}
