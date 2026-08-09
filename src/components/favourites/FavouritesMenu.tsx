"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

export type FavouriteProduct = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
};

type FavouritesMenuProps = {
  mobile?: boolean;
};

const FAVOURITES_KEY = "lazuli-favourites";

export default function FavouritesMenu({
  mobile = false,
}: FavouritesMenuProps) {
  const [open, setOpen] = useState(false);

  const [favourites, setFavourites] = useState<
    FavouriteProduct[]
  >([]);

  /*
   * =========================================
   * LOAD FAVOURITES
   * =========================================
   *
   * Read favourites from localStorage.
   *
   * The data is validated before being stored
   * in React state so malformed data cannot
   * break the menu.
   */
  function loadFavourites() {
    try {
      const saved =
        localStorage.getItem(FAVOURITES_KEY);

      if (!saved) {
        setFavourites([]);
        return;
      }

      const parsed: unknown = JSON.parse(saved);

      if (!Array.isArray(parsed)) {
        localStorage.removeItem(FAVOURITES_KEY);
        setFavourites([]);
        return;
      }

      /*
       * Only allow properly formatted favourite
       * products.
       */
      const validFavourites: FavouriteProduct[] =
        parsed
          .filter((product): product is FavouriteProduct => {
            if (
              !product ||
              typeof product !== "object"
            ) {
              return false;
            }

            const item =
              product as Record<string, unknown>;

            return (
              typeof item.id === "string" &&
              item.id.length > 0 &&
              typeof item.name === "string" &&
              item.name.length > 0 &&
              typeof item.price === "number" &&
              Number.isFinite(item.price)
            );
          })
          /*
           * Remove duplicate products.
           */
          .filter(
            (product, index, array) =>
              array.findIndex(
                (item) =>
                  item.id === product.id,
              ) === index,
          );

      setFavourites(validFavourites);

      /*
       * Clean localStorage as well.
       */
      localStorage.setItem(
        FAVOURITES_KEY,
        JSON.stringify(validFavourites),
      );
    } catch (error) {
      console.error(
        "Unable to load favourites:",
        error,
      );

      localStorage.removeItem(FAVOURITES_KEY);
      setFavourites([]);
    }
  }

  /*
   * =========================================
   * INITIAL LOAD
   * =========================================
   */
  useEffect(() => {
    loadFavourites();
  }, []);

  /*
   * =========================================
   * LISTEN FOR FAVOURITE CHANGES
   * =========================================
   *
   * ProductCard dispatches this event whenever
   * a favourite is added or removed.
   *
   * This means the header updates immediately
   * without needing a page refresh.
   */
  useEffect(() => {
    function handleFavouritesUpdated() {
      loadFavourites();
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
  }, []);

  /*
   * =========================================
   * REMOVE FAVOURITE
   * =========================================
   */
  function removeFavourite(id: string) {
    const updatedFavourites =
      favourites.filter(
        (product) => product.id !== id,
      );

    setFavourites(updatedFavourites);

    localStorage.setItem(
      FAVOURITES_KEY,
      JSON.stringify(updatedFavourites),
    );

    /*
     * Notify ProductCards and other favourite
     * components that the list changed.
     */
    window.dispatchEvent(
      new Event("favourites-updated"),
    );
  }

  /*
   * =========================================
   * CLOSE MENU
   * =========================================
   */
  function closeMenu() {
    setOpen(false);
  }

  /*
   * =========================================
   * MOBILE
   * =========================================
   */
  if (mobile) {
    return (
      <>
        <button
          type="button"
          aria-label="Open favourites"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="
            relative
            flex h-9 w-9
            items-center justify-center
            rounded-full
            text-[#29205C]
            transition-colors
            hover:bg-[#F7F3FA]
            hover:text-[#5C28AD]
          "
        >
          <Heart
            size={19}
            strokeWidth={1.5}
            className={
              favourites.length > 0
                ? "fill-[#5C28AD] text-[#5C28AD]"
                : ""
            }
          />

          {favourites.length > 0 && (
            <span
              className="
                absolute
                -right-0.5
                -top-0.5
                flex h-4 min-w-4
                items-center justify-center
                rounded-full
                bg-[#6539B8]
                px-1
                text-[7px]
                font-semibold
                text-white
              "
            >
              {favourites.length}
            </span>
          )}
        </button>

        {open && (
          <div
            className="
              absolute
              inset-x-0
              top-[72px]
              z-50
              border-t
              border-[#EEEAF3]
              bg-white
              shadow-[0_15px_35px_rgba(41,32,92,0.08)]
            "
          >
            <div className="px-5 py-5">

              <FavouriteHeader
                count={favourites.length}
                onClose={closeMenu}
              />

              {favourites.length > 0 ? (
                <div className="space-y-3">
                  {favourites.map(
                    (product) => (
                      <FavouriteItem
                        key={product.id}
                        product={product}
                        onRemove={
                          removeFavourite
                        }
                        onNavigate={
                          closeMenu
                        }
                      />
                    ),
                  )}
                </div>
              ) : (
                <EmptyState />
              )}

              {favourites.length > 0 && (
                <ViewAllButton
                  onClick={closeMenu}
                />
              )}

            </div>
          </div>
        )}
      </>
    );
  }

  /*
   * =========================================
   * DESKTOP
   * =========================================
   */
  return (
    <div className="relative">

      {/* Heart button */}

      <button
        type="button"
        aria-label="Open favourites"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className={`
          relative
          flex h-9 w-9
          items-center justify-center
          rounded-full
          transition-all
          duration-200
          ${
            open
              ? "bg-[#F1E9FF] text-[#5C28AD]"
              : "text-[#29205C] hover:bg-[#F7F3FA] hover:text-[#5C28AD]"
          }
        `}
      >
        <Heart
          size={19}
          strokeWidth={1.5}
          className={
            favourites.length > 0
              ? "fill-[#5C28AD] text-[#5C28AD]"
              : ""
          }
        />

        {favourites.length > 0 && (
          <span
            className="
              absolute
              -right-0.5
              -top-0.5
              flex h-4 min-w-4
              items-center justify-center
              rounded-full
              bg-[#6539B8]
              px-1
              text-[7px]
              font-semibold
              text-white
            "
          >
            {favourites.length}
          </span>
        )}
      </button>

      {/* Dropdown */}

      {open && (
        <div
          className="
            absolute
            right-0
            top-[calc(100%+12px)]
            z-50
            w-[350px]
            overflow-hidden
            rounded-2xl
            border
            border-[#E8E1ED]
            bg-white
            shadow-[0_20px_50px_rgba(41,32,92,0.14)]
          "
        >

          <FavouriteHeader
            count={favourites.length}
            onClose={closeMenu}
          />

          {favourites.length > 0 ? (
            <div className="max-h-[360px] overflow-y-auto">

              {favourites.map(
                (product) => (
                  <FavouriteItem
                    key={product.id}
                    product={product}
                    onRemove={
                      removeFavourite
                    }
                    onNavigate={
                      closeMenu
                    }
                  />
                ),
              )}

            </div>
          ) : (
            <EmptyState />
          )}

          {favourites.length > 0 && (
            <div className="border-t border-[#EEEAF3] p-3">
              <ViewAllButton
                onClick={closeMenu}
              />
            </div>
          )}

        </div>
      )}

    </div>
  );
}

/*
 * =========================================
 * FAVOURITE HEADER
 * =========================================
 */

function FavouriteHeader({
  count,
  onClose,
}: {
  count: number;
  onClose: () => void;
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        border-b
        border-[#EEEAF3]
        px-5
        py-4
      "
    >
      <div>

        <p className="font-serif text-lg font-medium text-[#29205C]">
          Favourites
        </p>

        <p className="mt-0.5 text-[8px] uppercase tracking-[0.2em] text-[#9A91A4]">
          {count}{" "}
          {count === 1 ? "saved" : "saved"}
        </p>

      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close favourites"
        className="
          flex h-7 w-7
          items-center justify-center
          rounded-full
          text-[#9A91A4]
          transition-colors
          hover:bg-[#F5F1F7]
          hover:text-[#29205C]
        "
      >
        <X
          size={14}
          strokeWidth={1.5}
        />
      </button>

    </div>
  );
}

/*
 * =========================================
 * FAVOURITE ITEM
 * =========================================
 */

function FavouriteItem({
  product,
  onRemove,
  onNavigate,
}: {
  product: FavouriteProduct;
  onRemove: (id: string) => void;
  onNavigate: () => void;
}) {
  /*
   * Extra protection against malformed data.
   */
  const price =
    typeof product.price === "number" &&
    Number.isFinite(product.price)
      ? product.price
      : 0;

  return (
    <div
      className="
        flex
        gap-3
        border-b
        border-[#F1EDF4]
        px-4
        py-3
        last:border-0
      "
    >

      {/* =================================
          IMAGE
      ================================== */}

      <Link
        href={`/catalogue/${product.id}`}
        onClick={onNavigate}
        className="
          relative
          h-16
          w-16
          shrink-0
          overflow-hidden
          rounded-lg
          bg-[#F5F2F7]
        "
      >
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="64px"
            className="
              object-cover
              transition-transform
              duration-300
              hover:scale-105
            "
          />
        ) : (
          <div
            className="
              flex h-full
              items-center
              justify-center
              text-[7px]
              text-[#9A91A4]
            "
          >
            No image
          </div>
        )}
      </Link>

      {/* =================================
          INFORMATION
      ================================== */}

      <div className="min-w-0 flex-1">

        <Link
          href={`/catalogue/${product.id}`}
          onClick={onNavigate}
          className="
            block
            truncate
            text-[11px]
            font-medium
            text-[#29205C]
            transition-colors
            hover:text-[#6539B8]
          "
        >
          {product.name}
        </Link>

        <p className="mt-1 text-[10px] font-medium text-[#6539B8]">
          ${price.toFixed(2)}
        </p>

        {/* Actions */}

        <div className="mt-2 flex items-center gap-3">

          <Link
            href={`/catalogue/${product.id}`}
            onClick={onNavigate}
            className="
              flex
              items-center
              gap-1
              text-[7px]
              font-medium
              uppercase
              tracking-[0.15em]
              text-[#29205C]
              transition-colors
              hover:text-[#6539B8]
            "
          >
            View

            <ArrowRight
              size={9}
              strokeWidth={1.4}
            />
          </Link>

          <button
            type="button"
            onClick={() =>
              onRemove(product.id)
            }
            className="
              flex
              items-center
              gap-1
              text-[7px]
              font-medium
              uppercase
              tracking-[0.15em]
              text-[#9A91A4]
              transition-colors
              hover:text-red-500
            "
          >
            <Trash2
              size={9}
              strokeWidth={1.4}
            />

            Remove
          </button>

        </div>

      </div>

    </div>
  );
}

/*
 * =========================================
 * EMPTY STATE
 * =========================================
 */

function EmptyState() {
  return (
    <div className="px-6 py-10 text-center">

      <Heart
        size={22}
        strokeWidth={1.2}
        className="mx-auto text-[#C8C0D0]"
      />

      <p className="mt-3 font-serif text-sm text-[#29205C]">
        No favourites yet
      </p>

      <p className="mt-1 text-[9px] leading-4 text-[#9A91A4]">
        Save pieces you love and
        they&apos;ll appear here.
      </p>

    </div>
  );
}

/*
 * =========================================
 * VIEW ALL BUTTON
 * =========================================
 */

function ViewAllButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <Link
      href="/favourites"
      onClick={onClick}
      className="
        group
        flex
        w-full
        items-center
        justify-center
        gap-2
        rounded-lg
        bg-[#6539B8]
        py-2.5
        text-[8px]
        font-medium
        uppercase
        tracking-[0.18em]
        text-white
        transition-colors
        hover:bg-[#5630A0]
      "
    >
      View all favourites

      <ArrowRight
        size={11}
        strokeWidth={1.4}
        className="
          transition-transform
          duration-200
          group-hover:translate-x-1
        "
      />
    </Link>
  );
}