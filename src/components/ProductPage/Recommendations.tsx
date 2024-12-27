import { queryProducts } from "@/fetch/client/products";
import { Product } from "@/types/schema/woocommerce";
import { validateWooCommerceProductsResponse } from "@/types/validation/woocommerce/woocommerce";
import { useEffect, useState } from "react";
import styles from "@/styles/ProductPage/ProductPage.module.css";
import { FeaturedProductCard2 } from "../global/FeaturedProductCards/FeaturedProductCard2";
import { CardSlider } from "../global/CardSlider/CardSlider";

type Props = {
  categorySlug: string;
};
export function Recommendations({ categorySlug }: Props) {
  const [products, setProducts] = useState([] as Product[]);
  const [status, setStatus] = useState(
    "loading" as "idle" | "loading" | "error"
  );
  const TEMP_PRODUCTS = products
    .concat([...products])
    .concat([...products])
    .concat([...products]);

  async function fetchData() {
    try {
      const response = await queryProducts({
        first: 4,
        after: null,
        before: null,
        category: categorySlug,
        last: null,
        search: null,
      });
      const json = await response.json();
      const parsed = validateWooCommerceProductsResponse(json);
      setProducts(parsed.products);
      setStatus("idle");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className={styles["recommended-container"]}>
      <h3 className={`${styles["recommended-heading"]} h3-bold`}>
        RECOMMENDED STYLES
      </h3>
      <div className={`${styles["recommended-content"]} x-wide-container`}>
        {status === "idle" && (
          <>
            {TEMP_PRODUCTS.length === 0 && <>No recommended products.</>}
            {TEMP_PRODUCTS.length > 0 && (
              <CardSlider
                createCard={(product) => (
                  <FeaturedProductCard2 product={product} />
                )}
                dataset={TEMP_PRODUCTS}
                slidingParentClassName={
                  styles["recommendations-sliding-parent"]
                }
              />
            )}
          </>
        )}
        {status === "loading" && <>Loading...</>}
        {status === "error" && <>No recommended products.</>}
      </div>
    </section>
  );
}
