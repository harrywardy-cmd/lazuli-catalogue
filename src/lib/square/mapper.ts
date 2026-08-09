import { Square } from "square";
import type { Product } from "@/types/product";

export function mapSquareCatalog(
  objects: Square.CatalogObject[]
): Product[] {
  // Create a lookup table:
  // Square gives us image IDs on products and the actual
  // image URLs as separate IMAGE objects.
  const images = new Map<string, string>();

  for (const object of objects) {
    if (
      object.type === "IMAGE" &&
      object.id &&
      object.imageData?.url
    ) {
      images.set(object.id, object.imageData.url);
    }
  }

  const products: Product[] = [];

  for (const object of objects) {
    // We only want actual products.
    if (
      object.type !== "ITEM" ||
      !object.id ||
      !object.itemData
    ) {
      continue;
    }

    const item = object.itemData;

    // Square can have multiple variations for an item.
    // For now, use the first ITEM_VARIATION.
    const variation = item.variations?.find(
      (variation) => variation.type === "ITEM_VARIATION"
    );

    if (
      !variation ||
      variation.type !== "ITEM_VARIATION" ||
      !variation.id ||
      !variation.itemVariationData
    ) {
      continue;
    }

    const priceMoney = variation.itemVariationData.priceMoney;

    const amount = Number(priceMoney?.amount ?? 0);

    const imageId = item.imageIds?.[0];

    products.push({
      id: object.id,
      variationId: variation.id,
      name: item.name ?? "Unnamed Product",
      description: item.description ?? undefined,
      price: amount / 100,
      currency: priceMoney?.currency ?? "AUD",
      imageUrl: imageId
        ? images.get(imageId)
        : undefined,
      stock: 0,
    });
  }

  return products;
}