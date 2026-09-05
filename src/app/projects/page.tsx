import type { Metadata } from "next";
import { PROJECTS } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";

export const metadata: Metadata = {
  title: "Projects — Gary Wang",
  description: "Every app Gary Wang has built and shipped, with live links.",
};

export default function ProjectsPage() {
  const live = PROJECTS.filter((p) => p.url);
  const unreleased = PROJECTS.filter((p) => !p.url);

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <p className="meta text-accent">Work</p>
      <h1 className="mt-2 mb-2 text-3xl font-semibold tracking-[-0.02em] md:text-4xl">Projects</h1>
      <p className="mb-10 text-muted">
        Everything I&apos;ve built and shipped. {PROJECTS.filter((p) => p.onAiPlatform).length} run on{" "}
        <span className="font-medium text-foreground">Yuu v1.1</span>, my self-hosted AI
        platform.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        {live.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>

      {unreleased.length > 0 && (
        <>
          <h2 className="meta mt-14 mb-4 text-muted">
            In progress / not yet deployed
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {unreleased.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
