"use client";

import { IMAGE_NOT_FOUND_URL } from "@/constants";
import { Product } from "@/types/schema/woocommerce";
import {
  abbreviateSize,
  getColorStockAmounts,
  getSwatchesWithImages,
  isSizedProduct,
} from "@/utility/products";
import { Suspense, useEffect, useState } from "react";
import styles from "@/styles/ProductPage/ProductPage.module.css";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FlagDA } from "../icons/FlagDA";
import { ExpandableDiv } from "../global/ExpandableDiv/ExpandableDiv";
import { Recommendations } from "./Recommendations";
import { env } from "@/envClient";
import { FlexibleImage } from "../global/FlexibleImage/FlexibleImage";

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
  const smallestSize = sizeStocks[0]
    ? abbreviateSize(sizeStocks[0].size)
    : "UNKNOWN SIZE";
  const largestSize = sizeStocks[sizeStocks.length - 1]?.size || "UNKNOWN SIZE";
  const image1Url = product.imageUrl;
  const image2Url = viewedSwatch?.productImageUrl || IMAGE_NOT_FOUND_URL;

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
        <div className={styles["mobile-heading"]}>{product.name}</div>
        <div className={styles["images-container"]}>
          <FlexibleImage
            src={image1Url}
            alt={product.name}
            containerClassName={styles["product-img-container"]}
            behavior={"contain"}
          />
          {image2Url !== image1Url && (
            <FlexibleImage
              src={image2Url}
              alt={product.name}
              containerClassName={styles["product-img-container"]}
              behavior={"contain"}
            />
          )}
        </div>
        <div className={styles["info-container"]}>
          <div>
            <h1 className="metropolis-24">{product.name}</h1>
            <div
              className="metropolis-16"
              dangerouslySetInnerHTML={{
                __html: product.shortDescriptionSanitized,
              }}
            ></div>
          </div>
          <div
            className={`${styles["info-subcontainer"]} ${styles["swatches-container"]}`}
          >
            <div>
              <span className="bold">Color: </span>
              <span className={`${styles["swatch-color-text"]} metropolis-16`}>
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
                      aria-label={`garment color ${item.name}`}
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
          {isSizedProduct(product) && (
            <div className={styles["info-subcontainer"]}>
              <div className="bold">Sizes</div>
              <div className="metropolis-16">
                {`Available In Sizes ${smallestSize.toLocaleUpperCase()} to ${largestSize.toLocaleUpperCase()}`}
              </div>
            </div>
          )}
          <div>
            <Link
              href={
                product.additionalProductSettings.linkURLOverride ||
                product.link
              }
              className={styles["purchase-link"]}
            >
              {product.additionalProductSettings.linkTextOverride ||
                "Login to Purchase"}
            </Link>
          </div>
          <div className={styles["usa-container"]}>
            <div>
              <FlagDA size={35} />
            </div>
            <div>
              <div className={styles["usa-heading"]}>UNION-MADE IN THE USA</div>
              <p className={styles["usa-body"]}>
                Born, Built, and Sewn in the USA.
                <Link
                  href={`${env.NEXT_PUBLIC_BASE_URL}/usa-responsible-clothing-manufacturing`}
                >
                  Learn More
                </Link>
              </p>
            </div>
          </div>
          <div className={styles["expandables"]}>
            <ExpandableDiv
              label="Product Description"
              labelClassName={styles["expandable-label"]}
              content={
                <div
                  className="metropolis-16"
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
                <div className="metropolis-16">
                  {product.additionalProductInformation.materialDescription}
                </div>
              }
            />
            <ExpandableDiv
              label="Care Information"
              labelClassName={styles["expandable-label"]}
              content={
                <div
                  className="metropolis-16"
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
      <Recommendations
        categorySlug={product.categories[0]?.slug || ""}
        excludeSkus={[product.sku]}
      />
    </>
  );
}
