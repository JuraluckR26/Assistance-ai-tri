import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  const { base64 } = await request.json();
  const buffer = Buffer.from(base64, "base64");
  const filePath = path.join(process.cwd(), "public", "song.mp3");

  fs.writeFileSync(filePath, buffer);

  return NextResponse.json({
    message: "Saved successfully",
    fileUrl: "/song.mp3",
  });
}
