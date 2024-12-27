import { createClient } from "@/prismicio";

export async function getAnnouncementBanner() {
  const client = createClient();
  return client.getSingle("announcement_banner");
}

export async function getMegaMenu() {
  const client = createClient();
  return client.getSingle("settings", {
    graphQuery: `
      {
        settings {
          logo_main_image
          logo_text_image
          special_link
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
                        hover_text
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

export async function getFooter() {
  const client = createClient();
  return client.getSingle("settings", {
    graphQuery: `
    {
      settings {
        footer_sections {
          section {
            ...on footer_section {
              title
              links
            }
          }
        }
        footer_icon_links
        footer_home_link_image
      }
    }
    `,
  });
}

export async function getButtonStyle(id: string) {
  const client = createClient();
  return client.getByID(id, {
    graphQuery: `
    {
      button_style {
        primary_color {
          color
        }
        secondary_color {
          color
        }
        hover_primary_color {
          color
        }
        hover_secondary_color {
          color
        }
        disabled_primary_color {
          color
        }
        disabled_secondary_color {
          color
        }
        type
        extra_padding
      }
    }
    `,
  });
}

export async function getStaffStories() {
  const client = createClient();
  return client.getAllByType("staff_story");
}

export async function getStaffStoryByUID(uid: string) {
  const client = createClient();
  return client.getByUID("staff_story", uid);
}
