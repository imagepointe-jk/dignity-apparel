import { ContainedImage } from "@/components/global/ContainedImage/ContainedImage";
import { IMAGE_NOT_FOUND_URL } from "@/constants";
import { env } from "@/envClient";
import styles from "@/styles/QuickSearch/SearchResult.module.css";
import { Product } from "@/types/schema/woocommerce";
import Link from "next/link";

type Props = {
  category: {
    id: number;
    name: string;
    slug: string;
    products: Product[];
  };
};
export function Collection({ category }: Props) {
  const firstProductImageUrl =
    category.products[0]?.imageUrl || IMAGE_NOT_FOUND_URL;
  return (
    <Link
      href={`${env.NEXT_PUBLIC_BASE_URL}/products?category=${category.slug}`}
      className={styles["collection-card"]}
    >
      <ContainedImage
        src={firstProductImageUrl}
        containerClassName={styles["image-container"]}
      />
      <div className={styles["info-container"]}>
        <div>{category.name}</div>
        <div className={styles["products-count"]}>
          {category.products.length}{" "}
          {`product${category.products.length > 1 ? "s" : ""}`}
        </div>
      </div>
    </Link>
  );
}
