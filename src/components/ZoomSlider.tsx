"use client";

import { ChangeEvent, PointerEvent } from "react";

export function ZoomSlider({
  min,
  max,
  step,
  value,
  onChange,
  onPointerDown,
  onPointerUp,
}: {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onPointerDown: (event: PointerEvent<HTMLInputElement>) => void;
  onPointerUp: (event: PointerEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="z-20 flex items-center space-x-2 bg-white/20 p-5 rounded-lg backdrop-blur-sm ml-auto">
      <span className="text-white text-xs font-mono">-</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        className="w-24 h-1 accent-blue-500 bg-transparent cursor-pointer"
      />
      <span className="text-white text-xs font-mono">+</span>
    </div>
  );
} 