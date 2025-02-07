import { Product, ProductVariation } from "@/types/schema/woocommerce";
import styles from "@/styles/ProductPage/VariableProductCartForm.module.css";
import { ProductVariationCell } from "./ProductVariationCell";
import { getVariationAttributeValue } from "@/utility/products";
import { clamp } from "@/utility/misc";
import { useImmer } from "use-immer";
import { useState } from "react";

type Props = {
  product: Product;
  wooCommerceAttributes: {
    xAxis: {
      name: string;
      values: {
        displayName: string;
        slug: string;
      }[];
    };
    yAxis: {
      name: string;
      values: {
        displayName: string;
        slug: string;
      }[];
    };
  };
};
type CellState = {
  variation: ProductVariation;
  quantity: number;
};
export function VariableProductCartForm({
  product,
  wooCommerceAttributes,
}: Props) {
  const [cellStates, setCellStates] = useImmer([] as CellState[]);
  const [highlightedVariation, setHighlightedVariation] = useState(
    null as ProductVariation | null
  );

  function onChangeCell(variation: ProductVariation, inputValue: string) {
    const onlyDigits = inputValue.replace(/[^\d]/g, "");
    const clamped = clamp(
      +onlyDigits,
      0,
      variation.stockQuantity || Number.MAX_SAFE_INTEGER
    );
    setCellStates((draft) => {
      const existingState = draft.find(
        (state) => state.variation.id === variation.id
      );
      if (existingState) existingState.quantity = clamped;
      else draft.push({ variation, quantity: clamped });
    });
  }

  const totalItems = cellStates.reduce(
    (accum, item) => accum + item.quantity,
    0
  );
  const totalPrice = cellStates.reduce((accum, item) => {
    const priceAsNumber = +item.variation.price.replace("$", "");
    return isNaN(priceAsNumber) ? accum : accum + priceAsNumber * item.quantity;
  }, 0);
  const highlightedXAxisValue = highlightedVariation?.attributes.find(
    (attr) => attr.name === wooCommerceAttributes.xAxis.name
  )?.value;
  const highlightedYAxisValue = highlightedVariation?.attributes.find(
    (attr) => attr.name === wooCommerceAttributes.yAxis.name
  )?.value;

  return (
    <div className={styles["main"]}>
      <table className={styles["variations-table"]}>
        <thead>
          <tr>
            <td></td>
            {wooCommerceAttributes.xAxis.values.map((val) => (
              <td
                key={val.slug}
                className={
                  highlightedXAxisValue === val.slug
                    ? styles["highlighted-cell"]
                    : undefined
                }
              >
                {val.displayName}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {wooCommerceAttributes.yAxis.values.map((yAxisVal) => (
            <tr key={yAxisVal.slug}>
              <td
                className={
                  highlightedYAxisValue === yAxisVal.slug
                    ? styles["highlighted-cell"]
                    : undefined
                }
              >
                {yAxisVal.displayName}
              </td>
              {wooCommerceAttributes.xAxis.values.map((xAxisVal) => {
                const variation = product.variations.find((variation) => {
                  const xAxisAttributeValue = getVariationAttributeValue(
                    variation,
                    wooCommerceAttributes.xAxis.name
                  );
                  const yAxisAttributeValue = getVariationAttributeValue(
                    variation,
                    wooCommerceAttributes.yAxis.name
                  );
                  return (
                    xAxisAttributeValue === xAxisVal.slug &&
                    yAxisAttributeValue === yAxisVal.slug
                  );
                });
                const state = cellStates.find(
                  (state) => state.variation.id === variation?.id
                );
                return (
                  <td key={xAxisVal.slug}>
                    {variation && (
                      <ProductVariationCell
                        uniqueName={`quantity-${xAxisVal.displayName}-${yAxisVal.displayName}`}
                        variation={variation}
                        quantity={state?.quantity || 0}
                        onChange={onChangeCell}
                        onMouseEnter={(variation) =>
                          setHighlightedVariation(variation)
                        }
                      />
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div>{totalItems} total items</div>
      <div>${totalPrice.toFixed(2)} total</div>
    </div>
  );
}
