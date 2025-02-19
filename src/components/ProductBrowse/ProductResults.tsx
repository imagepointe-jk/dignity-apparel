import { queryProducts } from "@/fetch/client/products";
import styles from "@/styles/ProductBrowse/ProductResults.module.css";
import { Product } from "@/types/schema/woocommerce";
import { validateWooCommerceProducts } from "@/types/validation/woocommerce/woocommerce";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ReactNode, Suspense, useEffect, useState } from "react";
import { FeaturedProductCard2 } from "../global/FeaturedProductCards/FeaturedProductCard2";
import { validateBrowseSearchParams } from "@/utility/products";
import { LoadingIndicator } from "../global/LoadingIndicator/LoadingIndicator";
import { DEFAULT_PRODUCTS_PAGE_SIZE } from "@/constants";
import { Arrow } from "../icons/Arrow";

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
  const [totalProducts, setTotalProducts] = useState(null as number | null);
  const [status, setStatus] = useState(
    "loading" as "idle" | "loading" | "error"
  );
  const searchParams = useSearchParams();

  function createPageButtonUrl(type: "next" | "previous") {
    if (!totalProducts) return null;

    const newParams = new URLSearchParams(searchParams);

    const pageSizeParam = `${newParams.get("page-size")}`;
    const pageNumberParam = `${newParams.get("page-number")}`;
    const pageSize = isNaN(+pageSizeParam)
      ? DEFAULT_PRODUCTS_PAGE_SIZE
      : +pageSizeParam;
    const pageNumber = isNaN(+pageNumberParam) ? 1 : +pageNumberParam;

    if (type === "next") {
      if (totalProducts <= pageNumber * pageSize) return null;
      newParams.set("page-number", `${pageNumber + 1}`);
    }
    if (type === "previous") {
      if (pageNumber < 2) return null;
      newParams.set("page-number", `${pageNumber - 1}`);
    }

    return `/products?${newParams}`;
  }

  const nextUrl = createPageButtonUrl("next");
  const prevUrl = createPageButtonUrl("previous");

  async function getResults() {
    setStatus("loading");
    setTotalProducts(0);
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
        pageNumber,
        pageSize,
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
        pageNumber,
        pageSize,
      });
      const json = await response.json();
      const parsed = validateWooCommerceProducts(json.products);
      const totalProducts = +json.pageInfo?.totalProducts;
      if (!isNaN(totalProducts)) setTotalProducts(totalProducts);

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
      <h1 className={styles["heading"]}>USA-MADE APPAREL</h1>
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
        <div className={styles["page-buttons-container"]}>
          {prevUrl && (
            <Link href={prevUrl} className={styles["page-button"]}>
              <Arrow size={15} style={{ rotate: "180deg" }} /> Previous
            </Link>
          )}
          {nextUrl && (
            <Link href={nextUrl} className={styles["page-button"]}>
              Next <Arrow size={15} />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
