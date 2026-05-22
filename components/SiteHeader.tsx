import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/60 bg-amber-50/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-[0.2em] text-stone-900">
          早安鸡汤
        </Link>
        <nav className="flex items-center gap-5 text-sm font-medium text-stone-600">
          <Link className="hover:text-orange-600" href="/quotes">
            历史金句
          </Link>
          <Link className="hover:text-orange-600" href="/poster">
            生成海报
          </Link>
          <a className="hover:text-orange-600" href="#api">
            API
          </a>
        </nav>
      </div>
    </header>
  );
}
