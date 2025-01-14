import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `CodeBlock`.
 */
export type CodeBlockProps = SliceComponentProps<Content.CodeBlockSlice>;

/**
 * Component for "CodeBlock" Slices.
 */
const CodeBlock = ({ slice }: CodeBlockProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {slice.primary.code && (
        <div
          style={{ margin: "30px 0" }}
          dangerouslySetInnerHTML={{ __html: slice.primary.code }} //A raw code block was requested. It's up to editors to only paste good code.
        ></div>
      )}
    </section>
  );
};

export default CodeBlock;
