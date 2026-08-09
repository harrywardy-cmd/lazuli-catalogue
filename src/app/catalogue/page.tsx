"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
  const [collectionFilter, setCollectionFilter] = useState("All");

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
   * Build the category list dynamically from the
   * categories returned by Square.
   */
  const categories = [
    "All",
    ...Array.from(
      new Set(
        products
          .map((product) => product.category)
          .filter((category): category is string => Boolean(category)),
      ),
    ),
  ];

  /*
   * Filter and sort products.
   */
  const filteredProducts = [...products]
    .filter((product) => {
      // Search
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      // Category
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      // Featured / Trending
      const matchesCollection =
        collectionFilter === "All" ||
        (collectionFilter === "Featured" && product.featured) ||
        (collectionFilter === "Trending" && product.trending);

      return matchesSearch && matchesCategory && matchesCollection;
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
         * Featured products appear first.
         */
        case "featured":
          return Number(b.featured) - Number(a.featured);

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
        <p className="text-sm tracking-wide text-[#514A78]">
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
        <p className="text-sm text-red-500">{error}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F7F4] text-[#29263A]">
      {/* Header */}
      <section className="px-6 pb-12 pt-20 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-[#514A78]">
            Lazuli Collection
          </p>

          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
            Discover the collection.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-[#6E6A7D] md:text-lg">
            Explore our curated selection of unique pieces, all available
            through Lazuli.
          </p>

          {/* Search */}
          <div className="mt-10 max-w-xl">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search the collection..."
              className="w-full rounded-full border border-[#DDD9E6] bg-white px-5 py-4 text-sm outline-none transition placeholder:text-[#9A96A7] focus:border-[#514A78]"
            />
          </div>

          {/* Collection Filters */}
          <div className="mt-8">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#8A8697]">
              Collection
            </p>

            <div className="flex flex-wrap gap-2">
              {["All", "Featured", "Trending"].map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setCollectionFilter(filter)}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    collectionFilter === filter
                      ? "bg-[#514A78] text-white"
                      : "bg-white text-[#514A78] hover:bg-[#E9F8FA]"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filters */}
          <div className="mt-6">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#8A8697]">
              Category
            </p>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    selectedCategory === category
                      ? "bg-[#514A78] text-white"
                      : "bg-white text-[#514A78] hover:bg-[#E9F8FA]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue */}
      <section className="px-6 pb-24 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {/* Catalogue Toolbar */}
          <div className="mb-8 flex flex-col gap-4 border-b border-[#DDD9E6] pb-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[#6E6A7D]">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "item" : "items"}
            </p>

            <div className="flex items-center gap-3">
              <label
                htmlFor="sort"
                className="text-xs uppercase tracking-[0.15em] text-[#8A8697]"
              >
                Sort
              </label>

              <select
                id="sort"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="rounded-full border border-[#DDD9E6] bg-white px-4 py-2 text-sm text-[#514A78] outline-none transition focus:border-[#514A78]"
              >
                <option value="featured">Featured</option>

                <option value="name-asc">Name A → Z</option>

                <option value="name-desc">Name Z → A</option>

                <option value="price-low">Price: Low → High</option>

                <option value="price-high">Price: High → Low</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            /* Empty / No Results State */
            <div className="py-24 text-center">
              <h2 className="text-xl font-medium">No products found</h2>

              <p className="mt-2 text-sm text-[#8A8697]">
                Try adjusting your search or category filter.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                  setCollectionFilter("All");
                  setSortBy("featured");
                }}
                className="mt-6 rounded-full bg-[#514A78] px-5 py-2.5 text-sm text-white transition hover:bg-[#433D66]"
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
