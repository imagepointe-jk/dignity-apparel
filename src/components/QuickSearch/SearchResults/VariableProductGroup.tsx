import { Product } from "@/types/schema/woocommerce";
import styles from "@/styles/QuickSearch/SearchResult.module.css";
import { ContainedImage } from "../../global/ContainedImage/ContainedImage";
import { getVariationColorName } from "@/utility/products";
import Link from "next/link";
import { env } from "@/envClient";

type Props = {
  product: Product;
};
export function VariableProductGroup({ product }: Props) {
  return (
    <>
      {product.variations.map((variation) => (
        <li>
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
              <div>Color: {getVariationColorName(variation)}</div>
            </div>
          </Link>
        </li>
      ))}
    </>
  );
}
