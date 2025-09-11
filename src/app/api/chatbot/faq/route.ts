import { NextRequest, NextResponse } from 'next/server';
import httpClient from '@/lib/api/httpClient';

export async function POST(req: NextRequest) {
  try {
    const { getKeyword, assistantName } = await req.json();

    const { data } = await httpClient.post("GetAssistantData", {getKeyword, assistantName});
    
    return NextResponse.json(data);
    
  } catch (error) {
    console.error("GetAssistantData error", error);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}