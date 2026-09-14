import type { Metadata } from "next";
import { CATEGORIES, PROJECTS } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";

export const metadata: Metadata = {
  title: "Projects — Gary Wang",
  description: "Every app, game, library, and research study Gary Wang has built and shipped, with live links.",
};

export default function ProjectsPage() {
  const live = PROJECTS.filter((p) => p.url);
  const unreleased = PROJECTS.filter((p) => !p.url);
  const sections = CATEGORIES.map((c) => ({ ...c, projects: live.filter((p) => p.category === c.id) })).filter(
    (s) => s.projects.length > 0,
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="meta text-accent">Work</p>
      <h1 className="mt-2 mb-2 text-3xl font-semibold tracking-[-0.02em] md:text-4xl">Projects</h1>
      <p className="mb-6 text-muted">
        {live.length} live projects, everything I&apos;ve built and shipped.{" "}
        {PROJECTS.filter((p) => p.onAiPlatform).length} run on{" "}
        <span className="font-medium text-foreground">Yuu v1.1</span>, my self-hosted AI platform.
      </p>

      <nav aria-label="Project categories" className="mb-12 flex flex-wrap gap-2">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="meta pressable rounded-full border border-border px-3 py-1 text-muted hover:border-accent hover:text-foreground"
          >
            {s.label} <span className="text-accent">{s.projects.length}</span>
          </a>
        ))}
        {unreleased.length > 0 && (
          <a
            href="#unreleased"
            className="meta pressable rounded-full border border-border px-3 py-1 text-muted hover:border-accent hover:text-foreground"
          >
            Not public <span className="text-accent">{unreleased.length}</span>
          </a>
        )}
      </nav>

      {sections.map((s) => (
        <section key={s.id} id={s.id} className="mb-14 scroll-mt-24">
          <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border pb-3">
            <h2 className="text-xl font-semibold tracking-[-0.01em]">{s.label}</h2>
            <p className="text-sm text-muted">{s.blurb}</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {s.projects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>
      ))}

      {unreleased.length > 0 && (
        <section id="unreleased" className="scroll-mt-24">
          <h2 className="meta mt-14 mb-4 text-muted">Local-only, in progress, or archived</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {unreleased.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
