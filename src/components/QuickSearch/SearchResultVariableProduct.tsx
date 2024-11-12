import { Product } from "@/types/schema/woocommerce";
import styles from "@/styles/QuickSearch/SearchResult.module.css";
import { getSwatchesWithImages } from "@/utility/products";
import { useState } from "react";
import { IMAGE_NOT_FOUND_URL } from "@/constants";
import Link from "next/link";
import { env } from "@/envClient";

type Props = {
  product: Product;
};
export function SearchResultVariableProduct({ product }: Props) {
  const [viewedIndex, setViewedIndex] = useState(0);
  const swatchesWithImages = getSwatchesWithImages(product);
  const viewedSwatch = swatchesWithImages[viewedIndex];

  function onClickSwatch(clickedIndex: number) {
    setViewedIndex(clickedIndex);
  }

  return (
    <div className={styles["main"]}>
      <div className={styles["image-container"]}>
        <img
          src={viewedSwatch?.productImageUrl || IMAGE_NOT_FOUND_URL}
          alt={product.name}
        />
      </div>
      <div>
        <div>{product.name}</div>
        <div>{product.sku}</div>
        <div>Available Colors</div>
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
        <div>
          <Link href={`${env.NEXT_PUBLIC_BASE_URL}/products/${product.slug}`}>
            View Product &gt;
          </Link>
        </div>
      </div>
    </div>
  );
}
