import { getTopCategory } from "@/models/categoryModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await getTopCategory();
    return NextResponse.json(categories);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error,
      message: 'Failed to fetch a categories'
    }, {
      status: 500
    });
  }
}