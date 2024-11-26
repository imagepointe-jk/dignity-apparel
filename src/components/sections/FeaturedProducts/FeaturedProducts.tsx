"use client";

import { Arrow } from "@/components/icons/Arrow";
import styles from "@/styles/sections/FeaturedProducts.module.css";
import { Product } from "@/types/schema/woocommerce";
import { clamp } from "@/utility/misc";
import { getSwatchesWithImages } from "@/utility/products";
import { productUrl } from "@/utility/url";
import Link from "next/link";
import { useState } from "react";

type Props = {
  products: Product[];
};
export function FeaturedProducts({ products, ...rest }: Props) {
  return (
    <section className={styles["main"]} {...rest}>
      <h2>Featured Products</h2>
      <div className={styles["cards-container"]}>
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

type CardProps = {
  product: Product;
};
const imageWidth = 300;
function Card({ product }: CardProps) {
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
          <div className={styles["product-name"]}>{product.name}</div>
          <div>Material Text Here</div>
          <div>Available Colors</div>
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
          <Link href={productUrl(product)} className={styles["product-link"]}>
            View Product
          </Link>
        </div>
        <button
          className={styles["arrow-left"]}
          onClick={() => onClickArrow("left")}
          disabled={!canGoLeft}
        >
          <Arrow />
        </button>
        <button
          className={styles["arrow-right"]}
          onClick={() => onClickArrow("right")}
          disabled={!canGoRight}
        >
          <Arrow />
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
