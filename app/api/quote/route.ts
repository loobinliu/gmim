import { NextRequest } from "next/server";
import { dateKeyToDate, isValidDateKey } from "@/lib/date";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const dateKey = request.nextUrl.searchParams.get("date");

  if (!dateKey || !isValidDateKey(dateKey)) {
    return Response.json(
      { error: { code: "INVALID_DATE", message: "date must use YYYY-MM-DD format." } },
      { status: 400 },
    );
  }

  const quote = await prisma.quote.findUnique({ where: { date: dateKeyToDate(dateKey) } });

  if (!quote) {
    return Response.json(
      { error: { code: "QUOTE_NOT_FOUND", message: "No quote found for the requested date." } },
      { status: 404 },
    );
  }

  return Response.json({
    date: dateKey,
    quote: {
      id: quote.id,
      text: quote.text,
      author: quote.author,
      source: quote.source ?? "出处未详",
      explanation: quote.explanation,
    },
  });
}
