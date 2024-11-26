import { createProduct, getListProducts } from "@/models/productModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await getListProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error,
      message: 'Failed to fetch a products'
    }, {
      status: 500
    });
  }
}

export async function POST(request) {
  try {
    const { name, slug,
      description,
      stock_quantity, price_data, selectedColorIds, sizes, brand_id, category_id,
      discount, discount_type, image_urls
    } = await request.json();

    const result = await createProduct(name, slug,
      description, stock_quantity, price_data, selectedColorIds, sizes, brand_id, category_id,
      discount, discount_type, image_urls
    );

    return NextResponse.json(result);
  }
  catch (error) {
    console.log(error);
    return NextResponse.json({
      error,
      message: 'Failed to create new product'
    }, {
      status: 500
    });
  }
}
