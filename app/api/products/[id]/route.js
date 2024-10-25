import { deleteProduct, getProductById } from "@/models/productModel";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    if (!id) {
      return NextResponse.json(
        { message: 'Product Id not found' },
        { status: 400 }
      )
    }

    await deleteProduct(id);

    return NextResponse.json({
      message: 'Product has been deleted :)'
    }, {
      status: 204
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error,
      message: 'Failed to delete product'
    }, {
      status: 500
    });
  }
}

export async function GET(request, { params }) {
  const { id } = params;
  try {
    if (!id) {
      return NextResponse.json(
        { message: 'Product Id is required' },
        { status: 400 }
      )
    }

    const product = await getProductById(id);
    return NextResponse.json(product, { status: 200 })
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: 'Failed to fetch product',
        error: error.message,
      },
      { status: 500 }
    );
  }
}