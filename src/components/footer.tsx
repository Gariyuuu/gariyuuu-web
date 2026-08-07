export function Footer() {
  return (
    <footer className="relative z-10 mt-auto border-t border-border bg-background py-10">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-2 px-6 text-center text-sm text-muted">
        <p>Built and run by Gary Wang. Powered by a self-hosted AI platform, not a third-party API.</p>
        <p className="flex flex-wrap justify-center gap-4">
          <a href="https://github.com/Gariyuuu" className="hover:text-accent">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/gary-wang-a912a0308/" className="hover:text-accent">
            LinkedIn
          </a>
          <a
            href="https://openreview.net/profile?id=~Shengyi_Wang5"
            className="hover:text-accent"
          >
            OpenReview
          </a>
          <a href="mailto:gywng006@gmail.com" className="hover:text-accent">
            Email
          </a>
        </p>
      </div>
    </footer>
  );
}
