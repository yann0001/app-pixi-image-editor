import type { Meta, StoryObj } from "@storybook/react-vite";
import { NotFoundView } from "./NotFoundView";

const meta: Meta<typeof NotFoundView> = {
  component: NotFoundView,
  title: "Views/NotFound",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { onBack: () => {} },
};
