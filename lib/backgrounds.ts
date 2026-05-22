export type Background = {
  id: string;
  name: string;
  description: string;
  textColor: string;
  accentColor: string;
  gradient: [string, string, string];
};

export const backgrounds = [
  {
    id: "gradient-warm",
    name: "暖色晨光",
    description: "像清晨第一束阳光，适合温柔治愈的早安文案。",
    textColor: "#3f2f24",
    accentColor: "#ea7c3c",
    gradient: ["#fff7ed", "#fed7aa", "#fb923c"],
  },
  {
    id: "morning-blue",
    name: "清晨蓝",
    description: "清爽、通透，适合坚定而克制的励志语录。",
    textColor: "#172554",
    accentColor: "#2563eb",
    gradient: ["#eff6ff", "#bfdbfe", "#60a5fa"],
  },
  {
    id: "minimal-paper",
    name: "极简纸张",
    description: "留白充足，像写在手账里的每日一句。",
    textColor: "#292524",
    accentColor: "#a16207",
    gradient: ["#fffbeb", "#fef3c7", "#fde68a"],
  },
  {
    id: "misty-mountain",
    name: "山间晨雾",
    description: "淡绿和灰蓝交织，适合安静、沉稳的文字。",
    textColor: "#1f3a32",
    accentColor: "#0f766e",
    gradient: ["#ecfdf5", "#ccfbf1", "#99f6e4"],
  },
  {
    id: "soft-rose",
    name: "柔和玫瑰",
    description: "温暖不甜腻，适合送给朋友的早安心语。",
    textColor: "#4c1d2f",
    accentColor: "#db2777",
    gradient: ["#fff1f2", "#fbcfe8", "#f9a8d4"],
  },
] as const satisfies readonly Background[];

export type BackgroundId = (typeof backgrounds)[number]["id"];

export function getBackground(backgroundId: string) {
  return backgrounds.find((background) => background.id === backgroundId) ?? backgrounds[0];
}
