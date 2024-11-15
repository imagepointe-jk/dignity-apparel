import { Product } from "@/types/schema/woocommerce";
import styles from "@/styles/ProductBrowse/ProductCard.module.css";
import { IMAGE_NOT_FOUND_URL } from "@/constants";
import { getSwatchesWithImages } from "@/utility/products";
import Link from "next/link";
import { env } from "@/envClient";

type Props = {
  product: Product;
};
export function ProductCard({ product }: Props) {
  const { name, imageUrl } = product;
  const swatchesWithImages = getSwatchesWithImages(product);

  return (
    <div className={styles["main"]}>
      {" "}
      <div className={styles["main-image-container"]}>
        <img src={imageUrl || IMAGE_NOT_FOUND_URL} alt={name} />
      </div>
      <div>
        <Link href={`${env.NEXT_PUBLIC_BASE_URL}/products/${product.slug}`}>
          {name}
        </Link>
      </div>
      <div>Available Colors</div>
      <div>
        <ul className={styles["swatches"]}>
          {swatchesWithImages.map((item) => (
            <li key={item.name}>
              <button
                //   className={`${styles["swatch"]} ${viewedIndex === i ? styles["selected"] : ""}`}
                //   onClick={() => onClickSwatch(i)}
                className={styles["swatch"]}
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
    </div>
  );
}
