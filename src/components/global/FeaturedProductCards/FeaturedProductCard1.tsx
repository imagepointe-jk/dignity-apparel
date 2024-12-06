import { Product } from "@/types/schema/woocommerce";
import { clamp } from "@/utility/misc";
import { getSwatchesWithImages } from "@/utility/products";
import { useState } from "react";
import styles from "@/styles/global/FeaturedProductCard1.module.css";
import Link from "next/link";
import { Arrow } from "@/components/icons/Arrow";
import { productUrl } from "@/utility/url";
import { IMAGE_NOT_FOUND_URL } from "@/constants";

type Props = {
  product: Product;
  scrollableVariations?: boolean;
  condensed?: boolean;
};
const imageWidth = 300;
export function FeaturedProductCard1({
  product,
  scrollableVariations,
  condensed,
}: Props) {
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
    <div
      className={`${styles["card"]} ${condensed ? styles["condensed"] : ""}`}
    >
      <div className={styles["slider-container"]}>
        {scrollableVariations && (
          <div
            className={styles["slider"]}
            style={{ left: `${-1 * viewedIndex * imageWidth}px` }}
          >
            {swatches.map((swatch) => (
              <div
                key={swatch.variationId}
                className={styles["slider-item-image-container"]}
              >
                <img
                  src={swatch.productImageUrl}
                  alt={`${swatch.displayName} variation`}
                />
              </div>
            ))}
          </div>
        )}
        {!scrollableVariations && (
          <div className={styles["featured-image-container"]}>
            <img
              src={product.imageUrl || IMAGE_NOT_FOUND_URL}
              alt={product.name}
              className={styles["featured-image"]}
            />
          </div>
        )}
        <div className={styles["image-overlay"]}>
          {!condensed && (
            <>
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
            </>
          )}
          <Link href={productUrl(product)} className={styles["product-link"]}>
            View Product
          </Link>
        </div>
        <div className={styles["hover-line"]}></div>
        {scrollableVariations && (
          <>
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
          </>
        )}
      </div>
      {scrollableVariations && !condensed && (
        <div className={styles["slide-dots-row"]}>
          {swatches.map((swatch, i) => (
            <div
              key={swatch.variationId}
              className={`${styles["slide-dot"]} ${viewedIndex !== i ? styles["inactive"] : ""}`}
            ></div>
          ))}
        </div>
      )}
      {condensed && (
        <div className={styles["under-card-text"]}>
          {product.sku} - {product.name}
        </div>
      )}
    </div>
  );
}
