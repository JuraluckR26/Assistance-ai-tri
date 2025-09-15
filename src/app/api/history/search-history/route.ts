import { NextRequest, NextResponse } from 'next/server';
import httpClient from '@/lib/api/httpClient';
import { RequestSearchHistory, ResponseHistory } from '@/types/history.type';
import { validateHistoryRequest, sanitizeHistoryRequest } from '@/utils/historyValidation';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await httpClient.post("GetSearchHistory", body);

    const historyData: ResponseHistory = response.data;

    return NextResponse.json(historyData, { status: 200 });

  } catch (error: any) {
    console.error("GetHistory error:", error);
    
    if (error.response) {
      return NextResponse.json(
        { 
          message: "External API error", 
          details: error.response.data?.message || "Unknown API error" 
        },
        { status: error.response.status || 500 }
      );
    } else if (error.request) {
      return NextResponse.json(
        { message: "Network error - unable to reach external API" },
        { status: 503 }
      );
    } else {
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }
  }
}