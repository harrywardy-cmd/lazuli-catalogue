import { NextResponse } from "next/server";
import { getSquareInventory } from "@/lib/square/inventory";

export async function GET() {
  try {
    const variationIds = [
      "RPR6C7WCWG3JGI6YDT45CXJP",
    ];

    const inventory = await getSquareInventory(variationIds);

    return NextResponse.json({
      success: true,
      inventory,
    });
  } catch (error: any) {
    console.error("Square Inventory API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message ?? "Unknown error",
      },
      { status: 500 }
    );
  }
}