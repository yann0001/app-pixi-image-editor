import type { Decorator } from "@storybook/react";

export const ToastDecorator: Decorator = (Story) => {
  return <>{Story()}</>;
};
