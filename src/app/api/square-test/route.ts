import { NextResponse } from "next/server";
import { getRawSquareCatalog } from "@/lib/square/catalog";

export async function GET() {
  try {
    const objects = await getRawSquareCatalog();

    const types = objects.map(
      (object) => object.type,
    );

    const categories = objects
      .filter(
        (object) => object.type === "CATEGORY",
      )
      .map((object) => ({
        id: object.id,
        name: object.categoryData?.name,
      }));

    const items = objects
      .filter(
        (object) => object.type === "ITEM",
      )
      .map((object) => ({
        id: object.id,
        name: object.itemData?.name,
        categories: object.itemData?.categories,
      }));

    const responseData = {
      success: true,
      types: [...new Set(types)],
      categories,
      items,
    };

    /*
     * Square can return bigint values.
     * JSON.stringify cannot serialize bigint values,
     * so convert them to strings first.
     */
    const json = JSON.stringify(
      responseData,
      (_key, value) =>
        typeof value === "bigint"
          ? value.toString()
          : value,
    );

    return new NextResponse(json, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.error("Square API error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ?? "Unknown error",
      },
      { status: 500 },
    );
  }
}