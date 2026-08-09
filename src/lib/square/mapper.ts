import { Square } from "square";
import type { Product } from "@/types/product";

export function mapSquareCatalog(
  objects: Square.CatalogObject[],
): Product[] {
  /*
   * Create a lookup table for Square images.
   *
   * Square gives products image IDs, while the actual
   * image URLs are returned as separate IMAGE objects.
   */
  const images = new Map<string, string>();

  /*
   * Create a lookup table for Square categories.
   *
   * Products store the category ID, while the CATEGORY
   * object contains the actual category name.
   */
  const categories = new Map<string, string>();

  for (const object of objects) {
    /*
     * Store image URLs.
     */
    if (
      object.type === "IMAGE" &&
      object.id &&
      object.imageData?.url
    ) {
      images.set(
        object.id,
        object.imageData.url,
      );
    }

    /*
     * Store category names.
     */
    if (
      object.type === "CATEGORY" &&
      object.id &&
      object.categoryData?.name
    ) {
      categories.set(
        object.id,
        object.categoryData.name,
      );
    }
  }

  const products: Product[] = [];

  for (const object of objects) {
    /*
     * We only want actual ITEM objects.
     */
    if (
      object.type !== "ITEM" ||
      !object.id ||
      !object.itemData
    ) {
      continue;
    }

    const item = object.itemData;

    /*
     * Square can have multiple variations for an item.
     *
     * For now, use the first ITEM_VARIATION.
     */
    const variation = item.variations?.find(
      (variation) =>
        variation.type === "ITEM_VARIATION",
    );

    if (
      !variation ||
      variation.type !== "ITEM_VARIATION" ||
      !variation.id ||
      !variation.itemVariationData
    ) {
      continue;
    }

    /*
     * Get the price from the variation.
     */
    const priceMoney =
      variation.itemVariationData.priceMoney;

    const amount = Number(
      priceMoney?.amount ?? 0,
    );

    /*
     * Get the first product image.
     */
    const imageId = item.imageIds?.[0];

    const imageUrl = imageId
      ? images.get(imageId)
      : undefined;

    /*
     * Get the first Square category assigned
     * to this product.
     */
    const categoryId =
      item.categories?.[0]?.id;

    const category = categoryId
      ? categories.get(categoryId)
      : undefined;

    /*
     * Add the product to our application's
     * Product format.
     */
    products.push({
      id: object.id,
      variationId: variation.id,
      name:
        item.name ?? "Unnamed Product",
      description:
        item.description ?? undefined,
      price: amount / 100,
      currency:
        priceMoney?.currency ?? "AUD",
      imageUrl,
      category,
      stock: 0,
    });
  }

  return products;
}