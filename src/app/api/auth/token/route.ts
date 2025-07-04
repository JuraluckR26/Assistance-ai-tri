import { NextRequest, NextResponse } from 'next/server';
import httpClient from '@/lib/api/httpClient';

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    const response = await httpClient.post("GetMiraiAuthenByTokenId", token);

    return NextResponse.json(response.data);
    
  } catch (error) {
    console.error('Token auth error:', error);
    return NextResponse.json(
      { IsAuthenticated: false, LoginId: '' },
      { status: 401 }
    );
  }
}