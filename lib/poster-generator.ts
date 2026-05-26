import sharp from "sharp";
import { getBackground } from "@/lib/backgrounds";
import { formatDisplayDate } from "@/lib/date";

type PosterQuote = {
  text: string;
  author: string;
  source: string | null;
  explanation: string;
  date: Date;
};

type GeneratePosterOptions = {
  quote: PosterQuote;
  backgroundId: string;
  width?: number;
  height?: number;
};

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function wrapText(text: string, maxChars: number) {
  const chars = [...text];
  const lines: string[] = [];

  for (let index = 0; index < chars.length; index += maxChars) {
    lines.push(chars.slice(index, index + maxChars).join(""));
  }

  return lines;
}

function textLines(lines: string[], x: number, y: number, size: number, lineHeight: number, color: string, weight = 500) {
  return lines
    .map(
      (line, index) =>
        `<text x="${x}" y="${y + index * lineHeight}" font-size="${size}" font-weight="${weight}" fill="${color}">${escapeXml(line)}</text>`,
    )
    .join("");
}

function posterSvg({ quote, backgroundId, width, height }: Required<GeneratePosterOptions>) {
  const background = getBackground(backgroundId);
  const quoteLines = wrapText(`“${quote.text}”`, 14);
  const explanationLines = wrapText(quote.explanation, 22);
  const author = `— ${quote.author}${quote.source ? ` · ${quote.source}` : ""}`;
  const cardX = Math.round(width * 0.09);
  const cardY = Math.round(height * 0.16);
  const cardWidth = Math.round(width * 0.82);
  const cardHeight = Math.round(height * 0.68);
  const contentX = cardX + 72;

  return `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" font-family="Noto Sans CJK SC, Noto Sans CJK, PingFang SC, Microsoft YaHei, sans-serif">
  <defs>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="24" stdDeviation="28" flood-color="#000000" flood-opacity="0.14"/>
    </filter>
    <radialGradient id="glow" cx="35%" cy="18%" r="65%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#glow)" opacity="0.9"/>
  <circle cx="${width * 0.83}" cy="${height * 0.16}" r="${width * 0.18}" fill="#ffffff" opacity="0.28"/>
  <circle cx="${width * 0.18}" cy="${height * 0.88}" r="${width * 0.28}" fill="#ffffff" opacity="0.18"/>
  <rect x="${cardX}" y="${cardY}" width="${cardWidth}" height="${cardHeight}" rx="42" fill="#ffffff" opacity="0.72" filter="url(#shadow)"/>
  <rect x="${cardX + 18}" y="${cardY + 18}" width="${cardWidth - 36}" height="${cardHeight - 36}" rx="34" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.65"/>
  <text x="${contentX}" y="${cardY + 118}" font-size="46" font-weight="700" letter-spacing="8" fill="${background.accentColor}">早安</text>
  <line x1="${contentX}" x2="${contentX + 132}" y1="${cardY + 150}" y2="${cardY + 150}" stroke="${background.accentColor}" stroke-width="6" stroke-linecap="round" opacity="0.75"/>
  ${textLines(quoteLines, contentX, cardY + 265, 56, 82, background.textColor, 700)}
  <text x="${contentX}" y="${cardY + 300 + quoteLines.length * 82}" font-size="28" fill="${background.textColor}" opacity="0.72">${escapeXml(author)}</text>
  <rect x="${contentX}" y="${cardY + 380 + quoteLines.length * 82}" width="${cardWidth - 144}" height="2" fill="${background.accentColor}" opacity="0.2"/>
  ${textLines(explanationLines, contentX, cardY + 460 + quoteLines.length * 82, 31, 50, background.textColor, 400)}
  <text x="${contentX}" y="${cardY + cardHeight - 84}" font-size="28" fill="${background.textColor}" opacity="0.55">${formatDisplayDate(quote.date)}</text>
  <text x="${width - contentX}" y="${cardY + cardHeight - 84}" font-size="24" fill="${background.textColor}" opacity="0.45" text-anchor="end">jitang · 每天一句温柔的力量</text>
</svg>`;
}

export async function generatePosterImage(options: GeneratePosterOptions) {
  const width = options.width ?? 1080;
  const height = options.height ?? 1440;
  const background = getBackground(options.backgroundId);
  const base = await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: background.gradient[0],
    },
  })
    .composite([
      {
        input: Buffer.from(
          `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${background.gradient[0]}"/><stop offset="55%" stop-color="${background.gradient[1]}"/><stop offset="100%" stop-color="${background.gradient[2]}"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>`,
        ),
      },
    ])
    .png()
    .toBuffer();

  return sharp(base)
    .composite([
      {
        input: Buffer.from(
          posterSvg({ quote: options.quote, backgroundId: options.backgroundId, width, height }),
        ),
      },
    ])
    .png()
    .toBuffer();
}
