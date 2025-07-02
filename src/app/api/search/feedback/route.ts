import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/SaveCosmosDb`,
      body,
      { headers: { 'Content-Type': 'application/json' } }
    );

    return NextResponse.json(data);
    
  } catch (error) {
    console.error("Feedback error", error);
    return NextResponse.json({ message: "Search error" }, { status: 500 });
  }
}