import { Category } from "@/types/schema/woocommerce";

type Props = {
  categories: Category[];
};
export function Filters({ categories }: Props) {
  return (
    <div>
      <ul>
        {categories.map((cat) => (
          <li key={cat.id}>
            {cat.name}
            {cat.subcategories.length > 0 && (
              <ul>
                {cat.subcategories.map((sub) => (
                  <li key={sub.id}>{sub.name}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
