import Link from "next/link";
import { FEATURED_SLUGS, PROJECTS } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";

export default function Home() {
  const featured = FEATURED_SLUGS.map((slug) => PROJECTS.find((p) => p.slug === slug)).filter(
    (p) => p !== undefined,
  );

  return (
    <div className="mx-auto max-w-5xl px-6">
      <section className="flex flex-col gap-6 py-24">
        <p className="meta text-accent">
          <span className="status-dot mr-2 align-middle" aria-hidden="true" />
          gariyuuu.com
        </p>
        <h1 className="text-[clamp(2rem,4.2vw,3.5rem)] leading-[1.05] font-semibold tracking-[-0.02em] text-balance">
          A self-hosted AI platform,
          <br />
          <span className="glitch" data-text="running my own apps.">running my own apps.</span>
        </h1>
        <p className="brand-hero-sub text-muted">
          Instead of paying per-token for a proprietary API, every app I build talks to{" "}
          <span className="font-medium text-foreground">Yuu v1.1</span> — an
          open-weight model (Qwen3-8B) I run behind my own OpenAI-compatible gateway,
          with its own auth, rate limiting, and usage tracking.
        </p>
        {/* One primary action. The other two are deliberately subordinate —
            three equal buttons is three ways of saying nothing. */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
          <Link
            href="/chat"
            className="pressable rounded-full bg-gradient-to-r from-accent to-accent-2 px-6 py-3 text-sm font-medium text-accent-fg hover:opacity-90"
          >
            Try the live chat demo
          </Link>
          <Link href="/projects" className="u-link text-sm text-muted hover:text-foreground">
            See all projects
          </Link>
          <Link href="/about" className="u-link text-sm text-muted hover:text-foreground">
            About me
          </Link>
        </div>
      </section>

      <section className="border-t border-border py-16">
        <h2 className="meta mb-4 text-muted">How it works</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="brand-card card brand-rise p-5">
            <p className="meta mb-1.5 text-accent">01</p>
            <p className="font-medium">One gateway</p>
            <p className="mt-1 text-sm text-muted">
              A single API (OpenAI-compatible) fronts the model, with its own API keys,
              per-app rate limits, and cost tracking.
            </p>
          </div>
          <div className="brand-card card brand-rise p-5">
            <p className="meta mb-1.5 text-accent">02</p>
            <p className="font-medium">Every app plugs in</p>
            <p className="mt-1 text-sm text-muted">
              Each app has its own dedicated key and its usage is tracked separately —
              see the dashboard for real numbers.
            </p>
          </div>
          <div className="brand-card card brand-rise p-5">
            <p className="meta mb-1.5 text-accent">03</p>
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
          <h2 className="meta text-muted">Featured projects</h2>
          <Link href="/projects" className="u-link meta text-accent">
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
