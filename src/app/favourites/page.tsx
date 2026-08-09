"use client";

import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import ProductCard from "@/components/catalogue/ProductCard";
import type { Product } from "@/types/product";

const FAVOURITES_KEY = "lazuli-favourites";

export default function FavouritesPage() {
  const [favourites, setFavourites] = useState<Product[]>([]);
  const [loaded, setLoaded] = useState(false);

  /*
   * =========================================
   * LOAD FAVOURITES
   * =========================================
   *
   * Favourites are stored in localStorage so
   * they persist between visits.
   */
  useEffect(() => {
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
       * Only use valid product objects.
       */
      const validProducts = parsed.filter(
        (product): product is Product => {
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
            typeof item.name === "string" &&
            typeof item.price === "number"
          );
        },
      );

      setFavourites(validProducts);
    } catch (error) {
      console.error(
        "Unable to load favourites:",
        error,
      );

      setFavourites([]);
    } finally {
      setLoaded(true);
    }
  }, []);

  /*
   * =========================================
   * LISTEN FOR CHANGES
   * =========================================
   *
   * Keeps this page synchronized if a favourite
   * is changed elsewhere in the application.
   */
  useEffect(() => {
    function handleFavouritesUpdated() {
      try {
        const saved =
          localStorage.getItem(FAVOURITES_KEY);

        if (!saved) {
          setFavourites([]);
          return;
        }

        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setFavourites(parsed);
        }
      } catch {
        setFavourites([]);
      }
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
   * Avoid rendering localStorage-dependent
   * content during the initial render.
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
              <h1 className="
                font-serif
                text-4xl
                font-medium
                tracking-[-0.04em]
                text-[#29205C]
                sm:text-5xl
                lg:text-6xl
              ">
                Favourites
              </h1>

              <p className="
                mt-3
                max-w-lg
                font-serif
                text-sm
                leading-6
                text-[#81778D]
              ">
                The pieces you've saved from
                the Lazuli collection.
              </p>
            </div>

            {/* Count */}

            <div className="
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
            ">
              <Heart
                size={13}
                strokeWidth={1.4}
                className="text-[#6539B8]"
              />

              <span className="
                text-[8px]
                font-medium
                uppercase
                tracking-[0.18em]
                text-[#817A8F]
              ">
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

      <section className="
        mx-auto
        max-w-[1400px]
        px-6
        pb-20
        sm:px-10
        lg:px-14
        xl:px-16
      ">

        {favourites.length > 0 ? (
          <div className="
            grid
            grid-cols-2
            gap-x-4
            gap-y-9
            sm:grid-cols-2
            sm:gap-x-6
            sm:gap-y-12
            lg:grid-cols-3
            lg:gap-x-7
            lg:gap-y-14
          ">
            {favourites.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
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
 * EMPTY FAVOURITES
 * =========================================
 */

function EmptyFavourites() {
  return (
    <div className="
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
    ">

      <div className="
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-full
        bg-[#F0E9F7]
      ">
        <Heart
          size={23}
          strokeWidth={1.2}
          className="text-[#6539B8]"
        />
      </div>

      <h2 className="
        mt-6
        font-serif
        text-2xl
        font-medium
        text-[#29205C]
      ">
        Nothing saved yet
      </h2>

      <p className="
        mt-2
        max-w-sm
        text-sm
        leading-6
        text-[#817A8F]
      ">
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

        <span className="
          text-sm
          transition-transform
          duration-300
          group-hover:translate-x-1
        ">
          →
        </span>
      </Link>

    </div>
  );
}