import Dialog from "@/components/global/Dialog/Dialog";
import { useRef } from "react";
import styles from "@/styles/ProductBrowse/Filters.module.css";
import { FilterProps, Filters } from "./Filters";
import { Filters as FiltersIcon } from "@/components/icons/Filters";

export function FiltersMobile({ attributes, categories }: FilterProps) {
  const dialogRef = useRef(null as HTMLDialogElement | null);

  function toggleDialog() {
    if (!dialogRef.current) return;

    if (dialogRef.current.hasAttribute("open")) {
      dialogRef.current.close();
    } else {
      dialogRef.current.showModal();
    }
  }

  return (
    <>
      <button className={styles["filter-modal-button"]} onClick={toggleDialog}>
        Product Filters
        <FiltersIcon size={15} className={styles["mobile-filters-icon"]} />{" "}
      </button>
      <Dialog
        toggleDialog={toggleDialog}
        ref={dialogRef}
        showCloseButton={true}
        className={styles["modal"]}
        closeButtonClassName={styles["mobile-close-x"]}
      >
        <Filters
          attributes={attributes}
          categories={categories}
          mode={"modal"}
        />
      </Dialog>
    </>
  );
}
