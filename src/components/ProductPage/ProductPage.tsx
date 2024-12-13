"use client";

import { IMAGE_NOT_FOUND_URL } from "@/constants";
import { Product } from "@/types/schema/woocommerce";
import {
  getColorStockAmounts,
  getSwatchesWithImages,
} from "@/utility/products";
import { Suspense, useEffect, useState } from "react";
import styles from "@/styles/ProductPage/ProductPage.module.css";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ContainedImage } from "../global/ContainedImage/ContainedImage";
import { FlagDA } from "../icons/FlagDA";
import { ExpandableDiv } from "../global/ExpandableDiv/ExpandableDiv";
import { Recommendations } from "./Recommendations";

type Props = {
  product: Product;
};
export function ProductPage({ product }: Props) {
  return (
    <Suspense>
      <ProductPageWrapped product={product} />
    </Suspense>
  );
}

function ProductPageWrapped({ product }: Props) {
  const [viewedVariationId, setViewedVariationId] = useState(
    null as number | null
  );
  const viewedVariationIdToUse =
    viewedVariationId === null
      ? product.variations[0]?.id || null
      : viewedVariationId;
  const swatchesWithImages = getSwatchesWithImages(product);
  const viewedSwatch = swatchesWithImages.find(
    (swatch) => swatch.variationId === viewedVariationIdToUse
  );
  const searchParams = useSearchParams();
  const sizeStocks = getColorStockAmounts(product, viewedSwatch?.name || "");
  const smallestSize = sizeStocks[0];
  const largestSize = sizeStocks[sizeStocks.length - 1];

  function onClickSwatch(clickedVariationId: number) {
    setViewedVariationId(clickedVariationId);
  }

  useEffect(() => {
    const variationIdParam = searchParams.get("variationId");
    const variationId = variationIdParam ? +variationIdParam : null;
    setViewedVariationId(variationId);
  }, []);

  return (
    <>
      <div className={`${styles["main"]} x-wide-container`}>
        <div className={styles["images-container"]}>
          <ContainedImage
            src={product.imageUrl}
            alt={product.name}
            containerClassName={styles["product-img-container"]}
          />
          <ContainedImage
            src={viewedSwatch?.productImageUrl || IMAGE_NOT_FOUND_URL}
            alt={product.name}
            containerClassName={styles["product-img-container"]}
          />
        </div>
        <div className={styles["info-container"]}>
          <div>
            <h1 className="subheader-1-medium">{product.name}</h1>
            <div
              className="body-1"
              dangerouslySetInnerHTML={{
                __html: product.shortDescriptionSanitized,
              }}
            ></div>
          </div>
          <div
            className={`${styles["info-subcontainer"]} ${styles["swatches-container"]}`}
          >
            <div>
              <span className="body-3-semi-bold">Color: </span>
              <span className={`${styles["swatch-color-text"]} body-1`}>
                {viewedSwatch?.displayName || "UNKNOWN COLOR"}
              </span>
            </div>
            <div>
              <ul className={styles["swatches"]}>
                {swatchesWithImages.map((item) => (
                  <li key={item.name}>
                    <button
                      key={item.name}
                      className={`${styles["swatch"]} ${viewedVariationIdToUse === item.variationId ? styles["selected"] : ""}`}
                      onClick={() => onClickSwatch(item.variationId)}
                      style={{
                        backgroundColor: item.swatchImageUrl
                          ? undefined
                          : `#${item.hexCode}`,
                        backgroundImage: item.swatchImageUrl
                          ? `url(${item.swatchImageUrl})`
                          : undefined,
                      }}
                    ></button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles["info-subcontainer"]}>
            <div className="body-3-semi-bold">Sizes</div>
            <div className="body-1">
              {`Available In Sizes ${smallestSize?.size.toLocaleUpperCase()} to ${largestSize?.size.toLocaleUpperCase()}`}
            </div>
          </div>
          <div>
            <Link href={""} className={styles["purchase-link"]}>
              Login to Purchase
            </Link>
          </div>
          <div className={styles["usa-container"]}>
            <div>
              <FlagDA size={35} />
            </div>
            <div>
              <div className={styles["usa-heading"]}>MADE IN THE USA</div>
              <p className={styles["usa-body"]}>
                Born, Built, and Sewn in the USA.
                <Link href={""}>Learn More</Link>
              </p>
            </div>
          </div>
          <div className={styles["expandables"]}>
            <ExpandableDiv
              label="Product Description"
              labelClassName={styles["expandable-label"]}
              content={
                <div
                  className="body-1"
                  dangerouslySetInnerHTML={{
                    __html: product.descriptionSanitized,
                  }}
                ></div>
              }
            />
            <ExpandableDiv
              label="Material"
              labelClassName={styles["expandable-label"]}
              content={
                <div className="body-1">
                  {product.additionalProductInformation.materialDescription}
                </div>
              }
            />
            <ExpandableDiv
              label="Care Information"
              labelClassName={styles["expandable-label"]}
              content={
                <div
                  className="body-1"
                  dangerouslySetInnerHTML={{
                    __html:
                      product.additionalProductInformation
                        .careInformationSanitized || "",
                  }}
                ></div>
              }
            />
          </div>
        </div>
      </div>
      <Recommendations categorySlug={product.categories[0]?.slug || ""} />
    </>
  );
}
