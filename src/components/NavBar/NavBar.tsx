"use client";
import styles from "@/styles/NavBar/desktop.module.css";
import stylesSearch from "@/styles/QuickSearch/QuickSearch.module.css";
import stylesMobile from "@/styles/NavBar/mobile.module.css";
import {
  MutableRefObject,
  ReactNode,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import throttle from "lodash.throttle";
import { TopBanner } from "./TopBanner";
import { MegaMenuDesktop } from "./MegaMenuDesktop";
import { MegaMenuMobile } from "./MegaMenuMobile";
import { MegaMenu } from "@/types/schema/navbar";
import { MagnifyingGlass } from "../icons/MagnifyingGlass";
import Dialog from "../global/Dialog/Dialog";
import { QuickSearch } from "../QuickSearch/QuickSearch";
import { Person } from "../icons/Person";
import { Cart } from "../icons/Cart";
import Link from "next/link";

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
  const searchDialogRef = useRef(null as HTMLDialogElement | null);
  const mobileNavDialogRef = useRef(null as HTMLDialogElement | null);

  function toggleDialog(ref: MutableRefObject<HTMLDialogElement | null>) {
    if (!ref.current) return;

    if (ref.current.hasAttribute("open")) {
      ref.current.close();
    } else {
      ref.current.showModal();
    }
  }

  function toggleSearchDialog() {
    toggleDialog(searchDialogRef);
  }

  function toggleMobileNavDialog() {
    toggleDialog(mobileNavDialogRef);
  }

  function onFocusTopLevel(focusedIndex: number) {
    if (focusedIndex !== expandedIndex) setExpandedIndex(null);
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
                onClick={toggleMobileNavDialog}
                aria-label="open navigation"
                aria-expanded={mobileMenuExpanded}
                aria-controls="nav-mobile"
              >
                ☰
              </button>
              <Link href="/" className={styles["da-home-link"]}>
                <img
                  src={logo}
                  alt="Dignity Apparel Home"
                  className={styles["da-logo-main"]}
                />
                <img src={text} className={styles["da-logo-text"]} />
              </Link>
              <div className={styles["buttons-container-right"]}>
                <MegaMenuDesktop
                  data={megaMenu}
                  expandedIndex={expandedIndex}
                  onFocusTopLevel={onFocusTopLevel}
                  setExpandedIndex={setExpandedIndex}
                  specialLink={specialLink}
                />
                <div className={styles["far-right-buttons"]}>
                  <a
                    href="https://wholesale.dignityapparel.com/cart"
                    className={styles["cart-button"]}
                    aria-label="cart"
                  >
                    <Cart size={28} />
                  </a>
                  <button
                    className={styles["button"]}
                    onClick={toggleSearchDialog}
                    aria-label="Search"
                  >
                    <MagnifyingGlass size={28} />
                  </button>
                  <a
                    href="https://wholesale.dignityapparel.com/my-account"
                    className={styles["my-account-button"]}
                    aria-label="my account"
                  >
                    <Person size={28} />
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <Dialog
        ref={searchDialogRef}
        toggleDialog={toggleSearchDialog}
        className={stylesSearch["dialog"]}
        showCloseButton={false}
      >
        <QuickSearch toggleDialog={toggleSearchDialog} />
      </Dialog>
      <Dialog
        ref={mobileNavDialogRef}
        toggleDialog={toggleMobileNavDialog}
        className={stylesMobile["dialog"]}
        closeButtonClassName={stylesMobile["close-x"]}
        closeButtonAriaLabel="close navigation"
        closeButtonSize={32}
      >
        <MegaMenuMobile
          data={megaMenu}
          closeFn={() => setMobileMenuExpanded(false)}
          specialLink={specialLink}
          toggleSearchDialog={toggleSearchDialog}
        />
      </Dialog>
    </>
  );
}
