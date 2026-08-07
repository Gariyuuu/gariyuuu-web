"use client";

import { useEffect, useState, type CSSProperties } from "react";

const BOOT_LINES = [
  "GARIYUUU.COM",
  "SITE INITIALIZING...",
  "LOADING MODULES: AI GATEWAY, PROJECTS, CHAT, DASHBOARD...",
  "ESTABLISHING CONNECTION TO YUU NO SEKAI...",
  "MOUNTING ASSETS...",
];

const FLOOD_LINES = [
  "SCANNING NETWORK 10.0.0.0/8...",
  "HOST 10.0.4.17 RESPONDING",
  "PORT 22 OPEN — SSH HANDSHAKE INITIATED",
  "PORT 443 OPEN — TLS FINGERPRINT MATCHED",
  "PORT 3306 OPEN — MYSQL SERVICE DETECTED",
  "FINGERPRINTING OS: LINUX 6.2.0-KALI",
  "BRUTE FORCE: 4281/10000 KEYS TESTED",
  "BRUTE FORCE: 8734/10000 KEYS TESTED",
  "PASSWORD HASH CRACKED: 5f4dcc3b5aa765d6",
  "0x4F3A9C1E -> 0x00FF8C -> 0x1A2B3C",
  "DECRYPTING AES-256 KEYSTORE...",
  "KEYSTORE UNLOCKED",
  "INJECTING PAYLOAD [======----] 61%",
  "INJECTING PAYLOAD [==========] 100%",
  "BYPASSING FIREWALL RULE 0x12F...",
  "FIREWALL RULE 0x12F DISABLED",
  "ACCESS DENIED. RETRYING...",
  "ACCESS DENIED. RETRYING...",
  "ACCESS DENIED. RETRYING...",
  "EXPLOIT CVE-2024-19832 MATCHED",
  "EXPLOIT CVE-2023-44487 MATCHED",
  "PRIVILEGE ESCALATION IN PROGRESS...",
  "ROOT ACCESS GRANTED",
  "DUMPING /etc/shadow...",
  "DUMPING SESSION TOKENS...",
  "EXFILTRATING DATA [==========] 100%",
  "UPLOADING TO REMOTE HOST 185.23.44.6...",
  "WARNING: INTRUSION DETECTED",
  "WARNING: ADMIN NOTIFIED",
  "COUNTERMEASURES ENGAGED",
  "REROUTING THROUGH 14 PROXIES...",
  "SPOOFING MAC ADDRESS...",
  "WIPING BASH HISTORY...",
  "CLEARING LOGS...",
  "DISCONNECTING TRACE...",
  "SIGNAL LOST",
];

const FLOOD_WINDOWS: { title: string; style: CSSProperties }[] = [
  { title: "root@10.0.4.17", style: { top: "6%", left: "4%", transform: "rotate(-2deg)" } },
  { title: "proc/exploit", style: { top: "9%", right: "5%", transform: "rotate(1.5deg)" } },
  { title: "net/scan", style: { top: "58%", left: "3%", transform: "rotate(1deg)" } },
  { title: "shell#0x1F", style: { bottom: "8%", right: "4%", transform: "rotate(-1.5deg)" } },
  { title: "session_7", style: { top: "36%", left: "39%", transform: "rotate(-1deg)" } },
  { title: "sys/kernel", style: { bottom: "10%", left: "22%", transform: "rotate(2deg)" } },
];

const CRASH_LINES = ["SYSTEM COMPROMISED", "SYSTEM FAILURE", "CONNECTION TERMINATED"];
const RECOVER_LINES = ["REBOOTING...", "WELCOME BACK, GARY."];

type Phase = "boot" | "flood" | "crash" | "recover" | "hidden";

