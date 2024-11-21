//Adapted from Coding In Public
//https://github.com/coding-in-public/react-dialog-walkthrough/blob/main/src/components/Dialog.tsx
import { forwardRef, useEffect } from "react";
import styles from "@/styles/global/Dialog.module.css";
import { XMark } from "@/components/icons/XMark";
import { usePathname, useSearchParams } from "next/navigation";

type Props = {
  className?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  toggleDialog: () => void;
};

const Dialog = forwardRef<HTMLDialogElement, Props>(
  ({ children, className, toggleDialog, showCloseButton }, ref) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
      //@ts-expect-error: "current" does not exist
      if (ref?.current.hasAttribute("open")) {
        toggleDialog();
      }
    }, [pathname, searchParams]);

    return (
      <dialog
        ref={ref}
        className={`${styles["main"]} ${className || ""}`}
        onClick={(e) => {
          if (e.currentTarget === e.target) {
            toggleDialog();
          }
        }}
      >
        <div>
          {children}
          {showCloseButton !== false && (
            <button className={styles["x"]} onClick={toggleDialog}>
              <XMark />
            </button>
          )}
        </div>
      </dialog>
    );
  }
);
Dialog.displayName = "Dialog";
export default Dialog;
