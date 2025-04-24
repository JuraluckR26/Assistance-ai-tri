// import { NextRequest, NextResponse } from 'next/server'

// export async function POST(req: NextRequest) {
//   const body = await req.json()

//   const apiRes = await fetch("https://webapp-ai-api.azurewebsites.net/SearchSpe1Document", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(body),
//   })

//   const data = await apiRes.json()
//   return NextResponse.json(data)
// }