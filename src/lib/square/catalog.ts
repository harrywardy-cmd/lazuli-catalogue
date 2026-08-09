import { squareClient } from "./client";
import { mapSquareCatalog } from "./mapper";
import type { Product } from "@/types/product";

export async function getSquareCatalog(): Promise<Product[]> {
  const response = await squareClient.catalog.list({
    types: "ITEM,ITEM_VARIATION,CATEGORY,IMAGE",
  });

  return mapSquareCatalog(response.data ?? []);
}