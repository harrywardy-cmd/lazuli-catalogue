import { squareClient } from "./client";
import { mapSquareCatalog } from "./mapper";
import { getSquareInventory } from "./inventory";
import type { Product } from "@/types/product";
import {
  featuredProducts,
  trendingProducts,
} from "@/lib/catalogue/config";
import type { Square } from "square";

/*
 * Retrieve the complete Square catalogue.
 *
 * Square paginates large catalogues, so we need to
 * retrieve every page before mapping the products.
 */
async function getAllSquareCatalogObjects(): Promise<
  Square.CatalogObject[]
> {
  const objects: Square.CatalogObject[] = [];

  let page = await squareClient.catalog.list({
    types: "ITEM,ITEM_VARIATION,CATEGORY,IMAGE",
  });

  objects.push(...(page.data ?? []));

  /*
   * Continue requesting pages until Square has
   * no more catalogue objects.
   */
  while (page.hasNextPage()) {
    page = await page.getNextPage();

    objects.push(...(page.data ?? []));
  }

  return objects;
}

export async function getSquareCatalog(): Promise<Product[]> {
  const objects =
    await getAllSquareCatalogObjects();

  // Map the complete Square catalogue.
  const products = mapSquareCatalog(objects);

  // Get the variation IDs we need inventory for.
  const variationIds = products.map(
    (product) => product.variationId,
  );

  // Retrieve current inventory from Square.
  const inventory =
    await getSquareInventory(variationIds);

  // Add inventory and Lazuli-specific flags.
  return products.map((product) => ({
    ...product,

    stock:
      inventory.get(product.variationId) ?? 0,

    featured: featuredProducts.includes(
      product.id,
    ),

    trending: trendingProducts.includes(
      product.id,
    ),
  }));
}

/*
 * Return the complete raw Square catalogue.
 *
 * This is mainly useful for debugging.
 */
export async function getRawSquareCatalog() {
  return getAllSquareCatalogObjects();
}