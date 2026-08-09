"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/catalogue/ProductCard";

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

export default function CataloguePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [collectionFilter, setCollectionFilter] =
    useState("All");

  /*
   * Load products from the Square API.
   */
  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch("/api/products");

        if (!response.ok) {
          throw new Error("Failed to load products");
        }

        const data = await response.json();

        setProducts(data.products);
      } catch (error) {
        console.error(error);
        setError("Unable to load catalogue");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  /*
   * Build the category list dynamically
   * from the products returned by Square.
   */
  const categories = [
    "All",
    ...Array.from(
      new Set(
        products
          .map((product) => product.category)
          .filter(
            (category): category is string =>
              Boolean(category),
          ),
      ),
    ),
  ];

  /*
   * Filter and sort products.
   */
  const filteredProducts = [...products]
    .filter((product) => {
      /*
       * Search
       */
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      /*
       * Category
       */
      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      /*
       * Collection
       *
       * All       → show everything
       * Featured  → featured products only
       * Trending  → trending products only
       */
      const matchesCollection =
        collectionFilter === "All" ||
        (collectionFilter === "Featured" &&
          product.featured) ||
        (collectionFilter === "Trending" &&
          product.trending);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesCollection
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name);

        case "name-desc":
          return b.name.localeCompare(a.name);

        case "price-low":
          return a.price - b.price;

        case "price-high":
          return b.price - a.price;

        /*
         * Featured products first.
         */
        case "featured":
          return (
            Number(b.featured) - Number(a.featured)
          );

        default:
          return 0;
      }
    });

  /*
   * Loading state
   */
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F7F4]">
        <p className="text-sm tracking-wide text-[#5C28AD]">
          Loading collection...
        </p>
      </main>
    );
  }

  /*
   * Error state
   */
  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8F7F4]">
        <div className="text-center">
          <h1 className="text-lg font-medium text-[#29263A]">
            Something went wrong
          </h1>

          <p className="mt-2 text-sm text-[#8A8697]">
            {error}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F7F4] text-[#29263A]">
      {/* ================================================== */}
      {/* HEADER */}
      {/* ================================================== */}

      <section className="bg-[#F8F7F4] px-5 pb-8 pt-14 sm:px-8 md:pb-10 md:pt-20">
        <div className="mx-auto max-w-7xl">

          {/* Eyebrow */}
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-[#5C28AD]">
            Lazuli Collection
          </p>

          {/* Heading */}
          <h1 className="mt-3 text-center text-3xl font-semibold tracking-tight text-[#29263A] sm:text-4xl md:text-5xl">
            Discover something special.
          </h1>

          {/* Description */}
          <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-6 text-[#8A8697]">
            Explore our collection of unique pieces,
            carefully selected and available through
            Lazuli.
          </p>

          {/* ================================================== */}
          {/* SEARCH */}
          {/* ================================================== */}

          <div className="mx-auto mt-8 max-w-2xl">
            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search products..."
              className="h-12 w-full rounded-xl border border-[#E2DDEC] bg-white px-4 text-sm text-[#29263A] outline-none transition placeholder:text-[#AAA5B5] focus:border-[#5C28AD] focus:ring-2 focus:ring-[#5C28AD]/10"
            />
          </div>

          {/* ================================================== */}
          {/* COLLECTION FILTERS */}
          {/* ================================================== */}

          <div className="mt-7">
            <div className="flex justify-center gap-2 overflow-x-auto pb-1">
              {["All", "Featured", "Trending"].map(
                (filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() =>
                      setCollectionFilter(filter)
                    }
                    className={`whitespace-nowrap rounded-lg px-4 py-2 text-xs font-medium transition ${
                      collectionFilter === filter
                        ? "bg-[#5C28AD] text-white shadow-sm"
                        : "bg-white text-[#6E6A7D] hover:bg-[#E9F8FA]"
                    }`}
                  >
                    {filter}
                  </button>
                ),
              )}
            </div>
          </div>

          {/* ================================================== */}
          {/* CATEGORIES */}
          {/* ================================================== */}

          <div className="mt-5">
            <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    setSelectedCategory(category)
                  }
                  className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs transition ${
                    selectedCategory === category
                      ? "bg-[#29263A] text-white"
                      : "text-[#6E6A7D] hover:bg-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* CATALOGUE */}
      {/* ================================================== */}

      <section className="px-5 pb-24 sm:px-8 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">

          {/* ================================================== */}
          {/* TOOLBAR */}
          {/* ================================================== */}

          <div className="mb-6 flex items-center justify-between border-b border-[#E4DFEA] pb-4">

            {/* Product Count */}
            <p className="text-xs text-[#8A8697]">
              <span className="font-medium text-[#29263A]">
                {filteredProducts.length}
              </span>{" "}
              {filteredProducts.length === 1
                ? "product"
                : "products"}
            </p>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <label
                htmlFor="sort"
                className="hidden text-xs text-[#8A8697] sm:block"
              >
                Sort by
              </label>

              <select
                id="sort"
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value)
                }
                className="rounded-lg border border-[#E2DDEC] bg-white px-3 py-2 text-xs text-[#514A78] outline-none transition focus:border-[#5C28AD]"
              >
                <option value="featured">
                  Featured
                </option>

                <option value="name-asc">
                  Name A → Z
                </option>

                <option value="name-desc">
                  Name Z → A
                </option>

                <option value="price-low">
                  Price: Low → High
                </option>

                <option value="price-high">
                  Price: High → Low
                </option>
              </select>
            </div>
          </div>

          {/* ================================================== */}
          {/* PRODUCT GRID */}
          {/* ================================================== */}

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-5">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            /* ================================================== */
            /* EMPTY STATE */
            /* ================================================== */

            <div className="py-24 text-center">
              <h2 className="text-xl font-medium text-[#29263A]">
                No products found
              </h2>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#8A8697]">
                Try adjusting your search or category
                filters.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                  setCollectionFilter("All");
                  setSortBy("featured");
                }}
                className="mt-6 rounded-lg bg-[#5C28AD] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#4D2194]"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}