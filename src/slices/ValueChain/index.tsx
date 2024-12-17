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
const ValueChain = (): JSX.Element => {
  //this component is hard-coded and is only available as a slice for potential reuse across Prismic pages.
  return <ValueChainComponent />;
};

export default ValueChain;
