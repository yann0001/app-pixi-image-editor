import type { ReactElement, ReactNode } from "react";

export interface FilterSliderProps {
  label: string;
  icon?: ReactNode;
  value: number;
  min: number;
  max: number;
  step: number;
  rangeClassName: string;
  ariaLabel: string;
  onReset: () => void;
  onChange: (value: number) => void;
}

export function FilterSlider({
  label,
  icon,
  value,
  min,
  max,
  step,
  rangeClassName,
  ariaLabel,
  onReset,
  onChange,
}: FilterSliderProps): ReactElement {
  return (
    <>
      <button className="my-2 text-base font-bold" onClick={onReset}>
        {icon}
        {label}
      </button>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`range ${rangeClassName}`}
        aria-label={ariaLabel}
      />
    </>
  );
}
