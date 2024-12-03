"use client";

import { FeaturedProductCard1 } from "@/components/global/FeaturedProductCards/FeaturedProductCard1";
import styles from "@/styles/sections/FeaturedProducts.module.css";
import { Product } from "@/types/schema/woocommerce";

type Props = {
  products: Product[];
};
export function FeaturedProducts({ products, ...rest }: Props) {
  return (
    <section className={styles["main"]} {...rest}>
      <h2>Featured Products</h2>
      <div className={styles["cards-container"]}>
        {products.map((product) => (
          <FeaturedProductCard1 key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
