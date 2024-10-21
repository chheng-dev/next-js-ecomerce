import { createBrand, getListBrands } from "@/models/brandModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const brands = await getListBrands();
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


export async function POST(request) {
  try {
    const { name, slug, icon_url } = await request.json();
    const result = await createBrand(name, slug, icon_url);

    return NextResponse.json(result);
  }
  catch (error) {
    console.log(error);
    return NextResponse.json({
      error,
      message: 'Failed to create new brand'
    }, {
      status: 500
    });
  }
}