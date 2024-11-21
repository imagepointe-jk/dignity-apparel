"use client";

import { IMAGE_NOT_FOUND_URL } from "@/constants";
import { Product } from "@/types/schema/woocommerce";
import { getSwatchesWithImages } from "@/utility/products";
import { useEffect, useState } from "react";
import styles from "@/styles/ProductPage/ProductPage.module.css";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Props = {
  product: Product;
};
export function ProductPage({ product }: Props) {
  const [viewedIndex, setViewedIndex] = useState(0);
  const swatchesWithImages = getSwatchesWithImages(product);
  const viewedSwatch = swatchesWithImages[viewedIndex];
  const { upcharge2x, upcharge3x, upcharge4x } = product.sizeUpcharges;
  const anyUpcharges = upcharge2x || upcharge3x || upcharge4x;
  const searchParams = useSearchParams();

  function onClickSwatch(clickedIndex: number) {
    setViewedIndex(clickedIndex);
  }

  useEffect(() => {
    const variationIdParam = searchParams.get("variationId");
    const variationId = variationIdParam ? +variationIdParam : null;
    const indexToView = swatchesWithImages.findIndex(
      (swatch) => swatch.variationId === variationId
    );
    if (indexToView) setViewedIndex(indexToView);
  }, []);

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
                key={item.name}
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
      <p dangerouslySetInnerHTML={{ __html: product.descriptionSanitized }}></p>
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
      {anyUpcharges && (
        <>
          <h3>Size Upcharges</h3>
          <ul>
            {upcharge2x && <li>2X: ${upcharge2x}</li>}
            {upcharge3x && <li>3X: ${upcharge3x}</li>}
            {upcharge4x && <li>4X: ${upcharge4x}</li>}
          </ul>
        </>
      )}
      <div>
        Categories
        <ul>
          {product.categories.map((cat) => (
            <li key={cat.id}>{cat.name}</li>
          ))}
        </ul>
      </div>
      <div>
        Tags
        <ul>
          {product.tags.map((tag) => (
            <li key={tag.id}>{tag.name}</li>
          ))}
        </ul>
      </div>
      <Link href={""} className={styles["purchase-link"]}>
        Purchase
      </Link>
    </div>
  );
}
