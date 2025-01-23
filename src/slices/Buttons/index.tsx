import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Buttons as ButtonsComponent } from "@/components/sections/Buttons/Buttons";
import { convertButton } from "@/utility/prismic";

import type { JSX } from "react";

/**
 * Props for `Buttons`.
 */
export type ButtonsProps = SliceComponentProps<Content.ButtonsSlice>;

/**
 * Component for "Buttons" Slices.
 */
const Buttons = async ({ slice }: ButtonsProps): Promise<JSX.Element> => {
  const { slice_id, buttons, tiling_background } = slice.primary;
  const convertedButtons = await Promise.all(
    buttons.map((button) =>
      convertButton({ link: button.link, button_style: button.button_style })
    )
  );

  return (
    <ButtonsComponent
      id={slice_id}
      buttons={convertedButtons}
      tilingBackground={{ src: tiling_background.url }}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    />
  );
};

export default Buttons;
