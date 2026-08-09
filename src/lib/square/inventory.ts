import { squareClient } from "./client";

export async function getSquareInventory(
  variationIds: string[]
) {
  if (variationIds.length === 0) {
    return [];
  }

  const response = await squareClient.inventory.batchGetCounts({
    catalogObjectIds: variationIds,
  });

  return response;
}