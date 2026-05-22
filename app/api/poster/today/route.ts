import { NextRequest } from "next/server";
import { backgrounds, getBackground } from "@/lib/backgrounds";
import { ensureTodayQuote } from "@/lib/quote-generator";
import { generatePosterImage } from "@/lib/poster-generator";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const backgroundId = request.nextUrl.searchParams.get("backgroundId") ?? "gradient-warm";
  const responseType = request.nextUrl.searchParams.get("response");

  if (!backgrounds.some((background) => background.id === backgroundId)) {
    return Response.json(
      { error: { code: "INVALID_BACKGROUND", message: "Unknown backgroundId." } },
      { status: 400 },
    );
  }

  const quote = await ensureTodayQuote();

  if (responseType === "json") {
    return Response.json({
      date: quote.date.toISOString().slice(0, 10),
      imageUrl: `/api/poster/today?backgroundId=${backgroundId}`,
      background: getBackground(backgroundId),
      quote: {
        id: quote.id,
        text: quote.text,
        author: quote.author,
        source: quote.source ?? "出处未详",
        explanation: quote.explanation,
      },
    });
  }

  const image = await generatePosterImage({ quote, backgroundId });

  return new Response(new Uint8Array(image), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
