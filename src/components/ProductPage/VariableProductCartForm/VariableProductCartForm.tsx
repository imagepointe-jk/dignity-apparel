import { Product, ProductVariation } from "@/types/schema/woocommerce";
import styles from "@/styles/ProductPage/VariableProductCartForm.module.css";
import { ProductVariationCell } from "./ProductVariationCell";
import { getVariationAttributeValue } from "@/utility/products";
import { clamp } from "@/utility/misc";
import { useImmer } from "use-immer";
import { useState } from "react";
import { addToCart } from "@/fetch/client/cart";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LoadingBar } from "@/components/global/LoadingBar/LoadingBar";

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
  const [status, setStatus] = useState(
    "idle" as "idle" | "loading" | "error" | "partial error"
  );
  const [loadingStatus, setLoadingStatus] = useState({ total: 0, complete: 0 });
  const router = useRouter();
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

  async function clickAddToCart() {
    if (nonEmptyCellStates.length === 0) return;

    setStatus("loading");
    try {
      const variationCount = nonEmptyCellStates.length;
      //? WooGraphQL doesn't appear to handle concurrent addToCart mutations correctly. using the slow way until a better way is found.
      for (let i = 0; i < variationCount; i++) {
        const state = nonEmptyCellStates[i];
        if (!state) continue;

        setLoadingStatus({
          total: variationCount,
          complete: i,
        });
        // setLoadingMessage(
        //   `Adding ${variationCount} product variation(s) to cart...(${i + 1} of ${variationCount})`
        // );
        const response = await addToCart(
          product.id,
          state.variation.id,
          state.quantity
        );
        if (!response.ok)
          throw new Error(`Failed to add variation ${state.variation.name}`);
      }
      router.push(`${window.location.origin}/my-account/cart`);
      // const results = await Promise.allSettled(
      //   nonEmptyCellStates.map(async (state) => {
      //     const response = await addToCart(
      //       product.id,
      //       state.variation.id,
      //       state.quantity
      //     );
      //     if (!response.ok)
      //       throw new Error(`Failed to add variation ${state.variation.name}`);
      //     return response;
      //   })
      // );
      // const failures = results.filter((result) => result.status === "rejected");
      // if (failures.length === nonEmptyCellStates.length) {
      //   setStatus("error");
      //   console.error("No variations were successfully added");
      // } else if (failures.length > 0) {
      //   setStatus("partial error");
      //   console.error(
      //     `Failed to add ${failures.length} of ${nonEmptyCellStates.length} variations`
      //   );
      // } else {
      //   router.push(`${window.location.origin}/my-account/cart`);
      // }
    } catch (error) {
      setStatus("error");
      console.error(error);
    }
  }

  const nonEmptyCellStates = cellStates.filter((state) => state.quantity > 0);
  const allowAddToCart = nonEmptyCellStates.length > 0;
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
      <div>
        {status === "idle" && (
          <button disabled={!allowAddToCart} onClick={clickAddToCart}>
            Add to Cart
          </button>
        )}
        {status === "loading" && (
          <>
            Adding {loadingStatus.total} product variations to cart...(
            {loadingStatus.complete + 1} out of {loadingStatus.total})
            <LoadingBar
              progress={loadingStatus.complete / loadingStatus.total}
            />
          </>
        )}
        {status === "error" && (
          <>
            Some items could not be added. Please{" "}
            <Link href="/my-account/cart">review your cart</Link> carefully and
            try again as needed.
          </>
        )}
      </div>
    </div>
  );
}
