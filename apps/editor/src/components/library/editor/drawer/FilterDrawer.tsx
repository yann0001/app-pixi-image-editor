import { useRef, type ReactElement } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useClickOutside } from "@package/react";
import { useIntl } from "react-intl";
import type { StagedFilter } from "../stage/StagedFilters";
import { BlurIcon } from "~/components/icons/filters/BlurIcon";
import { ContrastIcon } from "~/components/icons/filters/ContrastIcon";
import { DropletIcon } from "~/components/icons/filters/DropletIcon";
import { PixelateIcon } from "~/components/icons/filters/PixelateIcon";
import { SunHighIcon } from "~/components/icons/filters/SunHighIcon";

export interface FilterDrawerProps {
  open: boolean;
  blur: number;
  brightness: number;
  contrast: number;
  saturation: number;
  pixelate: number;
  red: number;
  green: number;
  blue: number;
  onFilterChange: (filter: Partial<StagedFilter>) => void;
  onClose: () => void;
}

export function FilterDrawer({
  open,
  onClose,
  blur,
  brightness,
  contrast,
  saturation,
  pixelate,
  red,
  green,
  blue,
  onFilterChange,
}: FilterDrawerProps): ReactElement {
  const intl = useIntl();
  const menuRef = useRef<HTMLElement>(null);
  useClickOutside(menuRef, onClose);

  return (
    <div className="drawer drawer-end z-30">
      <input
        id="filter-drawer"
        readOnly
        type="checkbox"
        checked={open}
        className="drawer-toggle"
        aria-label={intl.formatMessage({
          description: "FilterDrawer - drawer toggle label",
          defaultMessage: "Filters panel",
          id: "filterDrawer.drawerToggle",
        })}
      />
      <div className="drawer-side overflow-hidden">
        <label htmlFor="filter-drawer" aria-label="close sidebar" />
        <ul className="menu bg-neutral-content text-base-content dark:bg-neutral flex min-h-full w-60 flex-col flex-wrap p-4 text-base shadow-xl md:w-96">
          <li className="p-0">
            <div className="flex flex-row">
              <span className="flex flex-1 p-4 text-2xl font-bold">
                {intl.formatMessage({
                  description: "FilterDrawer - heading",
                  defaultMessage: "Filters",
                  id: "filterDrawer.heading",
                })}
              </span>
              <div className="flex flex-row items-center">
                <button
                  className="btn btn-circle btn-ghost btn-sm"
                  onClick={onClose}
                  aria-label={intl.formatMessage({
                    description: "FilterDrawer - close button label",
                    defaultMessage: "Close filters",
                    id: "filterDrawer.close",
                  })}
                >
                  <XMarkIcon />
                </button>
              </div>
            </div>
          </li>
          <li className="divider divider-vertical h-1/2 p-0" />
          <li className="flex gap-2">
            <button className="my-2 text-base font-bold" onClick={() => onFilterChange({ brightness: 1 })}>
              <SunHighIcon />
              {intl.formatMessage({
                description: "FilterDrawer - brightness label",
                defaultMessage: "Brightness",
                id: "filterDrawer.brightness",
              })}
            </button>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={brightness}
              onChange={(e) => onFilterChange({ brightness: Number(e.target.value) })}
              className="range range-primary"
              aria-label={intl.formatMessage({
                description: "FilterDrawer - brightness range label",
                defaultMessage: "Brightness",
                id: "filterDrawer.brightnessRange",
              })}
            />
            <button className="text-base font-bold" onClick={() => onFilterChange({ contrast: 1 })}>
              <ContrastIcon />
              {intl.formatMessage({
                description: "FilterDrawer - contrast label",
                defaultMessage: "Contrast",
                id: "filterDrawer.contrast",
              })}
            </button>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={contrast}
              onChange={(e) => onFilterChange({ contrast: Number(e.target.value) })}
              className="range range-secondary"
              aria-label={intl.formatMessage({
                description: "FilterDrawer - contrast range label",
                defaultMessage: "Contrast",
                id: "filterDrawer.contrastRange",
              })}
            />
            <button className="text-base font-bold" onClick={() => onFilterChange({ saturation: 1 })}>
              <DropletIcon />
              {intl.formatMessage({
                description: "FilterDrawer - saturation label",
                defaultMessage: "Saturation",
                id: "filterDrawer.saturation",
              })}
            </button>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={saturation}
              onChange={(e) => onFilterChange({ saturation: Number(e.target.value) })}
              className="range range-accent"
              aria-label={intl.formatMessage({
                description: "FilterDrawer - saturation range label",
                defaultMessage: "Saturation",
                id: "filterDrawer.saturationRange",
              })}
            />
          </li>
          <li className="divider divider-vertical mt-8 h-1/2" />
          <li className="flex gap-4">
            <button className="text-base font-bold" onClick={() => onFilterChange({ red: 1, green: 1, blue: 1 })}>
              {intl.formatMessage({
                description: "FilterDrawer - RGB label",
                defaultMessage: "RGB",
                id: "filterDrawer.rgb",
              })}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={red}
              onChange={(e) => onFilterChange({ red: Number(e.target.value) })}
              className="range range-error"
              aria-label={intl.formatMessage({
                description: "FilterDrawer - red channel range label",
                defaultMessage: "Red",
                id: "filterDrawer.redRange",
              })}
            />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={green}
              onChange={(e) => onFilterChange({ green: Number(e.target.value) })}
              className="range range-success"
              aria-label={intl.formatMessage({
                description: "FilterDrawer - green channel range label",
                defaultMessage: "Green",
                id: "filterDrawer.greenRange",
              })}
            />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={blue}
              onChange={(e) => onFilterChange({ blue: Number(e.target.value) })}
              className="range range-info"
              aria-label={intl.formatMessage({
                description: "FilterDrawer - blue channel range label",
                defaultMessage: "Blue",
                id: "filterDrawer.blueRange",
              })}
            />
          </li>
          <li className="divider divider-vertical mt-8 h-1/2" />
          <li className="flex gap-2">
            <button className="text-base font-bold" onClick={() => onFilterChange({ blur: 0 })}>
              <BlurIcon />
              {intl.formatMessage({
                description: "FilterDrawer - blur label",
                defaultMessage: "Blur",
                id: "filterDrawer.blur",
              })}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={blur}
              onChange={(e) => onFilterChange({ blur: Number(e.target.value) })}
              className="range range-warning"
              aria-label={intl.formatMessage({
                description: "FilterDrawer - blur range label",
                defaultMessage: "Blur",
                id: "filterDrawer.blurRange",
              })}
            />
            <button className="text-base font-bold" onClick={() => onFilterChange({ pixelate: 0 })}>
              <PixelateIcon />
              {intl.formatMessage({
                description: "FilterDrawer - pixelate label",
                defaultMessage: "Pixelate",
                id: "filterDrawer.pixelate",
              })}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={pixelate}
              onChange={(e) => onFilterChange({ pixelate: Number(e.target.value) })}
              className="range range-warning"
              aria-label={intl.formatMessage({
                description: "FilterDrawer - pixelate range label",
                defaultMessage: "Pixelate",
                id: "filterDrawer.pixelateRange",
              })}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}
