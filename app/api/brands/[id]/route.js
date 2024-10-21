import { deleteFile, extractFileIdFromUrl } from "@/lib/uploadthing";
import { deleteBrandById, getBrandById, updateBrand } from "@/models/brandModel";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  try {
    if (!id) {
      return NextResponse.json(
        { message: 'Brand Id is required' },
        { status: 400 }
      )
    }

    const brand = await getBrandById(id);

    if (!brand) {
      return NextResponse.json(
        { message: 'Brand not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(brand);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: 'Failed to fetch brand',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const id = params.id;
  try {
    const { name, slug, icon_url } = await request.json();

    if (!name, !slug, !icon_url) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await updateBrand(id, name, slug, icon_url);

    if (!result) {
      return NextResponse.json(
        { message: 'Brand not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error,
      message: 'Failed to update brand'
    }, {
      status: 500
    });
  }
}

export async function DELETE(request) {
  try {
    const body = await request.json();
    console.log(body)
    if (!body || !body.brandId || !body.iconUrl) {
      return NextResponse.json({ message: 'Missing brandId or iconUrl in the request' }, { status: 400 });
    }

    const { brandId, iconUrl } = body;

    console.log('Deleting brand with ID:', brandId);

    const deleteResult = await deleteBrandById(brandId)

    console.log('Delete result:', deleteResult.rows);

    if (!deleteResult.rowCount) {
      return NextResponse.json({ message: 'Brand not found' }, { status: 404 });
    }

    const fileId = extractFileIdFromUrl(iconUrl);

    if (fileId) {
      await deleteFile([fileId]);
    }

    return NextResponse.json({ message: 'Brand deleted successfully' });
  } catch (error) {
    console.error('Error deleting brand:', error);
    return NextResponse.json({ error: error.message, message: 'Failed to delete the brand' }, { status: 500 });
  }
}