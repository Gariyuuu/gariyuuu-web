"use client";

import { useEffect } from "react";

// Any text under a mouse or pen pointer gets the RGB static glitch while hovered
// (styles: `.glitch-hover` in globals.css). Plain leaf text with no pseudo-elements
// of its own gets the full sliced version; anything else (mixed content, wrapped
// inline text, elements that already use ::before/::after such as `.u-link`) gets
// the colour flash and channel split only, so no existing decoration is overwritten.
// Off under reduced motion and for touch.
const SKIP = "canvas, script, style, input, textarea, select, .glitch, [data-no-glitch]";

function hasOwnText(el: Element) {
  for (let n = el.firstChild; n; n = n.nextSibling) {
    if (n.nodeType === Node.TEXT_NODE && n.nodeValue?.trim()) return true;
  }
  return false;
}

function hasPseudo(el: Element, which: "::before" | "::after") {
  const content = getComputedStyle(el, which).content;
  return Boolean(content) && content !== "none" && content !== "normal";
}

export function GlitchHover() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let current: HTMLElement | null = null;

    function clear() {
      if (!current) return;
      current.classList.remove("glitch-hover", "glitch-hover--slices", "glitch-hover--rel");
      current.removeAttribute("data-glitch-text");
      current.style.removeProperty("--gh-color");
      current = null;
    }

    function apply(el: HTMLElement) {
      const style = getComputedStyle(el);
      el.style.setProperty("--gh-color", style.color);
      const slices =
        el.children.length === 0 &&
        el.getClientRects().length === 1 &&
        !hasPseudo(el, "::before") &&
        !hasPseudo(el, "::after");
      if (slices) {
        el.setAttribute("data-glitch-text", (el.textContent ?? "").replace(/\s+/g, " ").trim());
        if (style.position === "static") el.classList.add("glitch-hover--rel");
        el.classList.add("glitch-hover--slices");
      }
      el.classList.add("glitch-hover");
      current = el;
    }

    function onOver(e: PointerEvent) {
      if (e.pointerType === "touch") return;
      let el = e.target instanceof Element ? e.target : null;
      while (el && el !== document.body && !hasOwnText(el)) el = el.parentElement;
      if (!(el instanceof HTMLElement) || el === document.body || el.closest(SKIP)) {
        clear();
        return;
      }
      if (el === current) return;
      clear();
      apply(el);
    }

    function onOut(e: PointerEvent) {
      if (current && !(e.relatedTarget instanceof Node && current.contains(e.relatedTarget))) clear();
    }

    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    return () => {
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      clear();
    };
  }, []);

  return null;
}
