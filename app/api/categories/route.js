import { createCategory, getCategories } from "@/models/categoryModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await getCategories();
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

export async function POST(request) {
  try {
    const { title, color } = await request.json();
    const newCategory = await createCategory(title, color);

    return NextResponse.json(newCategory);
  }
  catch (error) {
    console.log(error);
    return NextResponse.json({
      error,
      message: 'Failed to create a category'
    }, {
      status: 500
    });
  }
}