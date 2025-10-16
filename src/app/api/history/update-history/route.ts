import httpClient from "@/lib/api/httpClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
      const body = await req.json();
  
      const response = await httpClient.post("UpdateHistory", body);
  
      return NextResponse.json(response.data, { status: 200 });
  
    } catch (error: unknown) {
        console.error("UpdateHistory error:", error);
        
        return NextResponse.json({ message: "Search error" }, { status: 500 });
    }
  }