"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  Sparkles,
  Tag,
} from "lucide-react";

import ProductCard from "@/components/catalogue/ProductCard";
import Footer from "@/components/layout/Footer";
import type { Product } from "@/types/product";

const PRODUCTS_PER_PAGE = 12;

export default function CataloguePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [sortBy, setSortBy] = useState("featured");

  const [collectionFilter, setCollectionFilter] = useState("All");

  const [availability, setAvailability] = useState("In Stock");

  const [currentPage, setCurrentPage] = useState(1);

  /*
   * =========================================
   * LOAD PRODUCTS
   * =========================================
   */

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/products");

        if (!response.ok) {
          throw new Error("Failed to load products.");
        }

        const data = await response.json();

        if (!Array.isArray(data.products)) {
          throw new Error("Invalid product data returned.");
        }

        setProducts(data.products);
      } catch (error) {
        console.error(error);

        setProducts([]);

        setError("Unable to load the catalogue.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  /*
   * =========================================
   * CATEGORIES
   * =========================================
   */

  const categories = useMemo(() => {
    const productCategories = products
      .map((product) => product.category)
      .filter((category): category is string => Boolean(category));

    return ["All", ...Array.from(new Set(productCategories))];
  }, [products]);

  /*
   * =========================================
   * CATEGORY COUNTS
   * =========================================
   */

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      All: products.length,
    };

    products.forEach((product) => {
      if (!product.category) return;

      counts[product.category] = (counts[product.category] ?? 0) + 1;
    });

    return counts;
  }, [products]);

  /*
   * =========================================
   * FILTER + SORT
   * =========================================
   */

  const filteredProducts = useMemo(() => {
    return [...products]
      .filter((product) => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(search.toLowerCase());

        const matchesCategory =
          selectedCategory === "All" || product.category === selectedCategory;

        const matchesCollection =
          collectionFilter === "All" ||
          (collectionFilter === "Featured" && product.featured) ||
          (collectionFilter === "Trending" && product.trending);

        const totalVariationStock =
          product.variations?.reduce(
            (total, variation) => total + variation.stock,
            0,
          ) ?? product.stock;

        const matchesAvailability =
          availability === "All" ||
          (availability === "In Stock" && totalVariationStock > 0) ||
          (availability === "Unavailable" && totalVariationStock <= 0);

        return (
          matchesSearch &&
          matchesCategory &&
          matchesCollection &&
          matchesAvailability
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

          case "featured":
          default:
            return Number(b.featured) - Number(a.featured);
        }
      });
  }, [
    products,
    search,
    selectedCategory,
    collectionFilter,
    availability,
    sortBy,
  ]);

  /*
   * =========================================
   * PAGINATION
   * =========================================
   */

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory, collectionFilter, availability, sortBy]);

  /*
   * =========================================
   * RESET FILTERS
   * =========================================
   */

  function clearFilters() {
    setSearch("");
    setSelectedCategory("All");
    setCollectionFilter("All");
    setAvailability("All");
    setSortBy("featured");
  }

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
            Loading collection...
          </p>

          <p className="mt-2 text-[8px] uppercase tracking-[0.25em] text-[#9A91A4]">
            Please wait
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

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAF9FB] px-6">
        <div className="max-w-md text-center">
          <p className="text-[8px] uppercase tracking-[0.35em] text-[#6539B8]">
            Lazuli Collection
          </p>

          <h1 className="mt-4 font-serif text-3xl text-[#29205C]">
            Something went wrong
          </h1>

          <p className="mt-3 text-sm text-[#81778D]">{error}</p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 rounded-full bg-[#6539B8] px-6 py-3 text-[9px] font-medium uppercase tracking-[0.12em] text-white transition hover:bg-[#5630A0]"
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF9FB]">
      {/* =========================================
          PAGE INTRO
      ========================================== */}

      <section className="border-b border-[#E9E3ED] bg-white">
        <div className="mx-auto max-w-[1500px] px-6 py-10 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#6539B8]" />

                <p className="text-[8px] font-medium uppercase tracking-[0.4em] text-[#6539B8]">
                  The Lazuli Collection
                </p>
              </div>

              <h1 className="mt-4 font-serif text-[3rem] font-medium leading-none tracking-[-0.045em] text-[#29205C] sm:text-[4rem]">
                Catalogue
              </h1>

              <p className="mt-4 max-w-xl font-serif text-sm leading-6 text-[#81778D]">
                Discover carefully selected pieces inspired by the things you
                love.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6539B8]" />

              <p className="text-[9px] uppercase tracking-[0.18em] text-[#8E8797]">
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "piece" : "pieces"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          CATALOGUE
      ========================================== */}

      <section className="mx-auto max-w-[1500px] px-6 py-8 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[220px_1fr] xl:grid-cols-[240px_1fr]">
          {/* =====================================
              SIDEBAR
          ====================================== */}

          <aside className="hidden lg:block">
            <div className="sticky top-24">
              {/* Categories */}

              <div className="border-b border-[#E6E0E9] pb-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#29205C]">
                    Categories
                  </h2>

                  <Tag size={13} strokeWidth={1.3} className="text-[#AAA2B2]" />
                </div>

                <div className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-xs transition-all ${
                        selectedCategory === category
                          ? "bg-[#F0E8F8] font-medium text-[#6539B8]"
                          : "text-[#5E5870] hover:bg-white hover:text-[#6539B8]"
                      }`}
                    >
                      <span>
                        {category === "All" ? "All Products" : category}
                      </span>

                      <span
                        className={`text-[9px] ${
                          selectedCategory === category
                            ? "text-[#6539B8]"
                            : "text-[#AAA2B2]"
                        }`}
                      >
                        {categoryCounts[category] ?? 0}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Collection */}

              <div className="border-b border-[#E6E0E9] py-6">
                <h2 className="mb-4 text-[9px] font-medium uppercase tracking-[0.3em] text-[#29205C]">
                  Collection
                </h2>

                <div className="space-y-3">
                  {["All", "Featured", "Trending"].map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setCollectionFilter(filter)}
                      className="flex items-center gap-3 text-xs text-[#5E5870]"
                    >
                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded border transition ${
                          collectionFilter === filter
                            ? "border-[#6539B8] bg-[#6539B8]"
                            : "border-[#D8D1DF] bg-white"
                        }`}
                      >
                        {collectionFilter === filter && (
                          <span className="h-1.5 w-1.5 rounded-full bg-white" />
                        )}
                      </span>

                      {filter === "All" ? "All products" : filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability */}

              <div className="border-b border-[#E6E0E9] py-6">
                <h2 className="mb-4 text-[9px] font-medium uppercase tracking-[0.3em] text-[#29205C]">
                  Availability
                </h2>

                <div className="space-y-3">
                  {["All", "In Stock", "Unavailable"].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setAvailability(option)}
                      className="flex items-center gap-3 text-xs text-[#5E5870]"
                    >
                      <span
                        className={`h-4 w-4 rounded border ${
                          availability === option
                            ? "border-[#6539B8] bg-[#6539B8]"
                            : "border-[#D8D1DF] bg-white"
                        }`}
                      />

                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 text-[8px] font-medium uppercase tracking-[0.25em] text-[#6539B8] transition hover:text-[#5630A0]"
              >
                Clear all filters
              </button>
            </div>
          </aside>

          {/* =====================================
              PRODUCTS
          ====================================== */}

          <div className="min-w-0">
            {/* Toolbar */}

            <div className="rounded-2xl border border-[#E6E0E9] bg-white p-4">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                {/* Search */}

                <div className="relative w-full xl:max-w-sm">
                  <Search
                    size={15}
                    strokeWidth={1.4}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A19AAA]"
                  />

                  <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search the collection..."
                    className="h-10 w-full rounded-full border border-[#E4DEE8] bg-[#FCFBFD] pl-10 pr-4 text-xs text-[#29205C] outline-none transition placeholder:text-[#AAA5B1] focus:border-[#6539B8] focus:bg-white focus:ring-2 focus:ring-[#6539B8]/10"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="flex items-center gap-2 rounded-full border border-[#E4DEE8] bg-white px-4 py-2.5 text-[8px] font-medium uppercase tracking-[0.15em] text-[#625B70] transition hover:border-[#CBBBD8] hover:text-[#6539B8] lg:hidden"
                  >
                    <SlidersHorizontal size={13} />
                    Filters
                  </button>

                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(event) => setSortBy(event.target.value)}
                      className="h-10 appearance-none rounded-full border border-[#E4DEE8] bg-white pl-4 pr-9 text-[8px] font-medium uppercase tracking-[0.12em] text-[#625B70] outline-none focus:border-[#6539B8]"
                    >
                      <option value="featured">Featured</option>

                      <option value="name-asc">Name A–Z</option>

                      <option value="name-desc">Name Z–A</option>

                      <option value="price-low">Price low–high</option>

                      <option value="price-high">Price high–low</option>
                    </select>

                    <ChevronDown
                      size={13}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#81778D]"
                    />
                  </div>
                </div>
              </div>

              {/* Category pills */}

              <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`whitespace-nowrap rounded-full border px-4 py-2 text-[8px] font-medium transition-all ${
                      selectedCategory === category
                        ? "border-[#6539B8] bg-[#6539B8] text-white shadow-[0_5px_15px_rgba(101,57,184,0.15)]"
                        : "border-[#E4DEE8] bg-white text-[#6F687A] hover:border-[#CBBBD8] hover:text-[#6539B8]"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Result bar */}

            <div className="flex items-center justify-between py-5">
              <p className="text-[8px] uppercase tracking-[0.25em] text-[#9A91A4]">
                {filteredProducts.length} results
              </p>

              {(search ||
                selectedCategory !== "All" ||
                collectionFilter !== "All" ||
                availability !== "All") && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-[8px] font-medium uppercase tracking-[0.18em] text-[#6539B8]"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Product grid */}

            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-[#E5DFE9] bg-white py-24 text-center">
                <Sparkles
                  size={20}
                  strokeWidth={1.2}
                  className="mx-auto text-[#BCA9CC]"
                />

                <h2 className="mt-4 font-serif text-2xl text-[#29205C]">
                  Nothing found
                </h2>

                <p className="mt-2 text-sm text-[#81778D]">
                  Try changing your search or filters.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 rounded-full bg-[#6539B8] px-6 py-3 text-[8px] font-medium uppercase tracking-[0.15em] text-white"
                >
                  Clear filters
                </button>
              </div>
            )}

            {/* Pagination */}

            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E3DDE7] bg-white text-[#625B70] transition hover:border-[#6539B8] hover:text-[#6539B8] disabled:opacity-30"
                >
                  <ChevronLeft size={14} />
                </button>

                {Array.from(
                  {
                    length: totalPages,
                  },
                  (_, index) => index + 1,
                ).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`flex h-9 min-w-9 items-center justify-center rounded-full px-2 text-[9px] font-medium transition ${
                      currentPage === page
                        ? "bg-[#6539B8] text-white shadow-[0_5px_15px_rgba(101,57,184,0.18)]"
                        : "border border-[#E3DDE7] bg-white text-[#625B70] hover:border-[#6539B8] hover:text-[#6539B8]"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((page) => Math.min(totalPages, page + 1))
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E3DDE7] bg-white text-[#625B70] transition hover:border-[#6539B8] hover:text-[#6539B8] disabled:opacity-30"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================
          FOOTER
      ========================================== */}

      <Footer />
    </main>
  );
}
