import type { Metadata } from "next";
import { ChatWidget } from "@/components/chat-widget";

export const metadata: Metadata = {
  title: "Chat Demo — gariyuuu.com",
  description: "Talk to Yuu v1.1, live, right in your browser.",
};

export default function ChatPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <p className="meta text-accent">Live demo</p>
      <h1 className="mt-2 mb-2 text-3xl font-semibold tracking-[-0.02em] md:text-4xl">Chat with Yuu v1.1</h1>
      <p className="mb-8 text-muted">
        A live, working conversation with the model powering my other apps. Public and
        rate-limited, so it stays free to run.
      </p>
      <ChatWidget />
    </div>
  );
}
