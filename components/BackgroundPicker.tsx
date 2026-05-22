"use client";

import { backgrounds } from "@/lib/backgrounds";

type BackgroundPickerProps = {
  value: string;
  onChange: (value: string) => void;
};

export function BackgroundPicker({ value, onChange }: BackgroundPickerProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {backgrounds.map((background) => (
        <button
          key={background.id}
          type="button"
          onClick={() => onChange(background.id)}
          className={`rounded-3xl border p-4 text-left transition ${
            value === background.id
              ? "border-orange-400 bg-orange-50 shadow-lg shadow-orange-100"
              : "border-stone-200 bg-white/70 hover:border-orange-200"
          }`}
        >
          <div
            className="mb-3 h-20 rounded-2xl"
            style={{
              background: `linear-gradient(135deg, ${background.gradient[0]}, ${background.gradient[1]}, ${background.gradient[2]})`,
            }}
          />
          <div className="font-semibold text-stone-900">{background.name}</div>
          <p className="mt-1 text-sm leading-6 text-stone-500">{background.description}</p>
        </button>
      ))}
    </div>
  );
}
