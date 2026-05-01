import type { Meta, StoryObj } from "@storybook/react-vite";
import { ErrorView } from "./ErrorView";

const meta: Meta<typeof ErrorView> = {
  component: ErrorView,
  title: "Views/Error",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { onBack: () => {} },
};

export const WithMessage: Story = {
  args: { onBack: () => {}, message: "File somehow went missing 🤔" },
};
