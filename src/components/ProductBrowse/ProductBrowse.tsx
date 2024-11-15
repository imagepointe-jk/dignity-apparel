import { Category } from "@/types/schema/woocommerce";
import { Filters } from "./Filters";
import styles from "@/styles/ProductBrowse/ProductBrowse.module.css";
import { ProductResults } from "./ProductResults";

type Props = {
  categories: Category[];
};
export function ProductBrowse({ categories }: Props) {
  return (
    <div className={styles["main"]}>
      <h1>Search Results</h1>
      <div className={styles["main-flex"]}>
        <Filters categories={categories} />
        <ProductResults />
      </div>
    </div>
  );
}
