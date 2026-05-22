export function ApiDocs() {
  return (
    <section id="api" className="mx-auto max-w-6xl px-6 py-20">
      <div className="rounded-[2rem] bg-stone-950 p-8 text-white shadow-2xl shadow-stone-300 md:p-10">
        <p className="text-sm font-semibold text-orange-300">开放 API</p>
        <h2 className="mt-3 text-3xl font-bold">用 JSON 或图片接入每日早安金句</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl bg-white/10 p-5">
            <h3 className="font-semibold">获取今日金句</h3>
            <pre className="mt-4 overflow-auto rounded-2xl bg-black/30 p-4 text-sm text-orange-100">
              <code>{`curl http://localhost:3000/api/quote/today`}</code>
            </pre>
          </div>
          <div className="rounded-3xl bg-white/10 p-5">
            <h3 className="font-semibold">获取今日海报</h3>
            <pre className="mt-4 overflow-auto rounded-2xl bg-black/30 p-4 text-sm text-orange-100">
              <code>{`curl -o morning.png "http://localhost:3000/api/poster/today?backgroundId=gradient-warm"`}</code>
            </pre>
          </div>
        </div>
        <p className="mt-6 text-sm leading-7 text-stone-300">
          API 默认开放读取；定时生成接口需要配置 CRON_SECRET。图片接口只允许使用内置背景和受限尺寸，适合直接嵌入产品或自动化脚本。
        </p>
      </div>
    </section>
  );
}
