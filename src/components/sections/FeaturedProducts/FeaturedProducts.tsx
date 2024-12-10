"use client";

import { CardSlider } from "@/components/global/CardSlider/CardSlider";
import { FeaturedProductCard1 } from "@/components/global/FeaturedProductCards/FeaturedProductCard1";
import styles from "@/styles/sections/FeaturedProducts.module.css";
import { WithTilingBackground } from "@/types/schema/misc";
import { Product } from "@/types/schema/woocommerce";
import { bgImage } from "@/utility/misc";
import { ReactNode } from "react";

type Props = {
  products: Product[];
  headingNode: ReactNode;
  primaryTextColor: string;
} & WithTilingBackground;
export function FeaturedProducts({
  headingNode,
  primaryTextColor,
  tilingBackground,
  products,
  ...rest
}: Props) {
  return (
    <section
      className={styles["main"]}
      style={{ ...bgImage(tilingBackground?.src) }}
      {...rest}
    >
      <div className="x-wide-container">
        <div style={{ color: `#${primaryTextColor}` }}>{headingNode}</div>
        <CardSlider
          createCard={(product) => <FeaturedProductCard1 product={product} />}
          dataset={products}
        />
      </div>
    </section>
  );
}
