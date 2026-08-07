export function Footer() {
  return (
    <footer className="mt-auto border-t border-border py-10">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-2 px-6 text-center text-sm text-muted">
        <p>Built and run by Gary Wang. Powered by a self-hosted AI platform, not a third-party API.</p>
        <p className="flex gap-4">
          <a href="https://github.com/Gariyuuu" className="hover:text-foreground">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/gary-wang-a912a0308/" className="hover:text-foreground">
            LinkedIn
          </a>
          <a href="mailto:gywng006@gmail.com" className="hover:text-foreground">
            Email
          </a>
        </p>
      </div>
    </footer>
  );
}
