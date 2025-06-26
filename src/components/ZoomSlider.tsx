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
    <div className="flex items-center justify-between w-full max-w-md mx-auto space-x-4">
      <span className="material-icons text-3xl text-[#BB86FC] select-none">zoom_out</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        className="w-full h-2 accent-[#BB86FC] bg-[#333] rounded-full outline-none focus:ring-2 focus:ring-[#BB86FC] transition-all slider-thumb-custom"
        style={{ accentColor: '#BB86FC' }}
      />
      <span className="material-icons text-3xl text-[#BB86FC] select-none">zoom_in</span>
    </div>
  );
} 