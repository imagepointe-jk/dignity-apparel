"use client";

import { CardSlider } from "@/components/global/CardSlider/CardSlider";
import { FeaturedProductCard1 } from "@/components/global/FeaturedProductCards/FeaturedProductCard1";
import styles from "@/styles/sections/FeaturedProducts.module.css";
import { Product } from "@/types/schema/woocommerce";

type Props = {
  products: Product[];
  headingText: string;
  primaryTextColor: string;
  backgroundColor: string;
};
export function FeaturedProducts({
  headingText,
  primaryTextColor,
  backgroundColor,
  products,
  ...rest
}: Props) {
  return (
    <section
      className={styles["main"]}
      style={{ backgroundColor: `#${backgroundColor}` }}
      {...rest}
    >
      <div className="x-wide-container">
        <h2 style={{ color: `#${primaryTextColor}` }}>{headingText}</h2>
        <CardSlider
          createCard={(product) => <FeaturedProductCard1 product={product} />}
          dataset={products}
        />
      </div>
    </section>
  );
}
