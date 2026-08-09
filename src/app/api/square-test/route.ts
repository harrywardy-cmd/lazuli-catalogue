import { NextResponse } from "next/server";
import { getSquareCatalog } from "@/lib/square/catalog";

export async function GET() {
  try {
    const catalog = await getSquareCatalog();

    // Square's SDK can return BigInt values.
    // JSON.stringify cannot serialize BigInt by default,
    // so convert BigInt values to strings first.
    const body = JSON.stringify(
      {
        success: true,
        catalog,
      },
      (_, value) => (typeof value === "bigint" ? value.toString() : value)
    );

    return new NextResponse(body, {
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
        error: error?.message ?? "Unknown error",
      },
      { status: 500 }
    );
  }
}