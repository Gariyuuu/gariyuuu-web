import { NextRequest } from "next/server";

export const runtime = "nodejs";

const SYSTEM_PROMPT =
  "You are the public demo assistant on gariyuuu.com, running on Gary's self-hosted " +
  "AI platform (model: Yuu v1.1, an open-weight Qwen3-8B). Be friendly, concise, " +
  "and mention the platform when relevant, but don't force it into every reply.";

const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 2000;

interface IncomingMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: NextRequest) {
  const baseUrl = process.env.AI_PLATFORM_BASE_URL;
  const apiKey = process.env.AI_PLATFORM_DEMO_API_KEY;
  if (!baseUrl || !apiKey) {
    return Response.json({ error: "Chat demo is not configured." }, { status: 500 });
  }

  let body: { messages?: IncomingMessage[] };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const messages = body.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: "messages is required." }, { status: 400 });
  }
  if (messages.length > MAX_MESSAGES) {
    return Response.json({ error: `Too many messages (max ${MAX_MESSAGES}).` }, { status: 400 });
  }
  for (const m of messages) {
    if (typeof m.content !== "string" || m.content.length === 0) {
      return Response.json({ error: "Each message needs non-empty content." }, { status: 400 });
    }
    if (m.content.length > MAX_MESSAGE_LENGTH) {
      return Response.json({ error: `Message too long (max ${MAX_MESSAGE_LENGTH} chars).` }, { status: 400 });
    }
    if (m.role !== "user" && m.role !== "assistant") {
      return Response.json({ error: "role must be 'user' or 'assistant'." }, { status: 400 });
    }
  }

  let upstream: Response;
  try {
    upstream = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "Yuu no Sekai",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        stream: true,
        max_tokens: 400,
        reasoning: { enabled: false },
      }),
    });
  } catch {
    return Response.json({ error: "The AI platform is unreachable right now." }, { status: 503 });
  }

  if (!upstream.ok || !upstream.body) {
    let message = "The AI platform returned an error.";
    if (upstream.status === 429) message = "This demo is rate-limited and got busy - try again in a minute.";
    return Response.json({ error: message }, { status: upstream.status || 502 });
  }

  return new Response(upstream.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
