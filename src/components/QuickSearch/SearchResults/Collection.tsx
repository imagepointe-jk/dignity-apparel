import { ContainedImage } from "@/components/global/ContainedImage/ContainedImage";
import { IMAGE_NOT_FOUND_URL } from "@/constants";
import { env } from "@/envClient";
import { queryProducts } from "@/fetch/client/products";
import styles from "@/styles/QuickSearch/SearchResult.module.css";
import { Product } from "@/types/schema/woocommerce";
import {
  validateWooCommerceProducts,
  validateWooCommerceProductsGraphQLResponse,
} from "@/types/validation/woocommerce/woocommerce";
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
      });
      const json = await response.json();
      const parsed = validateWooCommerceProducts(json);
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
      href={`${env.NEXT_PUBLIC_BASE_URL}/products?category=${category.slug}`}
      className={styles["collection-card"]}
    >
      <ContainedImage
        src={firstProductImageUrl}
        alt={category.name}
        containerClassName={styles["image-container"]}
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
