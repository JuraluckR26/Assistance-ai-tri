import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers';

export async function GET(req: NextRequest) {  
  const url = new URL(req.url)
  const code = url.searchParams.get("code")
  const error = url.searchParams.get("error")

  if (error) {
    console.warn("OAuth error:", error)
    const redirectUrl = new URL("/api/auth/glogin/start?fallback=1", process.env.NEXT_PUBLIC_BASE_URL)
    return NextResponse.redirect(redirectUrl)
  }

  if (!code) {
    const redirectUrl = new URL("/api/auth/glogin/start?fallback=1", process.env.NEXT_PUBLIC_BASE_URL)
    return NextResponse.redirect(redirectUrl)
  }

  const requestHeaders = await headers();
  const protocol = requestHeaders.get('x-forwarded-proto') || 'https'; // ดึง protocol (http/https)
  const host = requestHeaders.get('x-forwarded-host'); // ดึง host (domain จริง)
  const baseUrl = `${protocol}://${host}`;

  // แลก code เป็น token
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
      grant_type: 'authorization_code',
    }),
  })

  const tokenJson = await tokenRes.json()
  const accessToken = tokenJson.access_token

  // ดึงข้อมูลผู้ใช้จาก Google
  const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  const profile = await userInfo.json()

  const email = profile.email

  const redirectDestination = new URL('/', baseUrl);
  const response = NextResponse.redirect(redirectDestination);

  response.cookies.set('email', email, { path: '/', maxAge: 60 * 5, httpOnly: false });

  return response
}