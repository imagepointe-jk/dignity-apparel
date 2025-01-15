import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { TabContent as TabContentComponent } from "@/components/sections/TabContent/TabContent";
import { getBrandColor } from "@/utility/prismic";

/**
 * Props for `TabContent`.
 */
export type TabContentProps = SliceComponentProps<Content.TabContentSlice>;

/**
 * Component for "TabContent" Slices.
 */
const TabContent = async ({ slice }: TabContentProps): Promise<JSX.Element> => {
  const {
    slice_id,
    content_color,
    heading,
    sections,
    tab_background_color,
    tiling_background,
  } = slice.primary;
  const tabBgColor = await getBrandColor(tab_background_color);
  const sectionsConverted = sections.map((section) => ({
    title: <PrismicRichText field={section.title} />,
    body: <PrismicRichText field={section.body} />,
  }));

  return (
    <TabContentComponent
      id={slice_id}
      contentColor={content_color === "Normal" ? "normal" : "white"}
      heading={<PrismicRichText field={heading} />}
      sections={sectionsConverted}
      tabBgColor={tabBgColor}
      tilingBackground={{ src: tiling_background.url }}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    />
  );
};

export default TabContent;
