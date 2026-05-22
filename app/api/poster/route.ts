import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { generatePosterImage } from "@/lib/poster-generator";
import { ensureTodayQuote } from "@/lib/quote-generator";
import { posterRequestSchema } from "@/lib/validators";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const payload = posterRequestSchema.safeParse(await request.json().catch(() => ({})));

  if (!payload.success) {
    return Response.json(
      { error: { code: "INVALID_POSTER_REQUEST", message: payload.error.issues[0]?.message ?? "Invalid request." } },
      { status: 400 },
    );
  }

  const quote = payload.data.quoteId
    ? await prisma.quote.findUnique({ where: { id: payload.data.quoteId } })
    : await ensureTodayQuote();

  if (!quote) {
    return Response.json(
      { error: { code: "QUOTE_NOT_FOUND", message: "No quote found for the requested id." } },
      { status: 404 },
    );
  }

  if (!payload.data.embedInImage) {
    return Response.json({
      quote,
      copy: `“${quote.text}”\n— ${quote.author} · ${quote.source ?? "出处未详"}\n\n${quote.explanation}`,
    });
  }

  await prisma.poster.create({
    data: {
      quoteId: quote.id,
      backgroundId: payload.data.backgroundId,
      width: payload.data.width,
      height: payload.data.height,
    },
  });

  const image = await generatePosterImage({
    quote,
    backgroundId: payload.data.backgroundId,
    width: payload.data.width,
    height: payload.data.height,
  });

  return new Response(new Uint8Array(image), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
