import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/chat", label: "Chat Demo" },
  { href: "/dashboard", label: "Dashboard" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-20 border-b border-border/80 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center gap-1 px-6 py-4 tracking-widest">
        <Link href="/" className="mr-auto flex items-center gap-2 font-semibold uppercase tracking-widest">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-accent" />
          gariyuuu.com
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-1.5 text-muted transition-colors hover:bg-surface-2 hover:text-accent"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
