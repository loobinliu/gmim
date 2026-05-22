import Link from "next/link";
import { QuoteCard } from "@/components/QuoteCard";

export function Hero({ quote }: { quote: Parameters<typeof QuoteCard>[0]["quote"] }) {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 md:grid-cols-[0.9fr_1.1fr] md:py-28">
      <div>
        <p className="mb-4 inline-flex rounded-full border border-orange-200 bg-white/60 px-4 py-2 text-sm font-medium text-orange-700 shadow-sm">
          每天一句温柔而有力量的话
        </p>
        <h1 className="text-5xl font-black leading-tight tracking-tight text-stone-950 md:text-7xl">
          把今天过成值得期待的一天
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600">
          自动生成每日名人名言，注明出处并解释核心含义；一键制作清晨感海报，也可以通过 API 接入你的产品。
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/poster"
            className="rounded-full bg-stone-950 px-7 py-4 text-center text-sm font-semibold text-white shadow-xl shadow-stone-300 transition hover:-translate-y-0.5 hover:bg-orange-700"
          >
            生成早安海报
          </Link>
          <a
            href="#api"
            className="rounded-full border border-stone-300 bg-white/60 px-7 py-4 text-center text-sm font-semibold text-stone-800 transition hover:-translate-y-0.5 hover:border-orange-300 hover:text-orange-700"
          >
            查看 API 文档
          </a>
        </div>
      </div>
      <QuoteCard quote={quote} />
    </section>
  );
}
