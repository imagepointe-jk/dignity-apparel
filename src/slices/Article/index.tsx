import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Article as ArticleComponent } from "@/components/sections/Article/Article";

import type { JSX } from "react";

/**
 * Props for `Article`.
 */
export type ArticleProps = SliceComponentProps<Content.ArticleSlice>;

/**
 * Component for "Article" Slices.
 */
const Article = ({ slice }: ArticleProps): JSX.Element => {
  const { slice_id, body, heading, subheading } = slice.primary;

  return (
    <ArticleComponent
      id={slice_id}
      heading={<PrismicRichText field={heading} />}
      subheading={<PrismicRichText field={subheading} />}
      body={<PrismicRichText field={body} />}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    />
  );
};

export default Article;
