"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        const response = await fetch(
          `/api/products/${params.id}`
        );

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();

        setProduct(data.product);
      } catch (error) {
        console.error(error);
        setError("Unable to load product");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [params.id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F8F7F4] flex items-center justify-center">
        <p className="text-sm tracking-wide text-[#514A78]">
          Loading product...
        </p>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="min-h-screen bg-[#F8F7F4] flex flex-col items-center justify-center">
        <h1 className="text-xl font-medium">
          Product not found
        </h1>

        <Link
          href="/catalogue"
          className="mt-6 rounded-full bg-[#514A78] px-5 py-2.5 text-sm text-white"
        >
          Back to catalogue
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F7F4] text-[#29263A]">
      <section className="px-6 pb-24 pt-12 md:px-10 md:pt-20 lg:px-16">
        <div className="mx-auto max-w-7xl">

          {/* Back */}
          <Link
            href="/catalogue"
            className="inline-flex text-sm text-[#6E6A7D] transition hover:text-[#514A78]"
          >
            ← Back to collection
          </Link>

          {/* Product */}
          <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-20">

            {/* Image */}
            <div className="aspect-square overflow-hidden rounded-3xl bg-white">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-[#8A8697]">
                  No image available
                </div>
              )}
            </div>

            {/* Information */}
            <div className="flex flex-col justify-center">

              {product.category && (
                <p className="text-xs uppercase tracking-[0.3em] text-[#514A78]">
                  {product.category}
                </p>
              )}

              <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                {product.name}
              </h1>

              <p className="mt-6 text-xl text-[#514A78]">
                ${product.price.toFixed(2)} {product.currency}
              </p>

              <div className="mt-6">
                <span
                  className={`inline-flex rounded-full px-4 py-2 text-sm ${
                    product.stock > 0
                      ? "bg-[#E9F8FA] text-[#514A78]"
                      : "bg-[#29263A] text-white"
                  }`}
                >
                  {product.stock > 0
                    ? `${product.stock} available`
                    : "Currently unavailable"}
                </span>
              </div>

              {product.description && (
                <div className="mt-10 border-t border-[#DDD9E6] pt-8">
                  <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-[#514A78]">
                    About this piece
                  </h2>

                  <p className="mt-4 max-w-xl text-base leading-8 text-[#6E6A7D]">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Catalogue-only CTA */}
              <div className="mt-10 border-t border-[#DDD9E6] pt-8">
                <p className="text-sm leading-6 text-[#6E6A7D]">
                  Interested in this piece? Contact Lazuli for
                  availability and further information.
                </p>

                <Link
                  href="/contact"
                  className="mt-5 inline-flex rounded-full bg-[#514A78] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#433D66]"
                >
                  Contact Lazuli
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}