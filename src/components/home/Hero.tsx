"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

type Product = {
  id: string;
  variationId: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  imageUrl?: string;
  category?: string;
  stock: number;
  featured?: boolean;
  trending?: boolean;
};

export default function Hero() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    async function loadFeaturedProducts() {
      try {
        const response = await fetch("/api/products");

        if (!response.ok) {
          throw new Error("Failed to load products");
        }

        const data = await response.json();

        const featured = data.products
          .filter((product: Product) => product.featured)
          .slice(0, 5);

        setFeaturedProducts(featured);
      } catch (error) {
        console.error("Failed to load featured products:", error);
      } finally {
        setLoading(false);
      }
    }

    loadFeaturedProducts();
  }, []);

  /*
   * Automatically move through featured products.
   */
  useEffect(() => {
    if (featuredProducts.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      changeSlide((currentIndex + 1) % featuredProducts.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [featuredProducts.length, currentIndex]);

  const currentProduct = featuredProducts[currentIndex];

  /*
   * Change the current featured product
   * with a short fade transition.
   */
  function changeSlide(index: number) {
    if (index === currentIndex || featuredProducts.length === 0) {
      return;
    }

    setIsFading(true);

    setTimeout(() => {
      setCurrentIndex(index);
      setIsFading(false);
    }, 350);
  }

  function nextSlide() {
    const nextIndex = (currentIndex + 1) % featuredProducts.length;

    changeSlide(nextIndex);
  }

  function previousSlide() {
    const previousIndex =
      (currentIndex - 1 + featuredProducts.length) % featuredProducts.length;

    changeSlide(previousIndex);
  }

  return (
    <section className="relative overflow-hidden bg-[#F8F7F4]">
      {/* Very subtle background details */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#C8B9EE]/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-[#8FE4EE]/8 blur-3xl" />

      <div className="relative mx-auto grid min-h-[calc(100vh-80px)] max-w-[1400px] items-center gap-12 px-6 py-16 sm:px-10 md:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-14 lg:py-24">
        {/* Left: Editorial Content */}
        <div className="max-w-xl">
          {/* Collection label */}
          <div className="mb-8 flex items-center gap-4">
            <span className="h-px w-10 bg-[#5C28AD]" />

            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-[#5C28AD]">
              The Lazuli Collection
            </p>
          </div>

          {/* Brand headline */}
          <h1 className="font-serif text-5xl font-medium leading-[1.05] tracking-[-0.025em] text-[#29205C] sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
            Made for
            <span className="block italic text-[#5C28AD]">your world.</span>
          </h1>

          <p className="mt-7 max-w-md text-sm leading-7 text-[#706B7D] sm:text-base">
            Discover carefully selected pieces inspired by the things you love.
            Explore the latest collection from Lazuli.
          </p>

          {/* Current product details */}
          <div
            className={`mt-10 border-l border-[#D8D1E2] pl-5 transition-opacity duration-300 ${
              isFading ? "opacity-0" : "opacity-100"
            }`}
          >
            <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#8A8697]">
              Featured piece
            </p>

            <h2 className="mt-2 text-xl font-medium tracking-tight text-[#29205C]">
              {currentProduct?.name || "Discover Lazuli"}
            </h2>

            {currentProduct?.description && (
              <p className="mt-2 max-w-sm text-sm leading-6 text-[#8A8697]">
                {currentProduct.description}
              </p>
            )}

            {currentProduct && (
              <p className="mt-3 text-sm font-medium text-[#5C28AD]">
                ${currentProduct.price.toFixed(2)} {currentProduct.currency}
              </p>
            )}
          </div>

          {/* CTA */}
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <Link
              href={
                currentProduct
                  ? `/catalogue/${currentProduct.id}`
                  : "/catalogue"
              }
              className="group inline-flex items-center gap-3 border-b border-[#5C28AD] pb-2 text-sm font-medium text-[#29205C] transition-colors hover:text-[#5C28AD]"
            >
              View featured piece
              <ArrowRight
                size={16}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/catalogue"
              className="text-sm text-[#8A8697] transition-colors hover:text-[#5C28AD]"
            >
              View collection
            </Link>
          </div>

          {/* Carousel controls */}
          {featuredProducts.length > 1 && (
            <div className="mt-12 flex items-center gap-6">
              {/* Previous */}
              <button
                type="button"
                onClick={previousSlide}
                aria-label="Previous featured product"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DCD6E4] text-[#514A78] transition-all hover:border-[#5C28AD] hover:bg-white"
              >
                <ArrowLeft size={15} strokeWidth={1.5} />
              </button>

              {/* Progress */}
              <div className="flex items-center gap-2">
                {featuredProducts.map((product, index) => (
                  <button
                    key={product.id}
                    type="button"
                    aria-label={`View ${product.name}`}
                    onClick={() => changeSlide(index)}
                    className={`h-px transition-all duration-500 ${
                      index === currentIndex
                        ? "w-10 bg-[#5C28AD]"
                        : "w-5 bg-[#D2CCD9] hover:bg-[#9B8BE8]"
                    }`}
                  />
                ))}
              </div>

              {/* Next */}
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next featured product"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DCD6E4] text-[#514A78] transition-all hover:border-[#5C28AD] hover:bg-white"
              >
                <ArrowRight size={15} strokeWidth={1.5} />
              </button>
            </div>
          )}
        </div>

        {/* Right: Featured Product */}
        <div className="relative">
          {loading ? (
            <div className="aspect-square animate-pulse bg-[#EFEDF0]" />
          ) : currentProduct?.imageUrl ? (
            <div
              className={`transition-opacity duration-350 ${
                isFading ? "opacity-0" : "opacity-100"
              }`}
            >
              <Link
                href={`/catalogue/${currentProduct.id}`}
                className="group block"
              >
                {/* Square Image */}
                <div className="relative aspect-square overflow-hidden rounded-3xl bg-[#EEECEB]">
                  <Image
                    src={currentProduct.imageUrl}
                    alt={currentProduct.name}
                    fill
                    priority
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.025]"
                    sizes="(max-width: 1024px) 90vw, 650px"
                  />

                  {/* Subtle image overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#29205C]/20 via-transparent to-transparent opacity-60" />

                  {/* Featured badge */}
                  <div className="absolute left-5 top-5">
                    <span className="rounded-full border border-white/40 bg-white/85 px-4 py-2 text-[9px] font-medium uppercase tracking-[0.25em] text-[#29205C] backdrop-blur-md">
                      Featured
                    </span>
                  </div>

                  {/* Featured item counter */}
                  {featuredProducts.length > 1 && (
                    <div className="absolute bottom-5 right-5">
                      <div className="rounded-full border border-white/40 bg-white/85 px-4 py-2 text-[9px] font-medium tracking-[0.2em] text-[#29205C] backdrop-blur-md">
                        {String(currentIndex + 1).padStart(2, "0")}

                        <span className="mx-2 text-[#AAA5B2]">/</span>

                        {String(featuredProducts.length).padStart(2, "0")}
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            </div>
          ) : (
            <div className="flex aspect-square items-center justify-center border border-[#E1DDE4] bg-white">
              <div className="text-center">
                <p className="text-sm text-[#8A8697]">
                  No featured products available
                </p>

                <Link
                  href="/catalogue"
                  className="mt-3 inline-block text-xs text-[#5C28AD]"
                >
                  Browse the collection →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
