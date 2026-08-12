import { Square } from "square";
import type {
  Product,
  ProductVariation,
} from "@/types/product";

export function mapSquareCatalog(
  objects: Square.CatalogObject[],
): Product[] {
  /*
   * Create a lookup table for Square images.
   */
  const images = new Map<string, string>();

  /*
   * Create a lookup table for Square categories.
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

  /*
   * Convert each Square ITEM into a Lazuli product.
   */
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
     * Get every variation belonging to this item.
     */
    const squareVariations =
      item.variations?.filter(
        (variation) =>
          variation.type ===
          "ITEM_VARIATION",
      ) ?? [];

    /*
     * Ignore products without variations.
     */
    if (squareVariations.length === 0) {
      continue;
    }

    /*
     * Convert Square variations into
     * Lazuli ProductVariation objects.
     */
    const variations = squareVariations
      .map((variation) => {
        if (
          variation.type !== "ITEM_VARIATION" ||
          !variation.id ||
          !variation.itemVariationData
        ) {
          return null;
        }

        const variationData =
          variation.itemVariationData;

        const priceMoney =
          variationData.priceMoney;

        const amount = Number(
          priceMoney?.amount ?? 0,
        );

        const variationImageId =
          variationData.imageIds?.[0];

        const productImageId =
          item.imageIds?.[0];

        const imageUrl =
          variationImageId
            ? images.get(variationImageId)
            : productImageId
              ? images.get(productImageId)
              : undefined;

        return {
          id: variation.id,

          name:
            variationData.name ??
            "Default",

          price: amount / 100,

          currency: String(
            priceMoney?.currency ?? "AUD",
          ),

          stock: 0,

          imageUrl,
        };
      })
      .filter(
        (variation) => variation !== null,
      );

    /*
     * Make sure we still have at least
     * one valid variation.
     */
    if (variations.length === 0) {
      continue;
    }

    /*
     * The first variation is temporarily
     * used as the default product value.
     */
    const defaultVariation =
      variations[0];

    /*
     * Product image.
     */
    const imageId =
      item.imageIds?.[0];

    const imageUrl = imageId
      ? images.get(imageId)
      : undefined;

    /*
     * Product category.
     */
    const categoryId =
      item.categories?.[0]?.id;

    const category = categoryId
      ? categories.get(categoryId)
      : undefined;

    /*
     * Add product.
     */
    products.push({
      id: object.id,

      variationId:
        defaultVariation.id,

      name:
        item.name ??
        "Unnamed Product",

      description:
        item.description ??
        undefined,

      price:
        defaultVariation.price,

      currency:
        defaultVariation.currency,

      imageUrl:
        defaultVariation.imageUrl ??
        imageUrl,

      category,

      stock: 0,

      variations,
    });
  }

  return products;
}