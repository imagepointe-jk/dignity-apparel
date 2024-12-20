"use client";
import styles from "@/styles/NavBar/desktop.module.css";
import stylesSearch from "@/styles/QuickSearch/QuickSearch.module.css";
import { ReactNode, Suspense, useEffect, useRef, useState } from "react";
import throttle from "lodash.throttle";
import { TopBanner } from "./TopBanner";
import { MegaMenuDesktop } from "./MegaMenuDesktop";
import { MegaMenuMobile } from "./MegaMenuMobile";
import { MegaMenu } from "@/types/schema/navbar";
import { MagnifyingGlass } from "../icons/MagnifyingGlass";
import Dialog from "../global/Dialog/Dialog";
import { QuickSearch } from "../QuickSearch/QuickSearch";
import { env } from "@/envClient";
import { Person } from "../icons/Person";

const topOfPageThreshold = 200; //when the value of window.scrollY is less than this, we consider that to be the "top of the page"
type Props = {
  announcementBanner?: {
    bodyNode: ReactNode;
    link?: {
      href: string;
      label: string;
    };
  };
  megaMenu: MegaMenu;
  specialLink?: {
    text: string;
    href: string;
  };
  logoImgUrls: {
    logo: string;
    text: string;
  };
};
export function NavBar({
  announcementBanner,
  megaMenu,
  logoImgUrls,
  specialLink,
}: Props) {
  return (
    <Suspense>
      <NavBarWrapped
        announcementBanner={announcementBanner}
        logoImgUrls={logoImgUrls}
        megaMenu={megaMenu}
        specialLink={specialLink}
      />
    </Suspense>
  );
}

function NavBarWrapped({
  announcementBanner,
  megaMenu,
  logoImgUrls: { logo, text },
  specialLink,
}: Props) {
  const [expandedIndex, setExpandedIndex] = useState(null as number | null);
  const [mobileMenuExpanded, setMobileMenuExpanded] = useState(false);
  const [atTopOfPage, setAtTopOfPage] = useState(true);
  const dialogRef = useRef(null as HTMLDialogElement | null);

  function toggleDialog() {
    if (!dialogRef.current) return;

    if (dialogRef.current.hasAttribute("open")) {
      dialogRef.current.close();
    } else {
      dialogRef.current.showModal();
    }
  }

  function onFocusTopLevel(focusedIndex: number) {
    if (focusedIndex !== expandedIndex) setExpandedIndex(null);
  }

  function onClickHamburger() {
    setMobileMenuExpanded(!mobileMenuExpanded);
  }

  useEffect(() => {
    const handleScroll = throttle(() => {
      const atTop = window.scrollY < topOfPageThreshold;
      setAtTopOfPage(atTop);
    }, 200);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className={styles["nav-container"]}>
        {announcementBanner && (
          <TopBanner
            hidden={!atTopOfPage}
            bodyNode={announcementBanner.bodyNode}
            link={announcementBanner.link}
            bgColorHexCode="0E2C63"
            textColorHexCode="ffffff"
          />
        )}
        <div className={styles["nav-background-bar"]}>
          <div className="x-wide-container">
            <nav
              aria-label="Main"
              className={`${styles["main"]} ${
                !atTopOfPage ? styles["compressed"] : ""
              }`}
            >
              <button
                className={styles["hamburger-button"]}
                onClick={onClickHamburger}
              >
                ☰
              </button>
              <a
                href={env.NEXT_PUBLIC_BASE_URL}
                className={styles["da-home-link"]}
              >
                <img
                  src={logo}
                  alt="Dignity Apparel Home"
                  className={styles["da-logo-main"]}
                />
                <img src={text} className={styles["da-logo-text"]} />
              </a>
              <div className={styles["buttons-container-right"]}>
                <MegaMenuDesktop
                  data={megaMenu}
                  expandedIndex={expandedIndex}
                  onFocusTopLevel={onFocusTopLevel}
                  setExpandedIndex={setExpandedIndex}
                  specialLink={specialLink}
                />
                <div className={styles["far-right-buttons"]}>
                  <button
                    className={styles["button"]}
                    onClick={toggleDialog}
                    aria-label="Search"
                  >
                    <MagnifyingGlass size={28} />
                  </button>
                  <a
                    href="https://dawholesale.unionwebstores.com/my-account"
                    className={styles["my-account-button"]}
                  >
                    <span
                      style={{
                        width: 0,
                        height: 0,
                        overflow: "hidden",
                        display: "block",
                      }}
                    >
                      My Account
                    </span>
                    <Person size={28} />
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>
        <MegaMenuMobile
          data={megaMenu}
          menuExpanded={mobileMenuExpanded}
          closeFn={() => setMobileMenuExpanded(false)}
          specialLink={specialLink}
        />
      </div>
      <Dialog
        ref={dialogRef}
        toggleDialog={toggleDialog}
        className={stylesSearch["dialog"]}
        showCloseButton={false}
      >
        <QuickSearch toggleDialog={toggleDialog} />
      </Dialog>
    </>
  );
}
