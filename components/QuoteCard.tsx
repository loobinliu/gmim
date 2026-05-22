type QuoteCardProps = {
  quote: {
    text: string;
    author: string;
    source: string | null;
    explanation: string;
    date?: Date | string;
  };
};

export function QuoteCard({ quote }: QuoteCardProps) {
  const date = quote.date instanceof Date ? quote.date.toISOString().slice(0, 10) : quote.date;

  return (
    <article className="rounded-[2rem] border border-white/70 bg-white/75 p-8 shadow-2xl shadow-orange-200/40 backdrop-blur">
      <div className="mb-6 flex items-center justify-between text-sm text-stone-500">
        <span>今日一句</span>
        {date ? <time>{date}</time> : null}
      </div>
      <blockquote className="text-3xl font-semibold leading-relaxed tracking-tight text-stone-900 md:text-4xl">
        “{quote.text}”
      </blockquote>
      <p className="mt-5 text-right text-stone-500">
        — {quote.author} · {quote.source || "出处未详"}
      </p>
      <div className="mt-8 rounded-3xl bg-orange-50/80 p-5 text-base leading-8 text-stone-700">
        <span className="mb-2 block text-sm font-semibold text-orange-700">核心含义</span>
        {quote.explanation}
      </div>
    </article>
  );
}
