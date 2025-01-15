import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { ValueChain as ValueChainComponent } from "@/components/sections/ValueChain/ValueChain";

/**
 * Props for `ValueChain`.
 */
export type ValueChainProps = SliceComponentProps<Content.ValueChainSlice>;

/**
 * Component for "ValueChain" Slices.
 */
const ValueChain = ({ slice }: ValueChainProps): JSX.Element => {
  //this component is hard-coded and is only available as a slice for potential reuse across Prismic pages.
  const { slice_id } = slice.primary;
  return <ValueChainComponent id={slice_id} />;
};

export default ValueChain;
