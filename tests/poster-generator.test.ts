import { describe, expect, it } from "vitest";
import { generatePosterImage } from "../lib/poster-generator";

describe("generatePosterImage", () => {
  it("generates a png buffer", async () => {
    const image = await generatePosterImage({
      backgroundId: "gradient-warm",
      width: 720,
      height: 960,
      quote: {
        text: "今天也要认真生活。",
        author: "佚名",
        source: "测试语录",
        explanation: "这句话提醒我们从当下开始，认真面对今天的一件小事，把平凡日子过得更有力量。",
        date: new Date("2026-05-22T00:00:00.000Z"),
      },
    });

    expect(image.byteLength).toBeGreaterThan(1000);
    expect(image.subarray(1, 4).toString()).toBe("PNG");
  });
});
