import { NextRequest, NextResponse } from "next/server";
import { createSessionToken, SESSION_COOKIE } from "@/lib/dashboard-auth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const secret = process.env.DASHBOARD_SESSION_SECRET;
  const password = process.env.DASHBOARD_PASSWORD;
  const allowedEmailsRaw = process.env.DASHBOARD_ALLOWED_EMAILS;
  if (!secret || !password || !allowedEmailsRaw) {
    return NextResponse.json({ error: "Dashboard is not configured." }, { status: 500 });
  }
  const allowedEmails = allowedEmailsRaw.split(",").map((e) => e.trim().toLowerCase());

  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const submittedPassword = typeof body?.password === "string" ? body.password : "";

  if (!allowedEmails.includes(email) || submittedPassword !== password) {
    return NextResponse.json({ error: "Incorrect email or password." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, createSessionToken(secret), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
