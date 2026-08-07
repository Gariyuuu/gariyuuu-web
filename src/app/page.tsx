import Link from "next/link";

const apps = [
  { name: "Nodability", href: "https://nodability.vercel.app" },
  { name: "Daily Brief", href: "https://daily-brief-70cu7npew-garywangsmes-8349s-projects.vercel.app" },
  { name: "AniBrief", href: "https://anibrief.vercel.app" },
  { name: "DramaBrief", href: "https://dramabrief.vercel.app" },
  { name: "Market Brief", href: "https://market-brief.vercel.app" },
  { name: "Engo", href: "https://engo-peach.vercel.app" },
  { name: "Mindloop", href: "https://mindloop-pink.vercel.app" },
  { name: "Trading Professor", href: "https://trading-professor-gary.fly.dev" },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl px-6">
      <section className="flex flex-col gap-6 py-24">
        <p className="font-mono text-sm text-muted">gariyuuu.com</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          A self-hosted AI platform,
          <br />
          <span className="gradient-text">running my own apps.</span>
        </h1>
        <p className="max-w-2xl text-lg text-muted">
          Instead of paying per-token for a proprietary API, every app I build talks to{" "}
          <span className="font-medium text-foreground">Yuu no Sekai</span> — an
          open-weight model (Qwen3-8B) I run behind my own OpenAI-compatible gateway,
          with its own auth, rate limiting, and usage tracking.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/chat"
            className="rounded-full bg-gradient-to-r from-accent to-accent-2 px-5 py-2.5 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
          >
            Try the live chat demo
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-surface-2"
          >
            About me
          </Link>
        </div>
      </section>

      <section className="border-t border-border py-16">
        <h2 className="mb-2 text-sm font-medium uppercase tracking-wider text-muted">
          How it works
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="card p-5">
            <p className="mb-1 font-mono text-xs text-accent">01</p>
            <p className="font-medium">One gateway</p>
            <p className="mt-1 text-sm text-muted">
              A single API (OpenAI-compatible) fronts the model, with its own API keys,
              per-app rate limits, and cost tracking.
            </p>
          </div>
          <div className="card p-5">
            <p className="mb-1 font-mono text-xs text-accent">02</p>
            <p className="font-medium">Every app plugs in</p>
            <p className="mt-1 text-sm text-muted">
              Each app below has its own dedicated key and its usage is tracked
              separately — see the dashboard for real numbers.
            </p>
          </div>
          <div className="card p-5">
            <p className="mb-1 font-mono text-xs text-accent">03</p>
            <p className="font-medium">No vendor lock-in</p>
            <p className="mt-1 text-sm text-muted">
              The underlying model is swappable through config — today it&apos;s Qwen3-8B,
              tomorrow it could be anything else.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-16">
        <h2 className="mb-6 text-sm font-medium uppercase tracking-wider text-muted">
          Apps running on this platform
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {apps.map((app) => (
            <a
              key={app.name}
              href={app.href}
              target="_blank"
              rel="noreferrer"
              className="card flex items-center justify-between p-4 transition-colors hover:border-accent"
            >
              <span className="font-medium">{app.name}</span>
              <span className="text-muted">&rarr;</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
