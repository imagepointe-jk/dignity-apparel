import {
  LinkAsButton,
  LinkAsButtonData,
} from "@/components/global/LinkAsButton/LinkAsButton";
import styles from "@/styles/sections/Buttons.module.css";
import { WithTilingBackground } from "@/types/schema/misc";
import { bgImage } from "@/utility/misc";

type Props = {
  buttons: LinkAsButtonData[];
} & WithTilingBackground;
export function Buttons({ buttons, tilingBackground, ...rest }: Props) {
  return (
    <section style={{ ...bgImage(tilingBackground?.src) }} {...rest}>
      <div className={styles["main"]}>
        {buttons.map((button, i) => (
          <LinkAsButton key={i} data={button} />
        ))}
      </div>
    </section>
  );
}
