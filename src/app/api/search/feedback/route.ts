import { NextRequest, NextResponse } from 'next/server';
import httpClient from '@/lib/api/httpClient';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { data } = await httpClient.post("SaveCosmosDb", body);

    return NextResponse.json(data);
    
  } catch (error) {
    console.error("Feedback error", error);
    return NextResponse.json({ message: "Search error" }, { status: 500 });
  }
}