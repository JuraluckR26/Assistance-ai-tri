import { NextRequest, NextResponse } from 'next/server';
import httpClient from '@/lib/api/httpClient';

export async function POST(req: NextRequest) {
  try {
    const { searchContent, loginId, system, module, function: functionName } = await req.json();

    const { data } = await httpClient.post("SearchSpeKJDAllNew3", {
      searchContent,
      loginId,
      system: system,
      module: module,
      function: functionName || "", // ใช้ bracket notation เพื่อหลีกเลี่ยง reserved keyword
    });
    
    return NextResponse.json(data);
    
  } catch (error) {
    console.error("SearchDocument error", error);
    return NextResponse.json({ message: "Search error" }, { status: 500 });
  }
}