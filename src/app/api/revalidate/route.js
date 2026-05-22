// app/api/revalidate/route.js
import { revalidateTag } from "next/cache"
import { NextResponse } from "next/server"

export async function POST(req) {
  if (req.headers.get("x-secret") !== process.env.REVALIDATE_SECRET)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  revalidateTag("shopify") // nukes everything, or use specific tag
  return NextResponse.json({ ok: true })
}