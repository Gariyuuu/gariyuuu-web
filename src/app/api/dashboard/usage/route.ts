import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/dashboard-auth";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const sessionSecret = process.env.DASHBOARD_SESSION_SECRET;
  const adminUrl = process.env.AI_PLATFORM_ADMIN_URL;
  const adminSecret = process.env.AI_PLATFORM_ADMIN_SECRET;
  if (!sessionSecret || !adminUrl || !adminSecret) {
    return NextResponse.json({ error: "Dashboard is not configured." }, { status: 500 });
  }

  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!verifySessionToken(token, sessionSecret)) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const hours = req.nextUrl.searchParams.get("hours") ?? String(24 * 30);

  let upstream: Response;
  try {
    upstream = await fetch(`${adminUrl}/admin/usage?hours=${encodeURIComponent(hours)}`, {
      headers: { Authorization: `Bearer ${adminSecret}` },
      cache: "no-store",
    });
  } catch {
    return NextResponse.json({ error: "The AI platform is unreachable right now." }, { status: 503 });
  }

  if (!upstream.ok) {
    return NextResponse.json({ error: "Failed to load usage data." }, { status: upstream.status });
  }

  const data = await upstream.json();
  return NextResponse.json(data);
}
