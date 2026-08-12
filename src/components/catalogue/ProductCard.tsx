"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

const FAVOURITES_KEY = "lazuli-favourites";

type FavouriteProduct = {
  id: string;
  variationId?: string;
  name: string;
  variationName?: string;
  price: number;
  currency?: string;
  imageUrl?: string;
};

export default function ProductCard({
  product,
}: ProductCardProps) {

  /*
   * =========================================
   * PRODUCT STATUS
   * =========================================
   */

  /*
   * Featured takes priority over Trending.
   */
  const badge = product.featured
    ? "POPULAR"
    : product.trending
      ? "TRENDING"
      : null;

  /*
   * =========================================
   * VARIATIONS
   * =========================================
   */

  /*
   * Determine whether this product has
   * multiple Square variations.
   */
  const hasVariations =
    product.variations &&
    product.variations.length > 1;

  /*
   * Number of variations available.
   */
  const variationCount =
    product.variations?.length ?? 0;

  /*
   * Show the first three variation images
   * on the product card.
   */
  const visibleVariations =
    product.variations?.slice(0, 3) ?? [];

  /*
   * Number of variations hidden behind
   * the +N indicator.
   */
  const remainingVariations =
    Math.max(
      variationCount -
        visibleVariations.length,
      0,
    );

  /*
   * Calculate the total stock across all
   * variations.
   */
  const totalVariationStock =
    product.variations?.reduce(
      (total, variation) =>
        total + variation.stock,
      0,
    ) ?? product.stock;

  const inStock =
    totalVariationStock > 0;

  /*
   * =========================================
   * FAVOURITE STATE
   * =========================================
   */

  const [isFavourite, setIsFavourite] =
    useState(false);

  /*
   * =========================================
   * CHECK FAVOURITE STATUS
   * =========================================
   */

  function checkFavouriteStatus() {
    try {
      const saved =
        localStorage.getItem(
          FAVOURITES_KEY,
        );

      if (!saved) {
        setIsFavourite(false);
        return;
      }

      const favourites: FavouriteProduct[] =
        JSON.parse(saved);

      if (!Array.isArray(favourites)) {
        setIsFavourite(false);
        return;
      }

      const productIsFavourite =
        favourites.some(
          (favourite) =>
            favourite?.id === product.id,
        );

      setIsFavourite(
        productIsFavourite,
      );
    } catch (error) {
      console.error(
        "Unable to load favourites:",
        error,
      );

      setIsFavourite(false);
    }
  }

  /*
   * =========================================
   * INITIAL LOAD
   * =========================================
   */

  useEffect(() => {
    checkFavouriteStatus();
  }, [product.id]);

  /*
   * =========================================
   * LISTEN FOR CHANGES
   * =========================================
   */

  useEffect(() => {
    function handleFavouritesUpdated() {
      checkFavouriteStatus();
    }

    window.addEventListener(
      "favourites-updated",
      handleFavouritesUpdated,
    );

    return () => {
      window.removeEventListener(
        "favourites-updated",
        handleFavouritesUpdated,
      );
    };
  }, [product.id]);

  /*
   * =========================================
   * TOGGLE FAVOURITE
   * =========================================
   */

  function toggleFavourite(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    /*
     * Prevent the heart button from opening
     * the product page.
     */
    event.preventDefault();
    event.stopPropagation();

    try {
      const saved =
        localStorage.getItem(
          FAVOURITES_KEY,
        );

      let favourites:
        FavouriteProduct[] = [];

      if (saved) {
        const parsed =
          JSON.parse(saved);

        if (Array.isArray(parsed)) {
          favourites = parsed;
        }
      }

      const alreadyFavourite =
        favourites.some(
          (favourite) =>
            favourite?.id === product.id,
        );

      let updatedFavourites:
        FavouriteProduct[];

      if (alreadyFavourite) {

        /*
         * Remove the product.
         */
        updatedFavourites =
          favourites.filter(
            (favourite) =>
              favourite?.id !==
              product.id,
          );

      } else {

        /*
         * Select the first variation that
         * currently has stock.
         */
        const selectedVariation =
          product.variations?.find(
            (variation) =>
              variation.stock > 0,
          ) ??
          product.variations?.[0];

        /*
         * Save the selected variation.
         */
        if (selectedVariation) {

          const favouriteProduct:
            FavouriteProduct = {
              id: product.id,
              variationId:
                selectedVariation.id,
              name: product.name,
              variationName:
                selectedVariation.name,
              price:
                selectedVariation.price,
              currency:
                selectedVariation.currency,
              imageUrl:
                selectedVariation.imageUrl ??
                product.imageUrl,
            };

          updatedFavourites = [
            ...favourites,
            favouriteProduct,
          ];

        } else {

          /*
           * Fallback for products without
           * variation information.
           */
          const favouriteProduct:
            FavouriteProduct = {
              id: product.id,
              name: product.name,
              price: product.price,
              currency:
                product.currency,
              imageUrl:
                product.imageUrl,
            };

          updatedFavourites = [
            ...favourites,
            favouriteProduct,
          ];
        }
      }

      /*
       * Save favourites.
       */
      localStorage.setItem(
        FAVOURITES_KEY,
        JSON.stringify(
          updatedFavourites,
        ),
      );

      /*
       * Update this card immediately.
       */
      setIsFavourite(
        !alreadyFavourite,
      );

      /*
       * Tell the rest of the application
       * that favourites have changed.
       */
      window.dispatchEvent(
        new Event(
          "favourites-updated",
        ),
      );

    } catch (error) {
      console.error(
        "Unable to update favourites:",
        error,
      );
    }
  }

  return (
    <Link
      href={`/catalogue/${product.id}`}
      className="group block min-w-0"
    >

      {/* =====================================
          PRODUCT IMAGE
      ====================================== */}

      <div className="relative aspect-[1/0.94] overflow-hidden bg-[#F5F3F7]">

        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-500
              ease-out
              group-hover:scale-[1.025]
            "
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-[8px] uppercase tracking-[0.18em] text-[#9A91A4]">
              No image
            </span>
          </div>
        )}

        {/* =================================
            FAVOURITE BUTTON
        ================================== */}

        <div className="absolute right-2.5 top-2.5">
          <button
            type="button"
            aria-label={
              isFavourite
                ? `Remove ${product.name} from favourites`
                : `Add ${product.name} to favourites`
            }
            aria-pressed={isFavourite}
            onClick={toggleFavourite}
            className="
              flex h-7 w-7
              items-center justify-center
              rounded-full
              bg-white/90
              shadow-sm
              backdrop-blur-sm
              transition-all
              duration-200
              hover:scale-105
            "
          >
            <Heart
              size={13}
              strokeWidth={1.5}
              className={
                isFavourite
                  ? "fill-[#6539B8] text-[#6539B8]"
                  : "text-[#68627A] transition-colors hover:text-[#6539B8]"
              }
            />
          </button>
        </div>

        {/* =================================
            PRODUCT BADGE
        ================================== */}

        {badge && (
          <div className="absolute left-2.5 top-2.5">
            <span
              className="
                rounded-[0.35rem]
                bg-[#6539B8]
                px-2
                py-1
                text-[7px]
                font-semibold
                uppercase
                tracking-[0.08em]
                text-white
              "
            >
              {badge}
            </span>
          </div>
        )}

        {/* =================================
            VARIATION COUNT
        ================================== */}

        {hasVariations && (
          <div className="absolute bottom-2.5 left-2.5">
            <span
              className="
                rounded-[0.35rem]
                bg-[#6539B8]/95
                px-2
                py-1
                text-[7px]
                font-semibold
                uppercase
                tracking-[0.08em]
                text-white
                shadow-sm
              "
            >
              {variationCount} variations
            </span>
          </div>
        )}

      </div>

      {/* =====================================
          PRODUCT INFORMATION
      ====================================== */}

      <div className="px-2.5 pb-3 pt-2.5">

        {/* Product name */}

        <h2
          className="
            truncate
            text-[11px]
            font-medium
            leading-4
            text-[#29205C]
            transition-colors
            group-hover:text-[#6539B8]
          "
        >
          {product.name}
        </h2>

        {/* =================================
            PRICE
        ================================== */}

        <p
          className="
            mt-0.5
            text-[11px]
            font-semibold
            text-[#29205C]
          "
        >
          {hasVariations
            ? "From "
            : ""}
          ${product.price.toFixed(2)}
        </p>

        {/* =================================
            STOCK STATUS
        ================================== */}

        <div className="mt-1.5 flex items-center gap-1.5">

          <span
            className={`
              h-1.5
              w-1.5
              shrink-0
              rounded-full
              ${
                inStock
                  ? "bg-[#58B89A]"
                  : "bg-[#B7B2BF]"
              }
            `}
          />

          <span
            className={`
              truncate
              text-[8px]
              ${
                inStock
                  ? "text-[#817A8F]"
                  : "text-[#9A91A4]"
              }
            `}
          >
            {inStock
              ? `${totalVariationStock} available`
              : "Out of stock"}
          </span>

        </div>

        {/* =================================
            VARIATION PREVIEWS
        ================================== */}

        {hasVariations && (
          <div className="mt-2.5 flex items-center gap-1.5">

            {visibleVariations.map(
              (variation) => (
                <div
                  key={variation.id}
                  title={variation.name}
                  className="
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-full
                    border
                    border-[#E5DFE9]
                    bg-[#F7F4F9]
                    shadow-sm
                    transition-all
                    duration-200
                    group-hover:border-[#CFC2DD]
                  "
                >
                  {variation.imageUrl ? (
                    <img
                      src={variation.imageUrl}
                      alt={variation.name}
                      className="
                        h-full
                        w-full
                        object-cover
                      "
                    />
                  ) : (
                    <span
                      className="
                        text-[7px]
                        font-medium
                        uppercase
                        text-[#817A8F]
                      "
                    >
                      {variation.name
                        ?.charAt(0)
                        .toUpperCase()}
                    </span>
                  )}
                </div>
              ),
            )}

            {/* Remaining variations */}

            {remainingVariations > 0 && (
              <div
                className="
                  flex
                  h-7
                  min-w-7
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#F0ECF4]
                  px-2
                  text-[8px]
                  font-medium
                  text-[#6E6678]
                  transition-colors
                  duration-200
                  group-hover:bg-[#E9E1F0]
                "
                title={`${remainingVariations} more variations`}
              >
                +{remainingVariations}
              </div>
            )}

          </div>
        )}

      </div>

    </Link>
  );
}