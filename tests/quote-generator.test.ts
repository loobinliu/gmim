import { describe, expect, it } from "vitest";
import { pickFallbackQuote } from "../lib/quote-generator";

const dateKey = "2026-05-22";

describe("pickFallbackQuote", () => {
  it("returns a stable valid quote for a date", () => {
    const first = pickFallbackQuote(dateKey);
    const second = pickFallbackQuote(dateKey);

    expect(first).toEqual(second);
    expect(first.text.length).toBeGreaterThan(0);
    expect(first.author.length).toBeGreaterThan(0);
    expect(first.explanation.length).toBeGreaterThan(20);
  });
});
