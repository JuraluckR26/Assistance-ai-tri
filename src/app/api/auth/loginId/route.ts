import { NextRequest, NextResponse } from 'next/server';
import httpClient from '@/lib/api/httpClient';

export async function POST(req: NextRequest) {
  try {
    const { loginId } = await req.json();

    const response = await httpClient.post("GetMiraiAuthenByLoginId2", loginId);

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Login auth error:', error);
    return NextResponse.json(
      { IsAuthenticated: false, LoginId: '' },
      { status: 401 }
    );
  }
}