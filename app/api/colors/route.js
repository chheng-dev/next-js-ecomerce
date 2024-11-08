import { getListColors } from "@/models/colorModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const colors = await getListColors();
    return NextResponse.json(colors);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error,
      message: 'Failed to fetch a colors'
    }, {
      status: 500
    });
  }
}