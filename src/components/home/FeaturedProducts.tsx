"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/types/product";
import ProductCard from "@/components/catalogue/ProductCard";

type FeaturedProductsProps = {
  products: Product[];
};

export default function FeaturedProducts({
  products,
}: FeaturedProductsProps) {
  /*
   * =========================================
   * FILTER AVAILABLE PRODUCTS
   * =========================================
   *
   * Only display products that are currently
   * available.
   *
   * A product with variations is considered
   * available when at least one variation has
   * stock remaining.
   *
   * Products without variations fall back to
   * their main stock value.
   */
  const availableProducts = products.filter(
    (product) => {
      const totalVariationStock =
        product.variations?.reduce(
          (total, variation) =>
            total + variation.stock,
          0,
        ) ?? product.stock;

      return totalVariationStock > 0;
    },
  );

  /*
   * =========================================
   * NEWEST PRODUCTS
   * =========================================
   *
   * The Square catalogue is already returned in
   * the order we want to display.
   *
   * Filter unavailable products first, then
   * take the first six available products.
   */
  const newestProducts =
    availableProducts.slice(0, 6);

  /*
   * Don't render the section if there are
   * no products available.
   */
  if (newestProducts.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#FAF9FB] py-16 sm:py-20">
      <div className="mx-auto max-w-[1250px] px-6 sm:px-8 lg:px-10">

        {/* =====================================
            SECTION HEADER
        ====================================== */}

        <div className="mb-8 flex items-end justify-between gap-6 sm:mb-10">

          <div>

            {/* Eyebrow */}

            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-6 bg-[#6539B8]" />

              <p className="text-[8px] font-medium uppercase tracking-[0.35em] text-[#6539B8]">
                New arrivals
              </p>
            </div>

            {/* Heading */}

            <h2 className="font-serif text-3xl font-medium tracking-[-0.04em] text-[#29205C] sm:text-4xl">
              Recently added
            </h2>

            {/* Description */}

            <p className="mt-2 max-w-md font-serif text-xs leading-5 text-[#81778D] sm:text-sm">
              Discover the latest pieces added to
              the Lazuli collection.
            </p>

          </div>

          {/* View all */}

          <Link
            href="/catalogue"
            className="group hidden items-center gap-2 text-[9px] font-medium uppercase tracking-[0.18em] text-[#29205C] transition-colors duration-300 hover:text-[#6539B8] sm:flex"
          >
            View all products

            <ArrowRight
              size={12}
              strokeWidth={1.4}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

        </div>

        {/* =====================================
            PRODUCT GRID
        ====================================== */}

        <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-8 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-10">

          {newestProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

        {/* =====================================
            MOBILE VIEW ALL
        ====================================== */}

        <div className="mt-8 sm:hidden">
          <Link
            href="/catalogue"
            className="group inline-flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.18em] text-[#29205C] transition-colors hover:text-[#6539B8]"
          >
            View all products

            <ArrowRight
              size={12}
              strokeWidth={1.4}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

      </div>
    </section>
  );
}