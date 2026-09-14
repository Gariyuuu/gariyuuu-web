import Image from "next/image";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  const content = (
    <div className="brand-card brand-card-interactive card group h-full overflow-hidden">
      <div className="media media-16x9 media-zoom rounded-none border-b border-border">
        {project.screenshot ? (
          <Image
            src={project.screenshot}
            alt={`Screenshot of ${project.name}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top"
          />
        ) : (
          <div className="media-fill meta flex items-center justify-center bg-gradient-to-br from-accent/20 to-accent-2/20 text-muted">
            No preview yet
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="mb-1 flex items-center justify-between">
          <h3 className="font-medium">{project.name}</h3>
          {project.onAiPlatform && (
            <span className="meta shrink-0 rounded-full bg-gradient-to-r from-accent to-accent-2 px-2.5 py-0.5 text-accent-fg">
              AI platform
            </span>
          )}
        </div>
        <p className="text-sm text-muted">{project.description}</p>
        {!project.url && (
          <p className="meta mt-2.5 text-muted">
            {project.archived
              ? "Archived — no longer hosted"
              : project.localOnly
                ? "Local app — no public demo"
                : "Not deployed yet"}
          </p>
        )}
      </div>
    </div>
  );

  if (!project.url) return content;

  return (
    <a href={project.url} target="_blank" rel="noreferrer" className="block h-full">
      {content}
    </a>
  );
}
