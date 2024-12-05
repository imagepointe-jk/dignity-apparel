"use client";

import { Attribute, Category } from "@/types/schema/woocommerce";
import { Filters } from "./Filters";
import styles from "@/styles/ProductBrowse/ProductBrowse.module.css";
import { ProductResults } from "./ProductResults";

type Props = {
  categories: Category[];
  attributes: Attribute[];
};
export function ProductBrowse({ categories, attributes }: Props) {
  return (
    <div className={styles["main"]}>
      <div className={styles["main-flex"]}>
        <Filters categories={categories} attributes={attributes} />
        <ProductResults />
      </div>
    </div>
  );
}
