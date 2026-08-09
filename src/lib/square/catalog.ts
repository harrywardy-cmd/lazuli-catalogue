import { squareClient } from "./client";

export async function getSquareCatalog() {
  const response = await squareClient.catalog.list({
    types: "ITEM,ITEM_VARIATION,CATEGORY,IMAGE",
  });

  return response;
}