export function BootIntro() {
  const [phase, setPhase] = useState<Phase>("boot");
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPhase("hidden");
      return;
    }
    function skip() {
      setFading(true);
    }
    window.addEventListener("keydown", skip);
    window.addEventListener("click", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("click", skip);
    };
  }, []);

  useEffect(() => {
    if (phase === "hidden") return;

    if (fading) {
      const t = setTimeout(() => setPhase("hidden"), 500);
      return () => clearTimeout(t);
    }

    if (phase === "boot") {
      if (index < BOOT_LINES.length) {
        const t = setTimeout(() => setIndex((v) => v + 1), 380);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => {
        setPhase("flood");
        setIndex(0);
      }, 450);
      return () => clearTimeout(t);
    }

    if (phase === "flood") {
      if (index < FLOOD_LINES.length) {
        const t = setTimeout(() => setIndex((v) => v + 1), 90);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => {
        setPhase("crash");
        setIndex(0);
      }, 250);
      return () => clearTimeout(t);
    }

    if (phase === "crash") {
      const t = setTimeout(() => {
        setPhase("recover");
        setIndex(0);
      }, 1300);
      return () => clearTimeout(t);
    }

    if (phase === "recover") {
      if (index < RECOVER_LINES.length) {
        const t = setTimeout(() => setIndex((v) => v + 1), index === 0 ? 500 : 750);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setFading(true), 700);
      return () => clearTimeout(t);
    }
  }, [phase, index, fading]);

  if (phase === "hidden") return null;

  const crashing = phase === "crash" && !fading;

  return (
    <div
      className={
        "fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center bg-black px-6 transition-opacity duration-500 " +
        (fading ? "pointer-events-none opacity-0" : "opacity-100") +
        (crashing ? " animate-boot-crash" : "")
      }
    >
      {phase === "boot" && (
        <div className="w-full max-w-lg text-xs sm:text-sm">
          {BOOT_LINES.slice(0, index).map((line, i) => (
            <p key={i} className="mb-1 tracking-wide text-foreground/90">
              <span className="text-accent">&gt;</span> {line}
            </p>
          ))}
          <span className="inline-block h-3 w-2 animate-pulse bg-accent align-middle" />
        </div>
      )}

      {phase === "flood" &&
        FLOOD_WINDOWS.map((win, w) => {
          const lines = FLOOD_LINES.slice(0, index)
            .filter((_, i) => i % FLOOD_WINDOWS.length === w)
            .slice(-5);
          return (
            <div
              key={w}
              className="absolute w-56 border border-white/25 bg-black/90 text-[9px] shadow-lg shadow-black/60 sm:w-64 sm:text-[10px]"
              style={win.style}
            >
              <div className="flex items-center gap-1.5 border-b border-white/20 bg-white/5 px-2 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/45" />
                <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
                <span className="ml-1 truncate text-white/50">{win.title}</span>
              </div>
              <div className="min-h-[5.5em] space-y-0.5 p-2 leading-tight text-white/75">
                {lines.map((line, i) => (
                  <p key={i} className="truncate">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          );
        })}

      {phase === "crash" && (
        <div className="text-center">
          {CRASH_LINES.map((line, i) => (
            <p
              key={i}
              className={
                "animate-boot-glitch tracking-widest text-white " +
                (i === 0 ? "text-xl font-black sm:text-3xl" : "mt-2 text-sm font-bold sm:text-lg")
              }
            >
              {line}
            </p>
          ))}
        </div>
      )}

      {phase === "recover" && (
        <div className="text-center">
          {RECOVER_LINES.slice(0, index).map((line, i) =>
            i === RECOVER_LINES.length - 1 && index === RECOVER_LINES.length ? (
              <p key={i} className="neon text-lg font-bold tracking-widest text-accent sm:text-2xl">
                {line}
              </p>
            ) : (
              <p key={i} className="text-sm tracking-widest text-muted">
                {line}
              </p>
            )
          )}
        </div>
      )}

      {(phase === "boot" || phase === "flood") && (
        <p className="mt-10 text-[10px] uppercase tracking-widest text-muted">
          click / press any key to skip
        </p>
      )}
    </div>
  );
}
