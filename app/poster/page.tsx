import { PosterPreview } from "@/components/PosterPreview";
import { SiteHeader } from "@/components/SiteHeader";

export default function PosterPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#fff7ed,#fef3c7,#ffedd5)]">
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold text-orange-700">Poster Maker</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-stone-950 md:text-6xl">生成你的早安日签海报</h1>
          <p className="mt-5 text-lg leading-8 text-stone-600">
            选择一个清晨感背景，把今日金句、出处和核心解释合成为一张适合分享的 PNG。
          </p>
        </div>
        <PosterPreview />
      </section>
    </main>
  );
}
