import { CartItem } from "@/types/schema/woocommerce";
import styles from "@/styles/CartArea/CartRow.module.css";
import { FlexibleImage } from "@/components/global/FlexibleImage/FlexibleImage";
import { IMAGE_NOT_FOUND_URL } from "@/constants";
import { getColorDisplayName, getSizeDisplayName } from "@/utility/products";

type Props = {
  item: CartItem;
  onChangeItemQuantity: (itemKey: string, newQuantity: number) => void;
};
export function CartRow({ item, onChangeItemQuantity }: Props) {
  const color = getColorDisplayName(
    item.variation.attributes.find((attr) => attr.name === "pa_color")?.value ||
      ""
  );
  const size = getSizeDisplayName(
    item.variation.attributes.find((attr) => attr.name === "pa_size")?.value ||
      ""
  );
  const readableName = `${item.product.name} ${size} ${color}`;

  return (
    <div className={styles["main"]}>
      <FlexibleImage
        src={item.variation.image?.guid || IMAGE_NOT_FOUND_URL}
        behavior="contain"
        containerClassName={styles["img-container"]}
        alt={readableName}
      />
      <div>
        <div>{item.product.name}</div>
        {color && <div>Color: {color}</div>}
        {size && <div>Size: {size}</div>}
      </div>
      <div>
        <label htmlFor={`${item.key}-quantity`}>Quantity:</label>
        <input
          type="number"
          name={`${item.key}-quantity`}
          id={`${item.key}-quantity`}
          className={styles["quantity-field"]}
          value={item.quantity}
          min={1}
          onChange={(e) =>
            onChangeItemQuantity(
              item.key,
              +e.target.value.replace(/[^\d]/g, "")
            )
          }
        />
      </div>
      <div>Subtotal: {item.subtotal}</div>
    </div>
  );
}
