import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ error: "Invalid secret" }, { status: 401 });
  }

  revalidateTag("wp-posts", "max");

  return Response.json({ revalidated: true, at: new Date().toISOString() });
}

export async function POST(request: NextRequest) {
  return GET(request);
}
