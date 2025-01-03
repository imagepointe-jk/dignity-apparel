import { DEFAULT_PRODUCTS_PAGE_SIZE } from "@/constants";
import { env } from "@/envClient";
import { queryProducts } from "@/fetch/client/products";
import styles from "@/styles/ProductBrowse/ProductResults.module.css";
import { PageInfo, Product } from "@/types/schema/woocommerce";
import { validateWooCommerceProducts } from "@/types/validation/woocommerce/woocommerce";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ReactNode, Suspense, useEffect, useState } from "react";
import { FeaturedProductCard2 } from "../global/FeaturedProductCards/FeaturedProductCard2";
import { validateBrowseSearchParams } from "@/utility/products";
import { LoadingIndicator } from "../global/LoadingIndicator/LoadingIndicator";

export function ProductResults({ childrenUnderTitle }: Props) {
  return (
    <Suspense>
      <ProductResultsWrapped childrenUnderTitle={childrenUnderTitle} />
    </Suspense>
  );
}

type Props = {
  childrenUnderTitle?: ReactNode;
};
export function ProductResultsWrapped({ childrenUnderTitle }: Props) {
  const [results, setResults] = useState([] as Product[]);
  const [pageInfo] = useState(null as PageInfo | null); //currently unused
  const [status, setStatus] = useState(
    "loading" as "idle" | "loading" | "error"
  );
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
      if (pageInfo.endCursor) newParams.set("after", pageInfo.endCursor);
    }
    if (type === "previous") {
      if (!pageInfo?.hasPreviousPage) return null;
      newParams.set("last", `${DEFAULT_PRODUCTS_PAGE_SIZE}`);
      if (pageInfo.startCursor) newParams.set("before", pageInfo.startCursor);
    }

    return `${env.NEXT_PUBLIC_BASE_URL}/products?${newParams}`;
  }

  const nextUrl = createPageButtonUrl("next");
  const prevUrl = createPageButtonUrl("previous");

  async function getResults() {
    setStatus("loading");
    try {
      const {
        search,
        category,
        availability,
        "fabric-type": fabricType,
        "fabric-weight": fabricWeight,
        features,
        fit,
        before,
        after,
        first,
        last,
      } = validateBrowseSearchParams(searchParams);

      const response = await queryProducts({
        search,
        category,
        availability,
        fabricType,
        fabricWeight,
        features,
        fit,
        before,
        after,
        first,
        last,
      });
      const json = await response.json();
      const parsed = validateWooCommerceProducts(json);

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
    <div className={styles["main"]}>
      <h1 className={styles["heading"]}>USA MADE APPAREL</h1>
      {childrenUnderTitle}
      <div className={styles["cards-container"]}>
        {status === "idle" &&
          results.length > 0 &&
          results.map((product) => (
            <FeaturedProductCard2
              key={product.id}
              product={product}
              mainClassName={styles["card-main-container"]}
              imageContainerClassName={styles["card-image-container"]}
            />
          ))}
        {status === "idle" && results.length === 0 && <>No results.</>}
        {status === "loading" && (
          <LoadingIndicator
            message="Loading results..."
            containerClassName={styles["loading-indicator-container"]}
          />
        )}
        {status === "error" && <>Something went wrong.</>}
      </div>
      {(prevUrl || nextUrl) && (
        <div>
          {prevUrl && <Link href={prevUrl}>&lt; Previous</Link>}
          {nextUrl && <Link href={nextUrl}>Next &gt;</Link>}
        </div>
      )}
    </div>
  );
}
