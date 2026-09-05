"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/chat", label: "Chat Demo" },
  { href: "/dashboard", label: "Dashboard" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-border/80 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center gap-2 px-6 py-4 tracking-widest">
        <Link
          href="/"
          className="pressable mr-auto flex shrink-0 items-center gap-2 text-sm font-semibold tracking-widest uppercase sm:text-base"
          aria-label="gariyuuu.com — home"
        >
          <span className="status-dot" aria-hidden="true" />
          gariyuuu.com
        </Link>
        {/* Scrolls rather than wraps on a phone: five destinations will not fit
            at 390px, and a wrapped nav pushes the hero below the fold. */}
        <nav
          aria-label="Main"
          className="brand-scroll -mx-2 flex items-center gap-1 overflow-x-auto px-2 text-sm"
        >
          {links.map((l) => {
            const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={
                  "pressable relative shrink-0 rounded-md px-3 py-1.5 " +
                  (active ? "text-accent" : "text-muted hover:bg-surface-2 hover:text-accent")
                }
              >
                {l.label}
                {/* the active page is marked by a rule, not by colour alone */}
                <span
                  aria-hidden="true"
                  className={
                    "absolute inset-x-3 -bottom-px h-px bg-accent transition-[opacity,transform] duration-[var(--brand-dur-base)] ease-[var(--brand-ease-out)] motion-reduce:transition-none " +
                    (active ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0")
                  }
                />
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
