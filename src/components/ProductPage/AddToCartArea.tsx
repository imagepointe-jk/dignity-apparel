import { Product } from "@/types/schema/woocommerce";
import { useEffect, useState } from "react";
import { LoadingIndicator } from "../global/LoadingIndicator/LoadingIndicator";
import { getGlobalAttributeTerms } from "@/utility/products";
import styles from "@/styles/ProductPage/ProductPage.module.css";
import Link from "next/link";
import { getCurrentCustomer } from "@/fetch/client/customers";

type Props = {
  product: Product;
};
export function AddToCartArea({ product }: Props) {
  const [loggedInStatus, setLoggedInStatus] = useState(
    "checking" as "checking" | "yes" | "no"
  );
  const isMTO = getGlobalAttributeTerms(product, "pa_availability").includes(
    "made-to-order"
  );

  async function checkLoggedInStatus() {
    try {
      const customerResponse = await getCurrentCustomer();
      if (!customerResponse.ok)
        throw new Error(
          `Failed to verify active customer: response ${customerResponse.status}`
        );

      setLoggedInStatus("yes");
    } catch (error) {
      console.error(error);
      setLoggedInStatus("no");
    }
  }

  useEffect(() => {
    if (!isMTO) checkLoggedInStatus();
  }, []);

  //Show the "Get a Quote" link if this is MTO; no auth required
  if (isMTO)
    return (
      <div>
        <Link href="/quote" className={styles["purchase-link"]}>
          Get a Quote
        </Link>
      </div>
    );

  //Show the loading indicator while we're checking for logged-in status
  if (loggedInStatus === "checking") {
    return (
      <div>
        <LoadingIndicator />
      </div>
    );
  }

  //If we get here, the product is not MTO, so the only thing to display is a login link that will redirect us back here afterward
  if (loggedInStatus === "no") {
    return (
      <div>
        <Link
          href={`/login?redirect_to=${encodeURIComponent(window.location.href)}`}
          className={styles["purchase-link"]}
        >
          Login to Purchase
        </Link>
      </div>
    );
  }

  //if we get here, the user is logged in, so show the interface for adding things to cart
  return <div>Add to cart area</div>;
}
