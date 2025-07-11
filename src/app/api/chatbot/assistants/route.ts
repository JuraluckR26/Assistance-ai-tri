import { NextRequest, NextResponse } from 'next/server';
import httpClient from '@/lib/api/httpClient';

export async function POST(req: NextRequest) {
  try {
    const { loginId } = await req.json();

    const { data } = await httpClient.post("GetChatAuthorizedByLoginId", {loginId});

    return NextResponse.json(data);
  } catch (error) {
    console.error("SearchDocument error", error);
    return NextResponse.json({ message: "Search error" }, { status: 500 });
  }
}