import type { Meta, StoryObj } from "@storybook/react-vite";
import { LoadingView } from "./LoadingView";

const meta: Meta<typeof LoadingView> = {
  component: LoadingView,
  title: "Views/Loading",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
