import { Prisma } from "@/app/generated/prisma/client";
import { dateKeyToDate, getTodayKey } from "@/lib/date";
import { prisma } from "@/lib/db";
import { quotePayloadSchema, type QuotePayload } from "@/lib/validators";

export const fallbackQuotes: QuotePayload[] = [
  {
    text: "行动是治愈恐惧的良药，而犹豫拖延将不断滋养恐惧。",
    author: "戴尔·卡耐基",
    source: "出处未详",
    explanation: "这句话提醒我们，很多焦虑并不会因为等待而消失，真正能让人重新获得掌控感的，是从一件小事开始行动。",
  },
  {
    text: "你不能左右天气，但你可以改变心情。",
    author: "佚名",
    source: "现代励志语录",
    explanation: "外界并不总按期待发生，但我们仍能选择如何回应。早晨调整心态，往往会改变一整天的方向。",
  },
  {
    text: "不要等待机会，而要创造机会。",
    author: "乔治·萧伯纳",
    source: "出处未详",
    explanation: "机会常常藏在主动尝试里。与其等条件完美，不如先迈出一步，在行动中把可能性变成现实。",
  },
  {
    text: "生活不是等待暴风雨过去，而是学会在雨中起舞。",
    author: "维维安·格林",
    source: "出处未详",
    explanation: "困难不一定会立刻消失，但人可以在不完美的处境中保持热爱与节奏，这也是一种温柔的力量。",
  },
  {
    text: "伟大的作品不是靠力量，而是靠坚持完成的。",
    author: "塞缪尔·约翰逊",
    source: "出处未详",
    explanation: "真正拉开差距的，往往不是一时的爆发，而是在平凡日子里持续投入。今天的一点坚持也有意义。",
  },
  {
    text: "把脸一直向着阳光，这样就不会见到阴影。",
    author: "海伦·凯勒",
    source: "出处未详",
    explanation: "这句话强调积极关注的力量。不是否认困难，而是把注意力更多放在希望、成长和仍可选择的方向上。",
  },
  {
    text: "每一个不曾起舞的日子，都是对生命的辜负。",
    author: "尼采",
    source: "出处未详",
    explanation: "它提醒我们认真生活，不把日子过成机械重复。哪怕只是一个微小的热爱，也能让今天更鲜活。",
  },
  {
    text: "种一棵树最好的时间是十年前，其次是现在。",
    author: "佚名",
    source: "民间谚语",
    explanation: "过去的迟疑不必成为新的负担。只要今天开始，改变就已经发生，未来会感谢此刻的行动。",
  },
  {
    text: "所谓成长，就是不断把哭声调成静音的过程。",
    author: "佚名",
    source: "现代生活语录",
    explanation: "成熟不是没有委屈，而是学会照顾情绪后继续前行。早安，愿你温柔也有力量。",
  },
  {
    text: "做你能做的，在你所在的地方，用你拥有的资源。",
    author: "西奥多·罗斯福",
    source: "出处未详",
    explanation: "不必等到一切准备齐全才开始。眼前的条件虽然有限，但足够支撑你完成今天最重要的一步。",
  },
];

export function pickFallbackQuote(dateKey: string) {
  const index = [...dateKey].reduce((sum, char) => sum + char.charCodeAt(0), 0) % fallbackQuotes.length;
  return quotePayloadSchema.parse(fallbackQuotes[index]);
}

export async function generateQuotePayload(dateKey: string) {
  return pickFallbackQuote(dateKey);
}

export async function ensureQuoteForDate(dateKey: string) {
  const date = dateKeyToDate(dateKey);
  const existing = await prisma.quote.findUnique({ where: { date } });

  if (existing) {
    return existing;
  }

  const payload = await generateQuotePayload(dateKey);

  try {
    return await prisma.quote.create({
      data: {
        ...payload,
        source: payload.source || "出处未详",
        date,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return prisma.quote.findUniqueOrThrow({ where: { date } });
    }

    throw error;
  }
}

export function ensureTodayQuote() {
  return ensureQuoteForDate(getTodayKey());
}

export async function listRecentQuotes(limit = 12) {
  return prisma.quote.findMany({
    orderBy: { date: "desc" },
    take: limit,
  });
}
