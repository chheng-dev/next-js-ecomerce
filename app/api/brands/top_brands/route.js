import { getTopBrands } from "@/models/brandModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const brands = await getTopBrands();
    return NextResponse.json(brands);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error,
      message: 'Failed to fetch a brands'
    }, {
      status: 500
    });
  }
}