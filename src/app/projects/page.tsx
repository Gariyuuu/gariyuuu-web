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
      <h1 className="mb-2 text-2xl font-semibold tracking-tight">Projects</h1>
      <p className="mb-10 text-muted">
        Everything I&apos;ve built and shipped. {PROJECTS.filter((p) => p.onAiPlatform).length} run on{" "}
        <span className="font-medium text-foreground">Yuu no Sekai</span>, my self-hosted AI
        platform.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        {live.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>

      {unreleased.length > 0 && (
        <>
          <h2 className="mb-4 mt-14 text-sm font-medium uppercase tracking-wider text-muted">
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
