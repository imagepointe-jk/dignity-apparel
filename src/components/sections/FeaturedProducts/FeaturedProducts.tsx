"use client";

import { CardSlider } from "@/components/global/CardSlider/CardSlider";
import { FeaturedProductCard1 } from "@/components/global/FeaturedProductCards/FeaturedProductCard1";
import styles from "@/styles/sections/FeaturedProducts.module.css";
import { WithTilingBackground } from "@/types/schema/misc";
import { Product } from "@/types/schema/woocommerce";
import { bgImage } from "@/utility/misc";

type Props = {
  products: Product[];
  headingText: string;
  primaryTextColor: string;
} & WithTilingBackground;
export function FeaturedProducts({
  headingText,
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
        <h2 style={{ color: `#${primaryTextColor}` }}>{headingText}</h2>
        <CardSlider
          createCard={(product) => <FeaturedProductCard1 product={product} />}
          dataset={products}
        />
      </div>
    </section>
  );
}
