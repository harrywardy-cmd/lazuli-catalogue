import { squareClient } from "./client";
import { mapSquareCatalog } from "./mapper";
import { getSquareInventory } from "./inventory";
import type { Product } from "@/types/product";
import { featuredProducts, trendingProducts } from "@/lib/catalogue/config";

export async function getSquareCatalog(): Promise<Product[]> {
  const response = await squareClient.catalog.list({
    types: "ITEM,ITEM_VARIATION,CATEGORY,IMAGE",
  });

  const objects = response.data ?? [];

  // First map the Square catalogue into our Product format.
  const products = mapSquareCatalog(objects);

  // Get the variation IDs we need inventory for.
  const variationIds = products.map(
    (product) => product.variationId
  );

  // Retrieve the current inventory from Square.
  const inventory = await getSquareInventory(variationIds);

  // Add the real stock quantity to each product.
  return products.map((product) => ({
    ...product,
    stock: inventory.get(product.variationId) ?? 0,
    featured: featuredProducts.includes(product.id),
    trending: trendingProducts.includes(product.id),
  }));
}