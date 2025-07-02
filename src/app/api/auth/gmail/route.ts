import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/GetAuthenByEmail`,
      { email },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return NextResponse.json(response.data);

  } catch (error) {
    console.error('User Password auth error:', error);
    return NextResponse.json(
      { IsAuthenticated: false, LoginId: '' },
      { status: 401 }
    );
  }
}