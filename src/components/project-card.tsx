import Image from "next/image";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  const content = (
    <div className="card group overflow-hidden transition-colors hover:border-accent">
      <div className="relative aspect-video w-full overflow-hidden border-b border-border bg-surface-2">
        {project.screenshot ? (
          <Image
            src={project.screenshot}
            alt={`Screenshot of ${project.name}`}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/20 to-accent-2/20 text-sm text-muted">
            No preview yet
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="mb-1 flex items-center justify-between">
          <h3 className="font-medium">{project.name}</h3>
          {project.onAiPlatform && (
            <span className="rounded-full bg-gradient-to-r from-accent to-accent-2 px-2 py-0.5 text-[10px] font-medium text-accent-fg">
              AI platform
            </span>
          )}
        </div>
        <p className="text-sm text-muted">{project.description}</p>
        {!project.url && <p className="mt-2 text-xs text-muted">Not deployed yet</p>}
      </div>
    </div>
  );

  if (!project.url) return content;

  return (
    <a href={project.url} target="_blank" rel="noreferrer">
      {content}
    </a>
  );
}
