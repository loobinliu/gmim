import Link from "next/link";
import { QuoteCard } from "@/components/QuoteCard";
import { SiteHeader } from "@/components/SiteHeader";
import { ensureTodayQuote, listRecentQuotes } from "@/lib/quote-generator";

export const dynamic = "force-dynamic";

export default async function QuotesPage() {
  await ensureTodayQuote();
  const quotes = await listRecentQuotes(24);

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#fff7ed,#fffbeb)]">
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold text-orange-700">Archive</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-stone-950 md:text-6xl">历史金句</h1>
            <p className="mt-4 text-lg text-stone-600">按生成日期查看每天的一句话和核心解释。</p>
          </div>
          <Link className="rounded-full bg-stone-950 px-6 py-3 text-center text-sm font-semibold text-white" href="/poster">
            制作海报
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {quotes.map((quote) => (
            <QuoteCard key={quote.id} quote={quote} />
          ))}
        </div>
      </section>
    </main>
  );
}
