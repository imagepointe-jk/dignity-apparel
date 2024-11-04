import { createClient } from "@/prismicio";
import { inspect } from "util";

export async function NavBarPrismic() {
  const client = createClient();
  const response = await client.getSingle("settings", {
    graphQuery: `
    {
        navigation {
            mega_menu_item_link {
                ...on mega_menu_item {
                    label
                    url
                }
            }
        }
    }
    `,
  });
  console.log(inspect(response, false, null));

  return <></>;
}
