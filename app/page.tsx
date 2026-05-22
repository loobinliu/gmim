import { ApiDocs } from "@/components/ApiDocs";
import { Hero } from "@/components/Hero";
import { PosterPreview } from "@/components/PosterPreview";
import { SiteHeader } from "@/components/SiteHeader";
import { ensureTodayQuote } from "@/lib/quote-generator";

export const dynamic = "force-dynamic";

export default async function Home() {
  const quote = await ensureTodayQuote();

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#fed7aa,transparent_32%),linear-gradient(135deg,#fff7ed,#fffbeb_45%,#fef3c7)]">
      <SiteHeader />
      <Hero quote={quote} />
      <section className="mx-auto max-w-6xl px-6 py-10">
        <PosterPreview />
      </section>
      <ApiDocs />
    </main>
  );
}
