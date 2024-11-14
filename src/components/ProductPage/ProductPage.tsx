"use client";

import { IMAGE_NOT_FOUND_URL } from "@/constants";
import { Product } from "@/types/schema/woocommerce";
import { getSwatchesWithImages } from "@/utility/products";
import { useState } from "react";
import styles from "@/styles/ProductPage/ProductPage.module.css";
import Link from "next/link";

type Props = {
  product: Product;
};
export function ProductPage({ product }: Props) {
  const [viewedIndex, setViewedIndex] = useState(0);
  const swatchesWithImages = getSwatchesWithImages(product);
  const viewedSwatch = swatchesWithImages[viewedIndex];

  function onClickSwatch(clickedIndex: number) {
    setViewedIndex(clickedIndex);
  }

  return (
    <div className={styles["main"]}>
      <h1>{product.name}</h1>
      <div>{product.sku}</div>
      <img
        src={viewedSwatch?.productImageUrl || IMAGE_NOT_FOUND_URL}
        alt={product.name}
        className={styles["product-image"]}
      />
      <h3>Available Colors</h3>
      <div>
        <ul className={styles["swatches"]}>
          {swatchesWithImages.map((item, i) => (
            <li key={item.name}>
              <button
                className={`${styles["swatch"]} ${viewedIndex === i ? styles["selected"] : ""}`}
                onClick={() => onClickSwatch(i)}
                style={{
                  backgroundColor: item.swatchImageUrl
                    ? undefined
                    : `#${item.hexCode}`,
                  backgroundImage: item.swatchImageUrl
                    ? `url(${item.swatchImageUrl})`
                    : undefined,
                }}
              ></button>
            </li>
          ))}
        </ul>
      </div>
      <div>{viewedSwatch?.name || "UNKNOWN COLOR"}</div>
      <h3>Sizes</h3>
      <p>S-4XL</p>
      <h3>Product Description</h3>
      <p>(Description Here)</p>
      <h3>Pricing Table</h3>
      <table className={styles["pricing-table"]}>
        <thead>
          <tr>
            <td>S</td>
            <td>M</td>
            <td>L</td>
            <td>XL</td>
            <td>2XL</td>
            <td>3XL</td>
            <td>4XL</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>$1</td>
            <td>$10</td>
            <td>$100</td>
            <td>$1</td>
            <td>$10</td>
            <td>$100</td>
            <td>$1</td>
          </tr>
        </tbody>
      </table>
      <Link href={""} className={styles["purchase-link"]}>
        Purchase
      </Link>
    </div>
  );
}
