"use client";

import styles from "@/styles/ProductBrowse/ProductBrowse.module.css";
import { Attribute, Category } from "@/types/schema/woocommerce";
import { useEffect, useState } from "react";
import { Filters } from "./Filters/Filters";
import { FiltersMobile } from "./Filters/FiltersMobile";
import { ProductResults } from "./ProductResults";
import { Search } from "./Filters/Search";

type Props = {
  categories: Category[];
  attributes: Attribute[];
};
export function ProductBrowse({ categories, attributes }: Props) {
  const [innerWidth, setInnerWidth] = useState(null as number | null);
  //hopefully a temp solution to the problem of having two filter components in the DOM at once.
  //if time later, look into why this causes a problem and how to resolve it better.
  const showMobileFilters = innerWidth && innerWidth <= 1024;

  useEffect(() => {
    setInnerWidth(window.innerWidth);
  }, []);

  return (
    <div className={styles["main"]}>
      <div className={styles["main-flex"]}>
        {!showMobileFilters && (
          <Filters
            categories={categories}
            attributes={attributes}
            mode={"normal"}
          />
        )}
        <ProductResults
          childrenUnderTitle={
            showMobileFilters ? (
              <>
                <Search />
                <FiltersMobile
                  categories={categories}
                  attributes={attributes}
                  mode={"modal"}
                />
              </>
            ) : undefined
          }
        />
      </div>
    </div>
  );
}
