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
  const slice_id = slice.primary.slice_id;
  return (
    <section
      id={slice_id ? slice_id : undefined}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {slice.primary.code && (
        <div
          style={{ padding: "10px 10px" }}
          dangerouslySetInnerHTML={{ __html: slice.primary.code }} //A raw code block was requested. It's up to editors to only paste good code.
        ></div>
      )}
    </section>
  );
};

export default CodeBlock;
