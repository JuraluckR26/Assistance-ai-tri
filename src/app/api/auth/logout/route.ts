import { NextRequest, NextResponse } from 'next/server';
import httpClient from '@/lib/api/httpClient';

export async function POST(req: NextRequest) {
  try {
    const { loginId } = await req.json();

    if (!loginId) {
        return NextResponse.json(
          { Status: "error", StatusMessage: "LoginId is required", Location: "/login" },
          { status: 400 }
        );
    }

    const response = await httpClient.post("MiraiLogoutAzureAPI", { loginId });

    if (!response.data) {
      throw new Error("Invalid response from logout API");
    }

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    console.error('Login auth error:', error);

    let message = 'Logout failed';
    let statusCode = 500;

    if (error instanceof Error) {
      message = error.message;
    }

    if (typeof error === 'object' && error !== null && 'response' in error) {
      const axiosError = error as { response?: { status?: number } };
      statusCode = axiosError.response?.status || 500;
    }

    return NextResponse.json(
      { 
        Status: "error", 
        StatusMessage: message, 
        Location: "/login" 
      },
      { status: statusCode }
    );
  }
}