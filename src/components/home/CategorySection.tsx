"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  imageUrl?: string;
  category?: string;
};

type Category = {
  name: string;
  imageUrl?: string;
};

export default function CategorySection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await fetch("/api/products");

        if (!response.ok) {
          throw new Error("Failed to load products");
        }

        const data = await response.json();

        const products: Product[] = data.products ?? [];

        /*
         * Build categories from Square products.
         *
         * The first product found in each category
         * provides the category image.
         */
        const categoryMap = new Map<string, Category>();

        products.forEach((product) => {
          if (!product.category) {
            return;
          }

          if (!categoryMap.has(product.category)) {
            categoryMap.set(product.category, {
              name: product.category,
              imageUrl: product.imageUrl,
            });
          }
        });

        setCategories(Array.from(categoryMap.values()));
      } catch (error) {
        console.error(
          "Failed to load categories:",
          error,
        );
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

  return (
    <section className="bg-white px-6 py-20 sm:px-10 md:py-24 lg:px-14">
      <div className="mx-auto max-w-[1400px]">

        {/* Section Header */}
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-8 bg-[#5C28AD]" />

              <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-[#5C28AD]">
                Explore
              </p>
            </div>

            <h2 className="font-serif text-4xl font-medium tracking-tight text-[#29205C] sm:text-5xl">
              Shop by category
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-6 text-[#8A8697]">
              Explore the Lazuli collection by the things
              you love.
            </p>
          </div>

          <Link
            href="/catalogue"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[#29205C] transition-colors hover:text-[#5C28AD]"
          >
            View all

            <ArrowRight
              size={16}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="aspect-[4/3] animate-pulse bg-[#F1EFF2]"
              />
            ))}
          </div>
        )}

        {/* Categories */}
        {!loading && categories.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.slice(0, 6).map((category) => (
              <Link
                key={category.name}
                href={`/catalogue?category=${encodeURIComponent(
                  category.name,
                )}`}
                className="group relative overflow-hidden rounded-2xl bg-[#EEECEB]"
              >
                <div className="relative aspect-[4/3]">

                  {/* Category Image */}
                  {category.imageUrl ? (
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-[#EEECEB]">
                      <span className="text-sm text-[#8A8697]">
                        {category.name}
                      </span>
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#29205C]/70 via-[#29205C]/10 to-transparent" />

                  {/* Category Content */}
                  <div className="absolute inset-x-0 bottom-0 p-6">

                    <p className="text-[9px] font-medium uppercase tracking-[0.25em] text-white/70">
                      Collection
                    </p>

                    <div className="mt-2 flex items-end justify-between gap-4">
                      <h3 className="font-serif text-2xl font-medium text-white sm:text-3xl">
                        {category.name}
                      </h3>

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-md transition-all duration-300 group-hover:bg-white group-hover:text-[#29205C]">
                        <ArrowRight
                          size={15}
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* No Categories */}
        {!loading && categories.length === 0 && (
          <div className="border border-[#E4DFE7] py-16 text-center">
            <p className="text-sm text-[#8A8697]">
              Categories will appear here as products
              are added.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}