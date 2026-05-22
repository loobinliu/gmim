import { ensureTodayQuote } from "@/lib/quote-generator";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization");

  if (secret && auth !== `Bearer ${secret}`) {
    return Response.json(
      { error: { code: "UNAUTHORIZED", message: "Invalid cron secret." } },
      { status: 401 },
    );
  }

  const quote = await ensureTodayQuote();

  return Response.json({
    ok: true,
    date: quote.date.toISOString().slice(0, 10),
    quote: {
      id: quote.id,
      text: quote.text,
      author: quote.author,
      source: quote.source ?? "出处未详",
      explanation: quote.explanation,
    },
  });
}
