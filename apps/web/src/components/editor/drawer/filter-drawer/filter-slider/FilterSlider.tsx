import type { ReactElement, ReactNode } from "react";

export interface FilterSliderProps {
  label: string;
  resetLabel: string;
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
  resetLabel,
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
      <div className="flex items-center gap-2 px-2">
        {icon}
        <span className="flex-1 text-center text-base font-bold">{label}</span>
        <button className="btn btn-ghost btn-xs" data-testid="filter-slider__reset" onClick={onReset}>
          {resetLabel}
        </button>
      </div>
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
