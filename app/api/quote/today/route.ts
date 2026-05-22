import { ensureTodayQuote } from "@/lib/quote-generator";

export const dynamic = "force-dynamic";

export async function GET() {
  const quote = await ensureTodayQuote();

  return Response.json({
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
