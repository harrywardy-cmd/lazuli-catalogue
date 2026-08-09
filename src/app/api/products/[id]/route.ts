import { NextResponse } from "next/server";
import { getSquareCatalog } from "@/lib/square/catalog";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const products = await getSquareCatalog();

    const product = products.find(
      (product) => product.id === id
    );

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: "Product not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Product API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to load product",
      },
      { status: 500 }
    );
  }
}