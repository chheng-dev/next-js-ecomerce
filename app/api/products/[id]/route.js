import { deleteProduct, getProductById, updateProductById } from "@/models/productModel";
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
      status: 201
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

export async function PUT(request, { params }) {
  const id = params.id;
  const body = await request.json();

  const {
    name,
    slug,
    description,
    stock_quantity,
    price_data,
    selectedColorIds,
    sizes,
    brand_id,
    category_id,
    discount,
    discount_type,
    image_urls
  } = body;

  try {
    if (
      !name ||
      !stock_quantity ||
      !price_data ||
      !selectedColorIds ||
      !sizes ||
      !brand_id ||
      !category_id
    ) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Call the function to update the product
    const data = await updateProductById(
      id,
      name,
      slug,
      description,
      stock_quantity,
      price_data,
      selectedColorIds,
      sizes,
      brand_id,
      category_id,
      discount,
      discount_type,
      image_urls,
    );

    if (!data) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      data,
      message: 'Product updated successfully',
    }, { status: 200 });

  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      {
        message: 'Failed to update product',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
