import Link from "next/link";
import { PROJECTS } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";

export default function Home() {
  const featured = PROJECTS.slice(0, 4);

  return (
    <div className="mx-auto max-w-5xl px-6">
      <section className="flex flex-col gap-6 py-24">
        <p className="font-mono text-sm text-muted">gariyuuu.com</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          A self-hosted AI platform,
          <br />
          <span className="gradient-text">running my own apps.</span>
        </h1>
        <p className="max-w-2xl text-lg text-muted">
          Instead of paying per-token for a proprietary API, every app I build talks to{" "}
          <span className="font-medium text-foreground">Yuu v1.1</span> — an
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
            href="/projects"
            className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-surface-2"
          >
            See all projects
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
              Each app has its own dedicated key and its usage is tracked separately —
              see the dashboard for real numbers.
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
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="text-sm font-medium uppercase tracking-wider text-muted">
            Featured projects
          </h2>
          <Link href="/projects" className="text-sm text-accent hover:underline">
            View all &rarr;
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
