import { Product } from "@/types/schema/woocommerce";
import { clamp } from "@/utility/misc";
import { getSwatchesWithImages } from "@/utility/products";
import { useState } from "react";
import styles from "@/styles/global/FeaturedProductCard1.module.css";
import Link from "next/link";
import { Arrow } from "@/components/icons/Arrow";
import { productUrl } from "@/utility/url";

type Props = {
  product: Product;
};
const imageWidth = 300;
export function FeaturedProductCard1({ product }: Props) {
  const [viewedIndex, setViewedIndex] = useState(0);
  const swatches = getSwatchesWithImages(product);
  const canGoLeft = viewedIndex > 0;
  const canGoRight = viewedIndex < swatches.length - 1;

  function onClickArrow(direction: "left" | "right") {
    const increment = direction === "left" ? -1 : 1;
    const newIndex = clamp(viewedIndex + increment, 0, swatches.length - 1);
    setViewedIndex(newIndex);
  }

  return (
    <div className={styles["card"]}>
      <div className={styles["slider-container"]}>
        <div
          className={styles["slider"]}
          style={{ left: `${-1 * viewedIndex * imageWidth}px` }}
        >
          {swatches.map((swatch) => (
            <div key={swatch.variationId} className={styles["image-container"]}>
              <img
                src={swatch.productImageUrl}
                alt={`${swatch.displayName} variation`}
              />
            </div>
          ))}
        </div>
        <div className={styles["image-overlay"]}>
          <div>
            <div className={styles["product-name"]}>{product.name}</div>
            {product.additionalProductInformation.materialDescription && (
              <div className={styles["material-description"]}>
                {product.additionalProductInformation.materialDescription}
              </div>
            )}
          </div>
          <div className={styles["colors-container"]}>
            <div className={styles["colors-text"]}>Available Colors</div>
            <div className={styles["swatches-row"]}>
              {swatches.map((swatch) => (
                <div
                  key={swatch.variationId}
                  className={styles["swatch"]}
                  style={{
                    backgroundColor: swatch.hexCode
                      ? `#${swatch.hexCode}`
                      : undefined,
                    backgroundImage: swatch.swatchImageUrl
                      ? `url("${swatch.swatchImageUrl}")`
                      : undefined,
                  }}
                ></div>
              ))}
            </div>
          </div>
          <Link href={productUrl(product)} className={styles["product-link"]}>
            View Product
          </Link>
        </div>
        <div className={styles["hover-line"]}></div>
        <button
          className={styles["arrow-left"]}
          onClick={() => onClickArrow("left")}
          disabled={!canGoLeft}
        >
          <Arrow size={14} />
        </button>
        <button
          className={styles["arrow-right"]}
          onClick={() => onClickArrow("right")}
          disabled={!canGoRight}
        >
          <Arrow size={14} />
        </button>
      </div>
      <div className={styles["slide-dots-row"]}>
        {swatches.map((swatch, i) => (
          <div
            key={swatch.variationId}
            className={`${styles["slide-dot"]} ${viewedIndex !== i ? styles["inactive"] : ""}`}
          ></div>
        ))}
      </div>
    </div>
  );
}
