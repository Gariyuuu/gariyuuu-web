"use client";

import { useRef, useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

async function* parseSSE(body: ReadableStream<Uint8Array>) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) return;
    buffer += decoder.decode(value, { stream: true });
    let sep: number;
    while ((sep = buffer.indexOf("\n\n")) !== -1) {
      const rawEvent = buffer.slice(0, sep);
      buffer = buffer.slice(sep + 2);
      for (const line of rawEvent.split("\n")) {
        if (!line.startsWith("data:")) continue;
        const data = line.slice("data:".length).trim();
        if (data === "[DONE]") return;
        if (!data) continue;
        try {
          yield JSON.parse(data);
        } catch {
          // ignore malformed chunk
        }
      }
    }
  }
}

export function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  async function send() {
    const text = input.trim();
    if (!text || isStreaming) return;
    setError(null);
    setInput("");

    const nextMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages([...nextMessages, { role: "assistant", content: "" }]);
    setIsStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.ok || !res.body) {
        const body = await res.json().catch(() => ({ error: "Something went wrong." }));
        setError(body.error ?? "Something went wrong.");
        setMessages(nextMessages);
        setIsStreaming(false);
        return;
      }

      let assistantText = "";
      for await (const chunk of parseSSE(res.body)) {
        const delta: string | undefined = chunk?.choices?.[0]?.delta?.content;
        if (delta) {
          assistantText += delta;
          setMessages([...nextMessages, { role: "assistant", content: assistantText }]);
          bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }
      }
    } catch {
      setError("Lost connection to the AI platform.");
    } finally {
      setIsStreaming(false);
    }
  }

  return (
    <div className="card flex h-[70vh] flex-col overflow-hidden">
      <div className="flex-1 space-y-4 overflow-y-auto p-5">
        {messages.length === 0 && (
          <p className="text-sm text-muted">
            Say hello. This is a real, live conversation with{" "}
            <span className="font-medium text-foreground">Yuu v1.1</span>, rate-limited
            for public use.
          </p>
        )}
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
            <div
              className={
                "inline-block max-w-[85%] rounded-2xl px-4 py-2 text-sm " +
                (m.role === "user"
                  ? "bg-gradient-to-r from-accent to-accent-2 text-accent-fg"
                  : "bg-surface-2 text-foreground")
              }
            >
              {m.content || (isStreaming && i === messages.length - 1 ? "…" : "")}
            </div>
          </div>
        ))}
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div ref={bottomRef} />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className="flex gap-2 border-t border-border p-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          maxLength={2000}
          className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm outline-none focus:border-accent"
        />
        <button
          type="submit"
          disabled={isStreaming || !input.trim()}
          className="rounded-full bg-gradient-to-r from-accent to-accent-2 px-4 py-2 text-sm font-medium text-accent-fg disabled:opacity-40"
        >
          Send
        </button>
      </form>
    </div>
  );
}
