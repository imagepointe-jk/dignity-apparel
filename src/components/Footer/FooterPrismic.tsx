import { getFooter } from "@/fetch/prismic/prismic";
import { Footer } from "./Footer";
import { validateFooterResponse } from "@/types/validation/prismic/validation";

export default async function FooterPrismic() {
  const response = await getFooter();
  const parsed = validateFooterResponse(response);

  return <Footer data={parsed} />;
}
