import { useEffect, type ReactElement } from "react";
import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview, StoryContext } from "@storybook/react-vite";
import { IntlProvider } from "react-intl";
import { INITIAL_VIEWPORTS } from "storybook/viewport";
import "../src/main.css";

function DaisyUiThemeSync({ theme }: { theme: string }): null {
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  return null;
}

function withDaisyUiTheme(Story: () => ReactElement, context: StoryContext): ReactElement {
  const theme = (context.globals.theme as string) || "light";
  return (
    <>
      <DaisyUiThemeSync theme={theme} />
      <Story />
    </>
  );
}

const preview: Preview = {
  decorators: [
    (Story, context) => (
      <IntlProvider locale="en" messages={{}}>
        <Story {...context} />
      </IntlProvider>
    ),
    withDaisyUiTheme,
    withThemeByClassName({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
  parameters: {
    a11y: {
      test: "error",
      config: {
        rules: [{ id: "color-contrast", enabled: false }],
      },
    },
    options: {
      storySort: {
        method: "alphabetical",
        order: [
          "Design System",
          "Views",
          "Actions",
          "Core",
          "Display",
          "Editor",
          "Feedback",
          "Forms",
          "Input",
          "Layout",
          "Navigation",
          "Shared",
        ],
      },
    },
    viewport: {
      options: INITIAL_VIEWPORTS,
    },
  },
};

export default preview;
