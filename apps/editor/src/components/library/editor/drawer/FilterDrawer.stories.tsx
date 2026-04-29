import type { Meta, StoryObj } from "@storybook/react-vite";
import { FilterDrawer } from "./FilterDrawer";

const meta: Meta<typeof FilterDrawer> = {
  component: FilterDrawer,
  title: "Components/Editor/FilterDrawer",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    open: true,
    blur: 0,
    brightness: 1,
    contrast: 1,
    saturation: 1,
    pixelate: 0,
    red: 1,
    green: 1,
    blue: 1,
    onFilterChange: () => {},
    onClose: () => {},
  },
};

export const Closed: Story = {
  ...Open,
  args: { ...Open.args, open: false },
};
