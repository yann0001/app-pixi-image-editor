import type { Decorator } from "@storybook/react-vite";

export const ToastDecorator: Decorator = (Story) => {
  return <>{Story()}</>;
};
