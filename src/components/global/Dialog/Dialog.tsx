//Adapted from Coding In Public
//https://github.com/coding-in-public/react-dialog-walkthrough/blob/main/src/components/Dialog.tsx
import { forwardRef } from "react";
import styles from "@/styles/global/Dialog.module.css";
import { XMark } from "@/components/icons/XMark";

type Props = {
  className?: string;
  children: React.ReactNode;
  toggleDialog: () => void;
};

const Dialog = forwardRef<HTMLDialogElement, Props>(
  ({ children, className, toggleDialog }, ref) => {
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
          <button className={styles["x"]} onClick={toggleDialog}>
            <XMark />
          </button>
        </div>
      </dialog>
    );
  }
);
Dialog.displayName = "Dialog";
export default Dialog;
