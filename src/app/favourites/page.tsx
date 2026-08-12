"use client";

import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";
import { useEffect, useState } from "react";

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

export default function FavouritesPage() {
  const [favourites, setFavourites] = useState<FavouriteProduct[]>([]);
  const [loaded, setLoaded] = useState(false);

  /*
   * =========================================
   * LOAD FAVOURITES
   * =========================================
   */

  useEffect(() => {
    loadFavourites();
  }, []);

  /*
   * =========================================
   * LISTEN FOR CHANGES
   * =========================================
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
   * LOAD FROM LOCAL STORAGE
   * =========================================
   */

  function loadFavourites() {
    try {
      const saved =
        localStorage.getItem(FAVOURITES_KEY);

      if (!saved) {
        setFavourites([]);
        setLoaded(true);
        return;
      }

      const parsed: unknown = JSON.parse(saved);

      if (!Array.isArray(parsed)) {
        localStorage.removeItem(FAVOURITES_KEY);
        setFavourites([]);
        setLoaded(true);
        return;
      }

      /*
       * Validate the stored favourites.
       *
       * variationId and variationName are
       * optional so older favourites remain
       * compatible.
       */
      const validFavourites =
        parsed.filter(
          (item): item is FavouriteProduct => {
            if (
              !item ||
              typeof item !== "object"
            ) {
              return false;
            }

            const favourite =
              item as Record<string, unknown>;

            return (
              typeof favourite.id ===
                "string" &&
              typeof favourite.name ===
                "string" &&
              typeof favourite.price ===
                "number"
            );
          },
        );

      setFavourites(validFavourites);
    } catch (error) {
      console.error(
        "Unable to load favourites:",
        error,
      );

      setFavourites([]);
    } finally {
      setLoaded(true);
    }
  }

  /*
   * =========================================
   * REMOVE FAVOURITE
   * =========================================
   */

  function removeFavourite(
    favourite: FavouriteProduct,
  ) {
    try {
      const updated =
        favourites.filter(
          (item) => {
            /*
             * New variation-aware favourite.
             */
            if (
              favourite.variationId &&
              item.variationId
            ) {
              return !(
                item.id === favourite.id &&
                item.variationId ===
                  favourite.variationId
              );
            }

            /*
             * Legacy favourite.
             */
            return item.id !== favourite.id;
          },
        );

      localStorage.setItem(
        FAVOURITES_KEY,
        JSON.stringify(updated),
      );

      setFavourites(updated);

      window.dispatchEvent(
        new Event("favourites-updated"),
      );
    } catch (error) {
      console.error(
        "Unable to remove favourite:",
        error,
      );
    }
  }

  /*
   * =========================================
   * LOADING
   * =========================================
   */

  if (!loaded) {
    return (
      <main className="min-h-[60vh]">
        <section className="mx-auto max-w-[1400px] px-6 py-16 sm:px-10 lg:px-14">
          <div className="h-8 w-48 animate-pulse rounded bg-[#F1EDF5]" />

          <div className="mt-4 h-4 w-72 animate-pulse rounded bg-[#F5F2F7]" />
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">

      {/* =====================================
          PAGE HEADER
      ====================================== */}

      <section className="mx-auto max-w-[1400px] px-6 pb-12 pt-10 sm:px-10 sm:pb-14 sm:pt-14 lg:px-14 xl:px-16">

        {/* Back */}

        <Link
          href="/catalogue"
          className="
            group
            inline-flex
            items-center
            gap-2
            text-[8px]
            font-medium
            uppercase
            tracking-[0.22em]
            text-[#817A8F]
            transition-colors
            hover:text-[#6539B8]
          "
        >
          <ArrowLeft
            size={11}
            strokeWidth={1.4}
            className="
              transition-transform
              duration-200
              group-hover:-translate-x-1
            "
          />

          Back to catalogue
        </Link>

        {/* Heading */}

        <div className="mt-9">

          <div className="flex items-center gap-3">

            <span className="h-px w-7 bg-[#6539B8]" />

            <p className="text-[8px] font-medium uppercase tracking-[0.38em] text-[#6539B8]">
              Your collection
            </p>

          </div>

          <div className="mt-4 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

            <div>

              <h1
                className="
                  font-serif
                  text-4xl
                  font-medium
                  tracking-[-0.04em]
                  text-[#29205C]
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                Favourites
              </h1>

              <p
                className="
                  mt-3
                  max-w-lg
                  font-serif
                  text-sm
                  leading-6
                  text-[#81778D]
                "
              >
                The pieces you&apos;ve saved from
                the Lazuli collection.
              </p>

            </div>

            {/* Count */}

            <div
              className="
                flex
                items-center
                gap-2
                self-start
                rounded-full
                border
                border-[#E7E0EB]
                bg-[#FAF8FB]
                px-4
                py-2
                sm:self-auto
              "
            >

              <Heart
                size={13}
                strokeWidth={1.4}
                className="text-[#6539B8]"
              />

              <span
                className="
                  text-[8px]
                  font-medium
                  uppercase
                  tracking-[0.18em]
                  text-[#817A8F]
                "
              >
                {favourites.length}{" "}
                {favourites.length === 1
                  ? "piece"
                  : "pieces"}
              </span>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================
          FAVOURITES
      ====================================== */}

      <section
        className="
          mx-auto
          max-w-[1400px]
          px-6
          pb-20
          sm:px-10
          lg:px-14
          xl:px-16
        "
      >

        {favourites.length > 0 ? (

          <div
            className="
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
            "
          >

            {favourites.map(
              (favourite) => (
                <FavouriteCard
                  key={
                    favourite.variationId
                      ? `${favourite.id}-${favourite.variationId}`
                      : favourite.id
                  }
                  favourite={favourite}
                  onRemove={() =>
                    removeFavourite(
                      favourite,
                    )
                  }
                />
              ),
            )}

          </div>

        ) : (

          <EmptyFavourites />

        )}

      </section>

    </main>
  );
}


/*
 * =========================================
 * FAVOURITE CARD
 * =========================================
 */

type FavouriteCardProps = {
  favourite: FavouriteProduct;
  onRemove: () => void;
};

function FavouriteCard({
  favourite,
  onRemove,
}: FavouriteCardProps) {
  return (
    <article
      className="
        group
        overflow-hidden
        rounded-[1rem]
        border
        border-[#E6E0EA]
        bg-white
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:border-[#D7CCE1]
        hover:shadow-[0_12px_30px_rgba(41,32,92,0.06)]
      "
    >

      {/* Image */}

      <Link
        href={`/catalogue/${favourite.id}`}
        className="block"
      >

        <div className="relative aspect-[1/0.94] overflow-hidden bg-[#F5F3F7]">

          {favourite.imageUrl ? (

            <img
              src={favourite.imageUrl}
              alt={favourite.name}
              className="
                h-full
                w-full
                object-cover
                transition-transform
                duration-500
                group-hover:scale-[1.025]
              "
            />

          ) : (

            <div className="flex h-full items-center justify-center">

              <span
                className="
                  text-[8px]
                  uppercase
                  tracking-[0.18em]
                  text-[#9A91A4]
                "
              >
                No image
              </span>

            </div>

          )}

        </div>

      </Link>

      {/* Information */}

      <div className="p-4">

        <Link
          href={`/catalogue/${favourite.id}`}
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
          {favourite.name}
        </Link>

        {/* Variation */}

        {favourite.variationName && (
          <p
            className="
              mt-1
              truncate
              text-[9px]
              uppercase
              tracking-[0.12em]
              text-[#817A8F]
            "
          >
            {favourite.variationName}
          </p>
        )}

        {/* Price */}

        <div className="mt-3 flex items-center justify-between">

          <p
            className="
              text-[11px]
              font-semibold
              text-[#6539B8]
            "
          >
            ${favourite.price.toFixed(2)}

            {favourite.currency && (
              <span
                className="
                  ml-1
                  text-[8px]
                  font-normal
                  uppercase
                  text-[#9A91A4]
                "
              >
                {favourite.currency}
              </span>
            )}
          </p>

          {/* Remove */}

          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove ${favourite.name}${
              favourite.variationName
                ? ` ${favourite.variationName}`
                : ""
            } from favourites`}
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              bg-[#F5F0FA]
              text-[#6539B8]
              transition-all
              duration-200
              hover:bg-[#6539B8]
              hover:text-white
            "
          >
            <Heart
              size={14}
              strokeWidth={1.4}
              fill="currentColor"
            />
          </button>

        </div>

        {/* View */}

        <Link
          href={`/catalogue/${favourite.id}`}
          className="
            mt-4
            flex
            items-center
            justify-center
            rounded-full
            border
            border-[#E2DAE8]
            px-4
            py-2.5
            text-[8px]
            font-medium
            uppercase
            tracking-[0.15em]
            text-[#29205C]
            transition-colors
            hover:border-[#6539B8]
            hover:text-[#6539B8]
          "
        >
          View piece
        </Link>

      </div>

    </article>
  );
}


/*
 * =========================================
 * EMPTY FAVOURITES
 * =========================================
 */

function EmptyFavourites() {
  return (
    <div
      className="
        flex
        min-h-[420px]
        flex-col
        items-center
        justify-center
        rounded-[1.5rem]
        border
        border-[#EAE4EE]
        bg-[#FBFAFC]
        px-6
        text-center
      "
    >

      <div
        className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          bg-[#F0E9F7]
        "
      >
        <Heart
          size={23}
          strokeWidth={1.2}
          className="text-[#6539B8]"
        />
      </div>

      <h2
        className="
          mt-6
          font-serif
          text-2xl
          font-medium
          text-[#29205C]
        "
      >
        Nothing saved yet
      </h2>

      <p
        className="
          mt-2
          max-w-sm
          text-sm
          leading-6
          text-[#817A8F]
        "
      >
        When you find something you love,
        tap the heart to save it here.
      </p>

      <Link
        href="/catalogue"
        className="
          group
          mt-7
          inline-flex
          items-center
          gap-3
          rounded-full
          bg-[#6539B8]
          px-6
          py-3
          text-[9px]
          font-medium
          uppercase
          tracking-[0.12em]
          text-white
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:bg-[#5630A0]
        "
      >
        Explore catalogue

        <span
          className="
            text-sm
            transition-transform
            duration-300
            group-hover:translate-x-1
          "
        >
          →
        </span>

      </Link>

    </div>
  );
}