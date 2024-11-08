import { createClient } from "@/prismicio";

export async function getMegaMenu() {
  const client = createClient();
  return client.getSingle("settings", {
    graphQuery: `
      {
        settings {
          navigation {
            mega_menu_item {
              ...on mega_menu_item {
                label
                url
                sections {
                  section {
                    title
                    links
                  }
                }
                featured_images {
                    featured_image {
                        image
                        caption
                        link
                    }
                }
              }
            }
          }
        }
      }
      `,
  });
}