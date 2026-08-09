"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import {
  useEffect,
  useState,
} from "react";
import type { Product } from "@/types/product";

type HeroProps = {
  products: Product[];
};

export default function Hero({
  products,
}: HeroProps) {
  /*
   * Use featured products as the trending products
   * shown in the hero.
   *
   * Limit the rotation to five products.
   */
  const trendingProducts = products
    .filter((product) => product.featured)
    .slice(0, 5);

  /*
   * Fall back to the first five catalogue products
   * if there are no featured products.
   */
  const heroProducts =
    trendingProducts.length > 0
      ? trendingProducts
      : products.slice(0, 5);

  /*
   * Current product shown in the hero.
   */
  const [currentIndex, setCurrentIndex] =
    useState(0);

  /*
   * Two permanent image layers.
   *
   * Keeping both layers mounted prevents the
   * blinking that happens when an image is removed
   * and another one is mounted during the transition.
   */
  const [activeLayer, setActiveLayer] =
    useState<"a" | "b">("a");

  const [layerAIndex, setLayerAIndex] =
    useState(0);

  const [layerBIndex, setLayerBIndex] =
    useState<number | null>(
      heroProducts.length > 1 ? 1 : null,
    );

  const [isTransitioning, setIsTransitioning] =
    useState(false);

  const currentProduct =
    heroProducts[currentIndex];

  /*
   * Change to a specific product.
   *
   * The incoming image is first placed on the
   * hidden layer.
   *
   * Once the browser has rendered that image,
   * the two layers crossfade.
   */
  function changeSlide(index: number) {
    if (
      index === currentIndex ||
      isTransitioning ||
      heroProducts.length <= 1
    ) {
      return;
    }

    /*
     * Prepare the hidden layer with the
     * incoming product.
     */
    if (activeLayer === "a") {
      setLayerBIndex(index);
    } else {
      setLayerAIndex(index);
    }

    setIsTransitioning(true);

    /*
     * Wait for React and the browser to render
     * the incoming image before changing opacity.
     *
     * Two animation frames prevent the incoming
     * image from appearing at the same time as
     * the opacity change.
     */
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setActiveLayer(
          activeLayer === "a" ? "b" : "a",
        );
      });
    });

    /*
     * Finish the transition after the crossfade.
     *
     * The old layer is immediately prepared for
     * the next transition while remaining hidden.
     */
    setTimeout(() => {
      setCurrentIndex(index);

      if (activeLayer === "a") {
        setLayerAIndex(index);
      } else {
        setLayerBIndex(index);
      }

      setIsTransitioning(false);
    }, 1000);
  }

  /*
   * Previous featured product.
   */
  function previousSlide() {
    if (
      isTransitioning ||
      heroProducts.length <= 1
    ) {
      return;
    }

    const previousIndex =
      currentIndex === 0
        ? heroProducts.length - 1
        : currentIndex - 1;

    changeSlide(previousIndex);
  }

  /*
   * Next featured product.
   */
  function nextSlide() {
    if (
      isTransitioning ||
      heroProducts.length <= 1
    ) {
      return;
    }

    const nextProductIndex =
      (currentIndex + 1) %
      heroProducts.length;

    changeSlide(nextProductIndex);
  }

  /*
   * Automatically move to the next product
   * every five seconds.
   */
  useEffect(() => {
    if (heroProducts.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      if (isTransitioning) {
        return;
      }

      const nextProductIndex =
        (currentIndex + 1) %
        heroProducts.length;

      changeSlide(nextProductIndex);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [
    currentIndex,
    heroProducts.length,
    isTransitioning,
  ]);

  /*
   * Don't render the hero if there are no products.
   */
  if (!currentProduct) {
    return null;
  }

  const layerAProduct =
    heroProducts[layerAIndex];

  const layerBProduct =
    layerBIndex !== null
      ? heroProducts[layerBIndex]
      : null;

  return (
    <section className="w-full">

      {/* =========================================
          MAIN HERO
      ========================================== */}

      <div className="mx-auto max-w-[1500px] px-3 pt-2 sm:px-5 sm:pt-3 lg:px-6 lg:pt-3">

        <div className="relative overflow-hidden rounded-[1.5rem] border border-[#E4DDE9] bg-white">

          <div className="relative grid min-h-[500px] lg:min-h-[560px] lg:grid-cols-[0.82fr_1.18fr]">

            {/* =====================================
                LEFT CONTENT
            ====================================== */}

            <div className="relative z-30 flex items-center bg-white px-7 py-12 sm:px-10 lg:px-12 xl:px-16">

              <div className="max-w-[500px]">

                {/* Eyebrow */}

                <div className="flex items-center gap-3">

                  <span className="h-px w-8 bg-[#6539B8]" />

                  <span className="text-[8px] font-medium uppercase tracking-[0.38em] text-[#6539B8]">
                    The Lazuli Collection
                  </span>

                </div>

                {/* Heading */}

                <h1 className="mt-6 font-serif text-[3.5rem] font-medium leading-[0.88] tracking-[-0.05em] text-[#29205C] sm:text-[4.3rem] lg:text-[4.5rem] xl:text-[5rem]">
                  Made for

                  <span className="block italic text-[#6B3DC2]">
                    your world.
                  </span>
                </h1>

                {/* Description */}

                <p className="mt-7 max-w-[390px] font-serif text-[13px] leading-6 text-[#70687A] sm:text-sm">
                  Discover carefully selected pieces
                  inspired by the things you love.
                  Explore jewellery, charms,
                  keychains and more from Lazuli.
                </p>

                {/* =================================
                    CTA
                ================================== */}

                <div className="mt-8 flex flex-wrap items-center gap-5">

                  <Link
                    href="/catalogue"
                    className="group inline-flex items-center gap-3 rounded-full bg-[#6539B8] px-6 py-3.5 text-[9px] font-medium uppercase tracking-[0.1em] text-white shadow-[0_10px_25px_rgba(101,57,184,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#5630A0]"
                  >
                    Shop catalogue

                    <span className="text-sm transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>

                  <Link
                    href="/about"
                    className="group inline-flex items-center gap-2 rounded-full border border-[#CFC5D8] bg-white px-6 py-3.5 text-[9px] font-medium uppercase tracking-[0.1em] text-[#29205C] transition-all duration-300 hover:border-[#6539B8] hover:text-[#6539B8]"
                  >
                    Learn more

                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>

                </div>

                {/* =================================
                    TRENDING PRODUCT
                ================================== */}

                <div className="mt-8">

                  <p className="text-[7px] font-medium uppercase tracking-[0.32em] text-[#9A91A4]">
                    Trending now
                  </p>

                  <div
                    className={`mt-2 flex items-center gap-3 transition-opacity duration-500 ${
                      isTransitioning
                        ? "opacity-70"
                        : "opacity-100"
                    }`}
                  >

                    <span className="h-px w-6 bg-[#D9D0E2]" />

                    <span className="font-serif text-sm text-[#29205C]">
                      {currentProduct.name}
                    </span>

                    <span className="text-[10px] font-medium text-[#6539B8]">
                      $
                      {currentProduct.price.toFixed(
                        2,
                      )}
                    </span>

                  </div>

                  {/* =================================
                      PRODUCT NAVIGATION
                  ================================== */}

                  {heroProducts.length > 1 && (
                    <div className="mt-4 flex items-center gap-4">

                      {/* Previous */}

                      <button
                        type="button"
                        onClick={previousSlide}
                        disabled={isTransitioning}
                        aria-label="Previous trending product"
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-[#DDD6E5] bg-white text-[#514A78] transition-all duration-300 hover:border-[#6539B8] hover:bg-[#6539B8] hover:text-white disabled:pointer-events-none disabled:opacity-40"
                      >
                        <ArrowLeft
                          size={11}
                          strokeWidth={1.4}
                        />
                      </button>

                      {/* Progress */}

                      <div className="flex items-center gap-1.5">

                        {heroProducts.map(
                          (product, index) => (
                            <button
                              key={product.id}
                              type="button"
                              onClick={() =>
                                changeSlide(index)
                              }
                              disabled={
                                isTransitioning
                              }
                              aria-label={`View ${product.name}`}
                              aria-current={
                                index ===
                                currentIndex
                              }
                              className="group flex h-4 items-center disabled:pointer-events-none"
                            >
                              <span
                                className={`block h-px rounded-full transition-all duration-500 ${
                                  index ===
                                  currentIndex
                                    ? "w-7 bg-[#6539B8]"
                                    : "w-3 bg-[#D8D1DF] group-hover:w-5 group-hover:bg-[#A99EB5]"
                                }`}
                              />
                            </button>
                          ),
                        )}

                      </div>

                      {/* Next */}

                      <button
                        type="button"
                        onClick={nextSlide}
                        disabled={isTransitioning}
                        aria-label="Next trending product"
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-[#DDD6E5] bg-white text-[#514A78] transition-all duration-300 hover:border-[#6539B8] hover:bg-[#6539B8] hover:text-white disabled:pointer-events-none disabled:opacity-40"
                      >
                        <ArrowRight
                          size={11}
                          strokeWidth={1.4}
                        />
                      </button>

                    </div>
                  )}

                </div>

              </div>

            </div>

            {/* =====================================
                RIGHT IMAGE
            ====================================== */}

            <div className="relative min-h-[420px] overflow-hidden bg-white lg:min-h-full">

              {/* =================================
                  IMAGE LAYER A
              ================================== */}

              {layerAProduct?.imageUrl && (
                <Image
                  src={layerAProduct.imageUrl}
                  alt={layerAProduct.name}
                  fill
                  priority
                  loading="eager"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className={`absolute inset-0 object-cover object-center transition-opacity duration-[1000ms] ease-in-out ${
                    activeLayer === "a"
                      ? "z-10 opacity-100"
                      : "z-0 opacity-0"
                  }`}
                />
              )}

              {/* =================================
                  IMAGE LAYER B
              ================================== */}

              {layerBProduct?.imageUrl && (
                <Image
                  src={layerBProduct.imageUrl}
                  alt={layerBProduct.name}
                  fill
                  loading="eager"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className={`absolute inset-0 object-cover object-center transition-opacity duration-[1000ms] ease-in-out ${
                    activeLayer === "b"
                      ? "z-10 opacity-100"
                      : "z-0 opacity-0"
                  }`}
                />
              )}

              {/* =================================
                  WHITE LEFT FADE
              ================================== */}

              <div
                className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[24%]"
                style={{
                  background:
                    "linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0.97) 15%, rgba(255,255,255,0.78) 32%, rgba(255,255,255,0.42) 58%, rgba(255,255,255,0.12) 78%, transparent 100%)",
                }}
              />

            </div>

          </div>

        </div>

      </div>

      {/* =========================================
          INFORMATION STRIP
      ========================================== */}

      <div className="mx-auto mt-3 max-w-[1500px] px-3 sm:px-5 lg:px-6">

        <div className="overflow-hidden rounded-[1rem] border border-[#E5DFE9] bg-white">

          <div className="grid grid-cols-2 sm:grid-cols-4">

            {/* Curated Pieces */}

            <div className="flex items-center gap-3 px-5 py-4 sm:px-6">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F0E9F7] text-[#6539B8]">
                <span className="text-sm">
                  ✦
                </span>
              </div>

              <div>
                <p className="text-[9px] font-medium text-[#29205C]">
                  Curated Pieces
                </p>

                <p className="mt-0.5 text-[7px] text-[#8A8293]">
                  Selected with care
                </p>
              </div>

            </div>

            {/* Unique Designs */}

            <div className="flex items-center gap-3 border-t border-[#E9E4EC] px-5 py-4 sm:border-l sm:border-t-0 sm:px-6">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F0E9F7] text-[#6539B8]">
                <span className="text-sm">
                  ◇
                </span>
              </div>

              <div>
                <p className="text-[9px] font-medium text-[#29205C]">
                  Unique Designs
                </p>

                <p className="mt-0.5 text-[7px] text-[#8A8293]">
                  Made to stand out
                </p>
              </div>

            </div>

            {/* Made With Love */}

            <div className="flex items-center gap-3 border-t border-[#E9E4EC] px-5 py-4 sm:border-l sm:border-t-0 sm:px-6">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F0E9F7] text-[#6539B8]">
                <span className="text-sm">
                  ♡
                </span>
              </div>

              <div>
                <p className="text-[9px] font-medium text-[#29205C]">
                  Made With Love
                </p>

                <p className="mt-0.5 text-[7px] text-[#8A8293]">
                  Thoughtfully created
                </p>
              </div>

            </div>

            {/* Secure Shopping */}

            <div className="flex items-center gap-3 border-t border-[#E9E4EC] px-5 py-4 sm:border-l sm:border-t-0 sm:px-6">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F0E9F7] text-[#6539B8]">
                <span className="text-sm">
                  ✓
                </span>
              </div>

              <div>
                <p className="text-[9px] font-medium text-[#29205C]">
                  Secure Shopping
                </p>

                <p className="mt-0.5 text-[7px] text-[#8A8293]">
                  Powered by Square
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}