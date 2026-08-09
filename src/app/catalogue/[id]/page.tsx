"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Heart,
  Mail,
  Package,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useParams } from "next/navigation";
import Footer from "@/components/layout/Footer"

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
};

export default function ProductPage() {
  const params = useParams();

  const [product, setProduct] =
    useState<Product | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [isFavourite, setIsFavourite] =
    useState(false);

  /*
   * =========================================
   * LOAD PRODUCT
   * =========================================
   */

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/api/products/${params.id}`,
        );

        if (!response.ok) {
          throw new Error(
            "Product not found",
          );
        }

        const data = await response.json();

        setProduct(data.product);
      } catch (error) {
        console.error(error);

        setError(
          "Unable to load this product.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [params.id]);

  /*
   * =========================================
   * LOADING
   * =========================================
   */

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAF9FB]">
        <div className="text-center">

          <div className="mx-auto mb-4 h-px w-10 bg-[#6539B8]" />

          <p className="font-serif text-sm text-[#29205C]">
            Loading piece...
          </p>

          <p className="mt-2 text-[8px] uppercase tracking-[0.3em] text-[#9A91A4]">
            Lazuli Collection
          </p>

        </div>
      </main>
    );
  }

  /*
   * =========================================
   * ERROR
   * =========================================
   */

  if (error || !product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAF9FB] px-6">

        <div className="max-w-md text-center">

          <p className="text-[8px] uppercase tracking-[0.35em] text-[#6539B8]">
            Lazuli Collection
          </p>

          <h1 className="mt-4 font-serif text-3xl text-[#29205C]">
            Product not found
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#81778D]">
            We couldn't find the piece you're
            looking for.
          </p>

          <Link
            href="/catalogue"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#6539B8] px-6 py-3 text-[9px] font-medium uppercase tracking-[0.12em] text-white transition hover:bg-[#5630A0]"
          >
            <ArrowLeft size={13} />

            Back to catalogue
          </Link>

        </div>

      </main>
    );
  }

  const isAvailable = product.stock > 0;

  return (
    <main className="min-h-screen bg-[#FAF9FB]">

      {/* =========================================
          MAIN CONTENT
      ========================================== */}

      <section className="mx-auto max-w-[1500px] px-5 py-7 sm:px-8 lg:px-10">

        {/* =====================================
            BREADCRUMBS
        ====================================== */}

        <nav className="mb-7 flex items-center gap-2 overflow-hidden text-[8px] uppercase tracking-[0.16em] text-[#9A91A4]">

          <Link
            href="/"
            className="shrink-0 transition-colors hover:text-[#6539B8]"
          >
            Home
          </Link>

          <span>›</span>

          <Link
            href="/catalogue"
            className="shrink-0 transition-colors hover:text-[#6539B8]"
          >
            Catalogue
          </Link>

          {product.category && (
            <>
              <span>›</span>

              <span className="truncate text-[#6E667A]">
                {product.category}
              </span>
            </>
          )}

          <span>›</span>

          <span className="truncate text-[#29205C]">
            {product.name}
          </span>

        </nav>

        {/* =====================================
            PRODUCT AREA
        ====================================== */}

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.8fr)_300px]">

          {/* ===================================
              PRODUCT IMAGE
          ==================================== */}

          <div className="relative">

            <div className="relative aspect-square overflow-hidden rounded-[1.25rem] border border-[#E4DDE9] bg-[#F4F1F6]">

              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1280px) 60vw, 55vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">

                  <div className="text-center">

                    <div className="mx-auto mb-3 h-px w-8 bg-[#D9D0E2]" />

                    <p className="text-[8px] uppercase tracking-[0.25em] text-[#9A91A4]">
                      No image available
                    </p>

                  </div>

                </div>
              )}

              {/* Image overlay badge */}

              <div className="absolute left-5 top-5">

                <span className="rounded-full border border-white/70 bg-white/90 px-3 py-1.5 text-[7px] font-medium uppercase tracking-[0.25em] text-[#6539B8] shadow-sm backdrop-blur-md">
                  Lazuli Collection
                </span>

              </div>

              {/* Favourite */}

              <button
                type="button"
                aria-label={
                  isFavourite
                    ? "Remove from favourites"
                    : "Add to favourites"
                }
                onClick={() =>
                  setIsFavourite(
                    !isFavourite,
                  )
                }
                className={`absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/90 shadow-sm backdrop-blur-md transition-all duration-200 ${
                  isFavourite
                    ? "text-[#6539B8]"
                    : "text-[#514A78] hover:text-[#6539B8]"
                }`}
              >
                <Heart
                  size={17}
                  strokeWidth={1.4}
                  fill={
                    isFavourite
                      ? "currentColor"
                      : "none"
                  }
                />
              </button>

            </div>

            {/* Image caption */}

            <div className="mt-3 flex items-center justify-between px-1">

              <p className="text-[7px] uppercase tracking-[0.28em] text-[#A19AA8]">
                Lazuli / {product.category ?? "Collection"}
              </p>

              <span className="text-[7px] uppercase tracking-[0.2em] text-[#A19AA8]">
                Product view
              </span>

            </div>

          </div>

          {/* ===================================
              PRODUCT INFORMATION
          ==================================== */}

          <div className="flex flex-col">

            {/* Category */}

            {product.category && (
              <div className="flex items-center gap-3">

                <span className="h-px w-7 bg-[#6539B8]" />

                <p className="text-[8px] font-medium uppercase tracking-[0.3em] text-[#6539B8]">
                  {product.category}
                </p>

              </div>
            )}

            {/* Name */}

            <h1 className="mt-5 font-serif text-[2.7rem] font-medium leading-[0.95] tracking-[-0.045em] text-[#29205C] sm:text-[3.5rem]">
              {product.name}
            </h1>

            {/* Price */}

            <div className="mt-6 flex items-center gap-4">

              <p className="text-xl font-medium text-[#6539B8]">
                ${product.price.toFixed(2)}
              </p>

              <span className="h-4 w-px bg-[#DDD5E2]" />

              <p className="text-[9px] uppercase tracking-[0.18em] text-[#9A91A4]">
                {product.currency}
              </p>

            </div>

            {/* Availability */}

            <div className="mt-6">

              {isAvailable ? (
                <div className="inline-flex items-center gap-2 rounded-full border border-[#D7E8DE] bg-[#F0F8F3] px-3 py-1.5">

                  <span className="h-1.5 w-1.5 rounded-full bg-[#5AA276]" />

                  <span className="text-[8px] font-medium uppercase tracking-[0.15em] text-[#477D5D]">
                    In stock
                  </span>

                  <span className="text-[8px] text-[#769180]">
                    · {product.stock} available
                  </span>

                </div>
              ) : (
                <div className="inline-flex items-center gap-2 rounded-full border border-[#E4DDE7] bg-[#F4F1F5] px-3 py-1.5">

                  <span className="h-1.5 w-1.5 rounded-full bg-[#9A91A4]" />

                  <span className="text-[8px] font-medium uppercase tracking-[0.15em] text-[#716A79]">
                    Currently unavailable
                  </span>

                </div>
              )}

            </div>

            {/* Description */}

            {product.description && (
              <div className="mt-8 border-t border-[#E5DFE9] pt-7">

                <p className="text-[8px] font-medium uppercase tracking-[0.28em] text-[#6539B8]">
                  About this piece
                </p>

                <p className="mt-4 max-w-xl font-serif text-sm leading-7 text-[#70687A]">
                  {product.description}
                </p>

              </div>
            )}

            {/* Product details */}

            <div className="mt-8 border-y border-[#E5DFE9]">

              <div className="flex items-center justify-between py-4">

                <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#6E6678]">
                  Category
                </span>

                <span className="text-xs text-[#29205C]">
                  {product.category ??
                    "Lazuli Collection"}
                </span>

              </div>

              <div className="border-t border-[#EDE8EF] flex items-center justify-between py-4">

                <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#6E6678]">
                  Availability
                </span>

                <span
                  className={
                    isAvailable
                      ? "text-xs text-[#477D5D]"
                      : "text-xs text-[#81778D]"
                  }
                >
                  {isAvailable
                    ? `${product.stock} available`
                    : "Unavailable"}
                </span>

              </div>

              <div className="border-t border-[#EDE8EF] flex items-center justify-between py-4">

                <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#6E6678]">
                  Product ID
                </span>

                <span className="max-w-[180px] truncate text-xs text-[#81778D]">
                  {product.id}
                </span>

              </div>

            </div>

            {/* CTA */}

            <div className="mt-auto pt-8">

              <Link
                href="/contact"
                className="group flex w-full items-center justify-center gap-3 rounded-full bg-[#6539B8] px-6 py-4 text-[9px] font-medium uppercase tracking-[0.16em] text-white shadow-[0_10px_30px_rgba(101,57,184,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#5630A0] hover:shadow-[0_14px_35px_rgba(101,57,184,0.22)]"
              >
                Contact Lazuli

                <ArrowRight
                  size={13}
                  strokeWidth={1.4}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <p className="mt-3 text-center text-[7px] uppercase tracking-[0.2em] text-[#A19AA8]">
                Enquire about this piece
              </p>

            </div>

          </div>

          {/* ===================================
              INFORMATION SIDEBAR
          ==================================== */}

          <aside className="space-y-4">

            {/* Favourite card */}

            <div className="rounded-[1rem] border border-[#E4DDE9] bg-white p-4">

              <button
                type="button"
                onClick={() =>
                  setIsFavourite(
                    !isFavourite,
                  )
                }
                className="flex w-full items-center gap-4 text-left"
              >

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F0E8F8] text-[#6539B8]">

                  <Heart
                    size={18}
                    strokeWidth={1.4}
                    fill={
                      isFavourite
                        ? "currentColor"
                        : "none"
                    }
                  />

                </div>

                <div>

                  <p className="text-xs font-medium text-[#29205C]">
                    {isFavourite
                      ? "Saved to favourites"
                      : "Add to favourites"}
                  </p>

                  <p className="mt-1 text-[8px] leading-4 text-[#8A8293]">
                    Save this piece for later.
                  </p>

                </div>

              </button>

            </div>

            {/* Highlights */}

            <div className="rounded-[1rem] border border-[#E4DDE9] bg-white p-5">

              <div className="flex items-center gap-3">

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F0E8F8] text-[#6539B8]">
                  <Sparkles
                    size={14}
                    strokeWidth={1.3}
                  />
                </div>

                <h2 className="font-serif text-lg text-[#29205C]">
                  Why Lazuli
                </h2>

              </div>

              <div className="mt-5 space-y-4">

                <div className="flex items-start gap-3">

                  <Check
                    size={14}
                    strokeWidth={1.5}
                    className="mt-0.5 shrink-0 text-[#6539B8]"
                  />

                  <p className="text-[10px] leading-5 text-[#70687A]">
                    Carefully selected pieces
                  </p>

                </div>

                <div className="flex items-start gap-3">

                  <Check
                    size={14}
                    strokeWidth={1.5}
                    className="mt-0.5 shrink-0 text-[#6539B8]"
                  />

                  <p className="text-[10px] leading-5 text-[#70687A]">
                    Unique designs and collections
                  </p>

                </div>

                <div className="flex items-start gap-3">

                  <Check
                    size={14}
                    strokeWidth={1.5}
                    className="mt-0.5 shrink-0 text-[#6539B8]"
                  />

                  <p className="text-[10px] leading-5 text-[#70687A]">
                    Secure shopping powered by Square
                  </p>

                </div>

                <div className="flex items-start gap-3">

                  <Check
                    size={14}
                    strokeWidth={1.5}
                    className="mt-0.5 shrink-0 text-[#6539B8]"
                  />

                  <p className="text-[10px] leading-5 text-[#70687A]">
                    Curated with care
                  </p>

                </div>

              </div>

            </div>

            {/* Shopping information */}

            <div className="rounded-[1rem] border border-[#E4DDE9] bg-white p-5">

              <h2 className="font-serif text-lg text-[#29205C]">
                Shopping information
              </h2>

              <div className="mt-5 space-y-4">

                <div className="flex items-start gap-3">

                  <Package
                    size={15}
                    strokeWidth={1.3}
                    className="mt-0.5 shrink-0 text-[#6539B8]"
                  />

                  <div>

                    <p className="text-[10px] font-medium text-[#29205C]">
                      Availability
                    </p>

                    <p className="mt-1 text-[8px] leading-4 text-[#8A8293]">
                      {isAvailable
                        ? "This piece is currently available."
                        : "This piece is currently unavailable."}
                    </p>

                  </div>

                </div>

                <div className="flex items-start gap-3">

                  <ShieldCheck
                    size={15}
                    strokeWidth={1.3}
                    className="mt-0.5 shrink-0 text-[#6539B8]"
                  />

                  <div>

                    <p className="text-[10px] font-medium text-[#29205C]">
                      Secure shopping
                    </p>

                    <p className="mt-1 text-[8px] leading-4 text-[#8A8293]">
                      Secure payments powered by Square.
                    </p>

                  </div>

                </div>

                <div className="flex items-start gap-3">

                  <Mail
                    size={15}
                    strokeWidth={1.3}
                    className="mt-0.5 shrink-0 text-[#6539B8]"
                  />

                  <div>

                    <p className="text-[10px] font-medium text-[#29205C]">
                      Need help?
                    </p>

                    <Link
                      href="/contact"
                      className="mt-1 inline-block text-[8px] text-[#6539B8] hover:underline"
                    >
                      Contact Lazuli →
                    </Link>

                  </div>

                </div>

              </div>

            </div>

          </aside>

        </div>

        {/* =====================================
            DESCRIPTION PANEL
        ====================================== */}

        <section className="mt-8 rounded-[1rem] border border-[#E4DDE9] bg-white">

          <div className="grid lg:grid-cols-[180px_1fr]">

            <div className="border-b border-[#E9E3ED] p-6 lg:border-b-0 lg:border-r">

              <p className="text-[8px] font-medium uppercase tracking-[0.28em] text-[#6539B8]">
                Details
              </p>

              <h2 className="mt-2 font-serif text-xl text-[#29205C]">
                About this piece
              </h2>

            </div>

            <div className="p-6 lg:p-8">

              <p className="max-w-3xl text-sm leading-7 text-[#70687A]">
                {product.description ??
                  "Explore this carefully selected piece from the Lazuli collection."}
              </p>

            </div>

          </div>

        </section>

        {/* =====================================
            BACK TO CATALOGUE
        ====================================== */}

        <div className="mt-8">

          <Link
            href="/catalogue"
            className="group inline-flex items-center gap-3 text-[8px] font-medium uppercase tracking-[0.25em] text-[#29205C] transition-colors hover:text-[#6539B8]"
          >
            <ArrowLeft
              size={13}
              strokeWidth={1.3}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            Continue browsing
          </Link>

        </div>

      </section>

      {/* =========================================
          FOOTER
      ========================================== */}

      <Footer />

    </main>
  );
}