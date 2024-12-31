import { IMAGE_NOT_FOUND_URL } from "@/constants";
import styles from "@/styles/global/FeaturedProductCard2.module.css";
import { Product } from "@/types/schema/woocommerce";
import {
  abbreviateSize,
  getColorStockAmounts,
  getSwatchesWithImages,
} from "@/utility/products";
import { productUrl } from "@/utility/url";
import Link from "next/link";

type Props = {
  product: Product;
  mainClassName?: string;
  imageContainerClassName?: string;
};
export function FeaturedProductCard2({
  product,
  mainClassName,
  imageContainerClassName,
}: Props) {
  const swatches = getSwatchesWithImages(product);
  const stockAmounts = getColorStockAmounts(product, swatches[0]?.name || "");
  //different colors might have different size ranges, but this is not accounted for in the design,
  //so just guess and pick the first color
  const smallestSize = stockAmounts[0]?.size
    ? abbreviateSize(stockAmounts[0].size)
    : "UNKNOWN SIZE";
  const largestSize =
    stockAmounts[stockAmounts.length - 1]?.size || "UNKNOWN SIZE";

  return (
    <div className={`${styles["main"]} ${mainClassName || ""}`}>
      <div className={styles["category-text"]}>
        {product.categories[0]?.name}
      </div>
      <Link
        href={productUrl(product)}
        className={`${styles["image-container"]} ${imageContainerClassName || ""}`}
      >
        <img src={product.imageUrl || IMAGE_NOT_FOUND_URL} alt={product.name} />
        <div className={styles["image-overlay"]}>
          <div className={styles["hover-text"]} aria-hidden="true">
            View Product
          </div>
        </div>
        <div className={styles["hover-line"]}></div>
      </Link>
      <div className={styles["details-container"]}>
        <div className={styles["product-sku"]}>{product.sku}</div>
        <Link href={productUrl(product)} className={styles["product-name"]}>
          {product.name}
        </Link>
        <div className={styles["product-sizes"]}>
          {smallestSize.toLocaleUpperCase()}-{largestSize.toLocaleUpperCase()}
        </div>
        <div className={styles["swatches-container"]}>
          {swatches.map((swatch) => (
            <div
              key={swatch.name}
              className={styles["swatch"]}
              style={{
                backgroundImage: swatch.swatchImageUrl
                  ? `url("${swatch.swatchImageUrl}")`
                  : undefined,
                backgroundColor: `#${swatch.hexCode}`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
