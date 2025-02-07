import { ProductVariation } from "@/types/schema/woocommerce";

type Props = {
  variation: ProductVariation;
  uniqueName: string;
  quantity: number;
  onChange: (variation: ProductVariation, inputValue: string) => void;
  onMouseEnter?: (variation: ProductVariation) => void;
};
export function ProductVariationCell({
  variation,
  uniqueName,
  quantity,
  onChange,
  onMouseEnter,
}: Props) {
  return (
    <div
      onMouseEnter={() => {
        if (onMouseEnter) onMouseEnter(variation);
      }}
    >
      <input
        type="number"
        name={uniqueName}
        id={uniqueName}
        aria-label={uniqueName}
        min={0}
        max={variation.stockQuantity || undefined}
        value={quantity}
        onChange={(e) => onChange(variation, e.target.value)}
      />
      <div style={{ fontSize: "0.625rem" }}>
        <div>{variation.stockQuantity} in stock</div>
        <div>{variation.price} ea.</div>
      </div>
    </div>
  );
}
