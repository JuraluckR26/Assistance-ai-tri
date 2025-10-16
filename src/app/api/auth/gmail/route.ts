import { NextRequest, NextResponse } from 'next/server';
import httpClient from '@/lib/api/httpClient';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    
    const response = await httpClient.post("GetAuthenByEmail2", {email});

    return NextResponse.json(response.data);

  } catch (error) {
    console.error('User Password auth error:', error);
    return NextResponse.json(
      { IsAuthenticated: false, LoginId: '', IsCanChat: false, IsPilot: false },
      { status: 401 }
    );
  }
}