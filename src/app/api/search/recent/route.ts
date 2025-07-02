import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/SearchRecentDocument`,
      body,
      { headers: { 'Content-Type': 'application/json' } }
    );

    return NextResponse.json(response.data);

  } catch (error) {
    console.error("getResent server error:", error);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}