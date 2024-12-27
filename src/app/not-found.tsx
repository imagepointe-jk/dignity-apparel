import { getFooter } from "@/fetch/prismic/prismic";
import { NotFound as NotFoundComponent } from "@/components/NotFound/NotFound";
import { validateFooterResponse } from "@/types/validation/prismic/validation";

export default async function NotFound() {
  const response = await getFooter();
  const parsed = validateFooterResponse(response);

  return <NotFoundComponent data={parsed} />;
}
