import "dotenv/config";
import { ensureTodayQuote } from "../lib/quote-generator";
import { prisma } from "../lib/db";

async function main() {
  const quote = await ensureTodayQuote();
  console.log(JSON.stringify({ id: quote.id, text: quote.text, author: quote.author }, null, 2));
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    process.exit(1);
  });
