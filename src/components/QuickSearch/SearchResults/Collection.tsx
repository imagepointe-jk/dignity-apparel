import { FlexibleImage } from "@/components/global/FlexibleImage/FlexibleImage";
import { IMAGE_NOT_FOUND_URL } from "@/constants";
import { queryProducts } from "@/fetch/client/products";
import styles from "@/styles/QuickSearch/SearchResult.module.css";
import { Product } from "@/types/schema/woocommerce";
import { validateWooCommerceProducts } from "@/types/validation/woocommerce/woocommerce";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  category: {
    id: number;
    name: string;
    slug: string;
    products: Product[];
  };
};
export function Collection({ category }: Props) {
  const [totalInCategory, setTotalInCategory] = useState(null as number | null);

  const firstProductImageUrl =
    category.products[0]?.imageUrl || IMAGE_NOT_FOUND_URL;

  async function getTotal() {
    try {
      const response = await queryProducts({
        category: category.slug,
        first: 1000,
        after: null,
        before: null,
        last: null,
        search: null,
        availability: null,
        fabricType: [],
        fabricWeight: [],
        features: [],
        fit: null,
        pageNumber: 1,
        pageSize: 1000,
      });
      const json = await response.json();
      const parsed = validateWooCommerceProducts(json.products);
      setTotalInCategory(parsed.length);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTotal();
  }, []);

  return (
    <Link
      href={`/products?category=${category.slug}`}
      className={styles["collection-card"]}
    >
      <FlexibleImage
        src={firstProductImageUrl}
        alt={category.name}
        containerClassName={styles["image-container"]}
        behavior="contain"
      />
      <div className={styles["info-container"]}>
        <div>{category.name}</div>

        <div
          className={styles["products-count"]}
          style={{ opacity: totalInCategory === null ? "0" : undefined }}
          aria-hidden={totalInCategory === null}
        >
          {totalInCategory}{" "}
          {`product${totalInCategory !== null && totalInCategory > 1 ? "s" : ""}`}
        </div>
      </div>
    </Link>
  );
}
