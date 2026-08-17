"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ThinkingOrb } from "thinking-orbs";

interface KeyUsage {
  id: string;
  name: string;
  key_prefix: string;
  enabled: boolean;
  last_used_at: string | null;
  total_requests: number;
  total_input_tokens: number;
  total_output_tokens: number;
  total_tokens: number;
  error_count: number;
}

interface UsageResponse {
  period_start: string;
  period_end: string;
  keys: KeyUsage[];
}

// Real OpenRouter pricing for Qwen3-8B as of the platform's setup - update if the
// provider/model changes. Used only for a rough cost estimate, not billed truth.
const INPUT_PRICE_PER_M = 0.117;
const OUTPUT_PRICE_PER_M = 0.455;

function estimateCost(k: KeyUsage): number {
  return (k.total_input_tokens / 1_000_000) * INPUT_PRICE_PER_M + (k.total_output_tokens / 1_000_000) * OUTPUT_PRICE_PER_M;
}

function formatNumber(n: number): string {
  return n.toLocaleString();
}

const WINDOWS = [
  { label: "24h", hours: 24 },
  { label: "7d", hours: 24 * 7 },
  { label: "30d", hours: 24 * 30 },
];

export function UsageDashboard() {
  const [data, setData] = useState<UsageResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hours, setHours] = useState(24 * 30);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Fetch-on-dependency-change: a standard, functionally-correct pattern this
    // lint rule is stricter about than warranted for a simple data fetch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    fetch(`/api/dashboard/usage?hours=${hours}`)
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => ({ error: "Failed to load." }));
          throw new Error(body.error ?? "Failed to load.");
        }
        return res.json();
      })
      .then((d) => setData(d))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [hours]);

  async function logout() {
    await fetch("/api/dashboard/logout", { method: "POST" });
    router.refresh();
  }

  const totals = data?.keys.reduce(
    (acc, k) => ({
      requests: acc.requests + k.total_requests,
      tokens: acc.tokens + k.total_tokens,
      cost: acc.cost + estimateCost(k),
    }),
    { requests: 0, tokens: 0, cost: 0 }
  );

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Usage Dashboard</h1>
          <p className="text-sm text-muted">Live, per-app usage across the AI platform.</p>
        </div>
        <button onClick={logout} className="text-sm text-muted hover:text-foreground">
          Log out
        </button>
      </div>

      <div className="mb-6 flex gap-2">
        {WINDOWS.map((w) => (
          <button
            key={w.label}
            onClick={() => setHours(w.hours)}
            className={
              "rounded-full px-3 py-1 text-sm transition-colors " +
              (hours === w.hours
                ? "bg-gradient-to-r from-accent to-accent-2 text-accent-fg"
                : "border border-border text-muted hover:bg-surface-2")
            }
          >
            {w.label}
          </button>
        ))}
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-sm text-muted">
          <ThinkingOrb state="working" size={20} aria-label="Loading usage data" />
          Loading...
        </div>
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {totals && (
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="card p-5">
            <p className="text-xs uppercase tracking-wider text-muted">Total requests</p>
            <p className="mt-1 text-2xl font-semibold">{formatNumber(totals.requests)}</p>
          </div>
          <div className="card p-5">
            <p className="text-xs uppercase tracking-wider text-muted">Total tokens</p>
            <p className="mt-1 text-2xl font-semibold">{formatNumber(totals.tokens)}</p>
          </div>
          <div className="card p-5">
            <p className="text-xs uppercase tracking-wider text-muted">Est. cost</p>
            <p className="mt-1 text-2xl font-semibold">${totals.cost.toFixed(4)}</p>
          </div>
        </div>
      )}

      {data && (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted">
                <th className="px-4 py-3 font-medium">App</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 text-right font-medium">Requests</th>
                <th className="px-4 py-3 text-right font-medium">Tokens</th>
                <th className="px-4 py-3 text-right font-medium">Est. cost</th>
                <th className="px-4 py-3 text-right font-medium">Errors</th>
              </tr>
            </thead>
            <tbody>
              {[...data.keys]
                .sort((a, b) => b.total_tokens - a.total_tokens)
                .map((k) => (
                  <tr key={k.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3">
                      <div className="font-medium">{k.name}</div>
                      <div className="font-mono text-xs text-muted">{k.key_prefix}...</div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          "inline-block h-2 w-2 rounded-full " + (k.enabled ? "bg-green-500" : "bg-red-500")
                        }
                      />
                    </td>
                    <td className="px-4 py-3 text-right">{formatNumber(k.total_requests)}</td>
                    <td className="px-4 py-3 text-right">{formatNumber(k.total_tokens)}</td>
                    <td className="px-4 py-3 text-right">${estimateCost(k).toFixed(4)}</td>
                    <td className="px-4 py-3 text-right">
                      {k.error_count > 0 ? (
                        <span className="text-red-500">{k.error_count}</span>
                      ) : (
                        <span className="text-muted">0</span>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-4 text-xs text-muted">
        Cost is an estimate based on current OpenRouter pricing for Qwen3-8B ($
        {INPUT_PRICE_PER_M}/M input, ${OUTPUT_PRICE_PER_M}/M output tokens) - not billed truth.
      </p>
    </div>
  );
}
