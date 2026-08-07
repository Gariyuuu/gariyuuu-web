import { cookies } from "next/headers";
import type { Metadata } from "next";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/dashboard-auth";
import { DashboardLoginForm } from "@/components/dashboard-login-form";
import { UsageDashboard } from "@/components/usage-dashboard";

export const metadata: Metadata = {
  title: "Dashboard — gariyuuu.com",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const secret = process.env.DASHBOARD_SESSION_SECRET;
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  const authenticated = Boolean(secret) && verifySessionToken(token, secret!);

  if (!authenticated) {
    return <DashboardLoginForm />;
  }

  return <UsageDashboard />;
}
