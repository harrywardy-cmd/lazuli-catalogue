"use client";

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
};

export default function CataloguePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Loading catalogue...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-semibold mb-8">
        Catalogue
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <article key={product.id}>
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full aspect-square object-cover rounded-xl"
              />
            )}

            <div className="mt-4">
              <h2 className="text-lg font-medium">
                {product.name}
              </h2>

              <p className="mt-1">
                ${product.price.toFixed(2)} {product.currency}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {product.stock > 0
                  ? `${product.stock} available`
                  : "Currently unavailable"}
              </p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}