import { NextRequest, NextResponse } from 'next/server';
import httpClient from '@/lib/api/httpClient';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    const response = await httpClient.post("SearchRecentDocument", body)

    return NextResponse.json(response.data);

  } catch (error) {
    console.error("getResent server error:", error);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}