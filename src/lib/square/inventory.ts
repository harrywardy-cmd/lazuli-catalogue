import { squareClient } from "./client";

export async function getSquareInventory(
  variationIds: string[]
): Promise<Map<string, number>> {
  if (variationIds.length === 0) {
    return new Map();
  }

  const response = await squareClient.inventory.batchGetCounts({
    catalogObjectIds: variationIds,
  });

  const inventory = new Map<string, number>();

  for (const count of response.data ?? []) {
    if (!count.catalogObjectId) {
      continue;
    }

    const quantity = Number(count.quantity ?? 0);

    inventory.set(count.catalogObjectId, quantity);
  }

  return inventory;
}