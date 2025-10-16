import { NextRequest, NextResponse } from 'next/server';
import httpClient from '@/lib/api/httpClient';

export async function POST(req: NextRequest) {
  try {
    const { data } = await req.json();

    const response = await httpClient.post("GetAuthenByLogin2", data);

    return NextResponse.json(response.data);
    
  } catch (error) {
    console.error('User Password auth error:', error);
    return NextResponse.json(
      { IsAuthenticated: false, LoginId: '', IsCanChat: false, IsPilot: false },
      { status: 401 }
    );
  }
}