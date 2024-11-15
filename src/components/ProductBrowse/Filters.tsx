import { env } from "@/envClient";
import { Category } from "@/types/schema/woocommerce";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Props = {
  categories: Category[];
};
export function Filters({ categories }: Props) {
  const searchParams = useSearchParams();

  function createFilterLinkUrl(slug: string) {
    const newParams = new URLSearchParams(searchParams);
    if (newParams.get("category") !== slug) newParams.set("category", slug);
    else newParams.delete("category");
    return `${env.NEXT_PUBLIC_BASE_URL}/products?${newParams.toString()}`;
  }

  return (
    <div>
      <ul>
        {categories.map((cat) => {
          const isActive = searchParams.get("category") === cat.slug;
          return (
            <li key={cat.id}>
              <Link
                href={createFilterLinkUrl(cat.slug)}
                style={{ fontWeight: isActive ? "bold" : undefined }}
              >
                {cat.name}
              </Link>
              {cat.subcategories.length > 0 && (
                <ul>
                  {cat.subcategories.map((sub) => {
                    const isActive = searchParams.get("category") === sub.slug;
                    return (
                      <li key={sub.id}>
                        <Link
                          href={createFilterLinkUrl(sub.slug)}
                          style={{ fontWeight: isActive ? "bold" : undefined }}
                        >
                          {sub.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
