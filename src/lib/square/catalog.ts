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

  /*
   * Convert Square catalogue objects into
   * Lazuli products and their variations.
   */
  const products =
    mapSquareCatalog(objects);

  /*
   * Collect EVERY variation ID.
   *
   * Previously we only collected:
   *
   * product.variationId
   *
   * which meant only one variation received
   * inventory information.
   */
  const variationIds = products.flatMap(
    (product) =>
      product.variations.map(
        (variation) => variation.id,
      ),
  );

  /*
   * Retrieve current inventory from Square
   * for every variation.
   */
  const inventory =
    await getSquareInventory(
      variationIds,
    );

  /*
   * Add inventory to each variation.
   */
  return products.map((product) => {
    const variations =
      product.variations.map(
        (variation) => ({
          ...variation,

          stock:
            inventory.get(
              variation.id,
            ) ?? 0,
        }),
      );

    /*
     * Calculate the total stock for the
     * entire product.
     *
     * Example:
     *
     * Gojo   = 5
     * Geto   = 7
     * Satoru = 3
     *
     * Product stock = 15
     */
    const totalStock =
      variations.reduce(
        (total, variation) =>
          total + variation.stock,
        0,
      );

    /*
     * Keep the first variation as the
     * temporary/default variation.
     *
     * This allows the existing catalogue
     * components to continue working while
     * we update the UI.
     */
    const defaultVariation =
      variations[0];

    return {
      ...product,

      /*
       * All variations with current stock.
       */
      variations,

      /*
       * Keep existing product-level fields
       * for backwards compatibility.
       */
      stock: totalStock,

      price:
        defaultVariation?.price ??
        product.price,

      currency:
        defaultVariation?.currency ??
        product.currency,

      imageUrl:
        defaultVariation?.imageUrl ??
        product.imageUrl,

      variationId:
        defaultVariation?.id ??
        product.variationId,

      /*
       * Lazuli-specific flags.
       */
      featured:
        featuredProducts.includes(
          product.id,
        ),

      trending:
        trendingProducts.includes(
          product.id,
        ),
    };
  });
}

/*
 * Return the complete raw Square catalogue.
 *
 * This is mainly useful for debugging.
 */
export async function getRawSquareCatalog() {
  return getAllSquareCatalogObjects();
}