"use client";

import { CardSlider } from "@/components/global/CardSlider/CardSlider";
import { LinkAsButton } from "@/components/global/LinkAsButton/LinkAsButton";
import styles from "@/styles/sections/ProductSlider.module.css";

type Props = {
  products: {
    id: string | number;
    name: string;
    SKU: string;
    url: string;
    img: {
      src: string;
      alt: string;
    };
    colors: string[];
  }[];
  buttons: {
    mainColor: string;
    secondaryColor: string;
  };
};
export function ProductSlider({ products, buttons }: Props) {
  return (
    <CardSlider
      dataset={products}
      createCard={(product) => (
        <div className={styles["card"]}>
          <img
            src={product.img.src}
            alt={product.img.alt}
            className={styles["image"]}
          />
          <div className={styles["overlay"]}>
            <p>{product.SKU}</p>
            <h3>{product.name}</h3>
            <div className={styles["swatches-container"]}>
              {product.colors.map((color) => (
                <div
                  className={styles["swatch"]}
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
            <LinkAsButton
              href={product.url}
              label="View Product"
              mainColor={buttons.mainColor}
              secondaryColor={buttons.secondaryColor}
            />
          </div>
        </div>
      )}
    />
  );
}
