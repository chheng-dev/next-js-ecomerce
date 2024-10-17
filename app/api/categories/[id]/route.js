import { deleteCategoryById, getCategoryById, updateCategory } from "@/models/categoryModel";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    const catId = params.id;
    await deleteCategoryById(catId);
    return NextResponse.json({ message: 'Category has been deleted :)' });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error,
      message: 'Failed to delete categoryr'
    }, {
      status: 500
    });
  }
}

export async function GET(request, { params }) {
  const { id } = params
  try {
    if (!id) {
      return NextResponse.json(
        { message: 'Category Id is required' },
        { status: 400 }
      );
    }

    const category = await getCategoryById(id);

    if (!category) {
      return NextResponse.json(
        { message: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: 'Failed to fetch category',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const id = params.id;

  try {
    const { title, color } = await request.json();

    if (!id || !title || !color) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const updatedCategory = await updateCategory(id, title, color);

    if (!updatedCategory) {
      return NextResponse.json(
        { message: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedCategory, { status: 200 });

  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      {
        message: 'Failed to update category',
        error: error.message,
      },
      { status: 500 }
    );
  }
}