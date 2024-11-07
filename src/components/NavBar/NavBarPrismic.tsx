import { getMegaMenu } from "@/fetch/prismic/prismic";
import { NavBar } from "./NavBar";
import { validateMegaMenuResponse } from "@/types/validation/prismic/validation";

export async function NavBarPrismic() {
  const megaMenuResponse = await getMegaMenu();
  const parsed = validateMegaMenuResponse(megaMenuResponse);

  return <NavBar data={parsed} />;
}
