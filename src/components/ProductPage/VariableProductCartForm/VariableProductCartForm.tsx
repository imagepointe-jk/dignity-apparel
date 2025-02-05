import { Product } from "@/types/schema/woocommerce";
import styles from "@/styles/ProductPage/VariableProductCartForm.module.css";

type Props = {
  product: Product;
  wooCommerceAttributes: {
    xAxis: {
      name: string;
      values: string[];
    };
    yAxis: {
      name: string;
      values: string[];
    };
  };
};
export function VariableProductCartForm({
  product,
  wooCommerceAttributes,
}: Props) {
  return (
    <div className={styles["main"]}>
      <table className={styles["variations-table"]}>
        <thead>
          <tr>
            <td></td>
            {wooCommerceAttributes.xAxis.values.map((val) => (
              <td key={val}>{val}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {wooCommerceAttributes.yAxis.values.map((xAxisVal) => (
            <tr key={xAxisVal}>
              <td>{xAxisVal}</td>
              {wooCommerceAttributes.xAxis.values.map((yAxisVal) => (
                <td>
                  <input
                    key={yAxisVal}
                    type="number"
                    defaultValue={0}
                    name={`quantity-${xAxisVal}-${yAxisVal}`}
                    id={`quantity-${xAxisVal}-${yAxisVal}`}
                    aria-label={`quantity-${xAxisVal}-${yAxisVal}`}
                    min={0}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
