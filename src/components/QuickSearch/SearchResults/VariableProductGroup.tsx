import { Product } from "@/types/schema/woocommerce";
import styles from "@/styles/QuickSearch/SearchResult.module.css";
import { ContainedImage } from "../../global/ContainedImage/ContainedImage";
import {
  deduplicateColorVariations,
  getVariationColorDisplayName,
} from "@/utility/products";
import Link from "next/link";
import { env } from "@/envClient";

type Props = {
  product: Product;
};
export function VariableProductGroup({ product }: Props) {
  //we want to see all color variations only, not ALL variations (small red, medium red, small purple, medium purple, etc.)
  //deduplicate so that only one result per color is seen
  const deduplicatedColors = deduplicateColorVariations(product);

  return (
    <>
      {deduplicatedColors.map((variation) => (
        <li key={variation.id}>
          <Link
            key={variation.id}
            className={styles["main"]}
            href={`${env.NEXT_PUBLIC_BASE_URL}/products/${product.slug}?variationId=${variation.id}`}
          >
            <ContainedImage
              src={variation.imageUrl}
              alt={variation.name}
              containerClassName={styles["image-container"]}
            />
            <div className={styles["info-container"]}>
              <div>{product.sku}</div>
              <div>{product.name}</div>
              <div>Color: {getVariationColorDisplayName(variation)}</div>
            </div>
          </Link>
        </li>
      ))}
    </>
  );
}
