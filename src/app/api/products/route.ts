import { NextResponse } from "next/server";
import { getSquareCatalog } from "@/lib/square/catalog";

export async function GET() {
  try {
    const products = await getSquareCatalog();

    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Products API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to load products",
      },
      { status: 500 }
    );
  }
}