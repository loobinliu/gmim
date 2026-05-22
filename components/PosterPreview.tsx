"use client";

import { useMemo, useState } from "react";
import { BackgroundPicker } from "@/components/BackgroundPicker";

export function PosterPreview() {
  const [backgroundId, setBackgroundId] = useState("gradient-warm");
  const [embedInImage, setEmbedInImage] = useState(true);
  const imageUrl = useMemo(() => `/api/poster/today?backgroundId=${backgroundId}`, [backgroundId]);

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-[2rem] bg-white/70 p-6 shadow-xl shadow-orange-100/70">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-stone-950">制作早安海报</h2>
            <p className="mt-2 text-sm text-stone-500">选择背景风格，生成适合分享的日签图片。</p>
          </div>
          <label className="flex items-center gap-2 text-sm font-medium text-stone-700">
            <input
              checked={embedInImage}
              onChange={(event) => setEmbedInImage(event.target.checked)}
              type="checkbox"
              className="h-4 w-4 accent-orange-600"
            />
            嵌入背景图
          </label>
        </div>
        <BackgroundPicker value={backgroundId} onChange={setBackgroundId} />
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={embedInImage ? imageUrl : "/api/quote/today"}
            download={embedInImage ? "morning-poster.png" : undefined}
            className="rounded-full bg-stone-950 px-6 py-3 text-center text-sm font-semibold text-white hover:bg-orange-700"
          >
            {embedInImage ? "下载 PNG" : "获取 JSON 文案"}
          </a>
          <code className="overflow-auto rounded-full bg-stone-100 px-5 py-3 text-xs text-stone-600">
            {embedInImage ? imageUrl : "/api/quote/today"}
          </code>
        </div>
      </div>
      <div className="flex justify-center rounded-[2rem] bg-stone-950/5 p-5">
        {embedInImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={imageUrl}
            src={imageUrl}
            alt="早安鸡汤海报预览"
            className="aspect-[3/4] max-h-[720px] rounded-[2rem] object-cover shadow-2xl shadow-stone-300"
          />
        ) : (
          <div className="flex aspect-[3/4] max-h-[720px] w-full max-w-[540px] items-center justify-center rounded-[2rem] bg-white p-10 text-center text-stone-500 shadow-2xl shadow-stone-200">
            当前选择仅返回文案 JSON，不生成图片。
          </div>
        )}
      </div>
    </div>
  );
}
