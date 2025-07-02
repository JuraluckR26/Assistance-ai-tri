import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const { getKeyword } = await req.json();

    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/GetCosmosDb`,
      { getKeyword },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return NextResponse.json(data);
    
  } catch (error) {
    console.error("GetCosmosDb error", error);
    return NextResponse.json({ message: "Search error" }, { status: 500 });
  }
}