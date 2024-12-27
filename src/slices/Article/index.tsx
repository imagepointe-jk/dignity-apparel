import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Article as ArticleComponent } from "@/components/sections/Article/Article";

/**
 * Props for `Article`.
 */
export type ArticleProps = SliceComponentProps<Content.ArticleSlice>;

/**
 * Component for "Article" Slices.
 */
const Article = ({ slice }: ArticleProps): JSX.Element => {
  const { body, heading, subheading } = slice.primary;

  return (
    <ArticleComponent
      heading={<PrismicRichText field={heading} />}
      subheading={<PrismicRichText field={subheading} />}
      body={<PrismicRichText field={body} />}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    />
  );
};

export default Article;
