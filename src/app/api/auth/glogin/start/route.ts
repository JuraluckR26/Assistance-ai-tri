import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const fallback = url.searchParams.get("fallback") === "1"

  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth'
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'offline',
    prompt: fallback ? 'consent' : 'none', // fallback เป็น consent
  })

  return NextResponse.redirect(`${rootUrl}?${params.toString()}`)
}