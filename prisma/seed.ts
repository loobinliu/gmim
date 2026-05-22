import "dotenv/config";
import { dateKeyToDate, getTodayKey } from "../lib/date";
import { prisma } from "../lib/db";
import { pickFallbackQuote } from "../lib/quote-generator";

async function main() {
  const dateKey = getTodayKey();
  const payload = pickFallbackQuote(dateKey);

  await prisma.quote.upsert({
    where: { date: dateKeyToDate(dateKey) },
    update: payload,
    create: {
      ...payload,
      date: dateKeyToDate(dateKey),
    },
  });
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    process.exit(1);
  });
