import { NextRequest, NextResponse } from 'next/server';
import httpClient from '@/lib/api/httpClient';

export async function POST(req: NextRequest) {
  try {
    const { getKeyword } = await req.json();

    const { data } = await httpClient.post("GetCosmosDb", {getKeyword});

    return NextResponse.json(data);
    
  } catch (error) {
    console.error("GetCosmosDb error", error);
    return NextResponse.json({ message: "Search error" }, { status: 500 });
  }
}