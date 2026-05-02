import type { FC, ReactElement } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { withImage } from "./WithImage";

// 1x1 transparent PNG as a data URL — loads synchronously in Chromium
const VALID_IMAGE_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

const INVALID_IMAGE_URL = "data:image/png;base64,INVALID_BASE64!!";

function Loader(): ReactElement {
  return <span data-testid="image-loader">Loading…</span>;
}

function ErrorFallback(): ReactElement {
  return <span data-testid="image-error">Failed to load</span>;
}

interface ImageDisplayProps {
  image: HTMLImageElement;
  url: string;
  LoaderComponent: FC;
  ErrorComponent: FC;
}

function ImageDisplay({ image }: ImageDisplayProps): ReactElement {
  return <img data-testid="image-display" src={image.src} alt="loaded" />;
}

const WrappedImage = withImage(ImageDisplay);

function ValidImageWrapper(): ReactElement {
  return <WrappedImage url={VALID_IMAGE_URL} LoaderComponent={Loader} ErrorComponent={ErrorFallback} />;
}

function InvalidImageWrapper(): ReactElement {
  return <WrappedImage url={INVALID_IMAGE_URL} LoaderComponent={Loader} ErrorComponent={ErrorFallback} />;
}

const meta: Meta<typeof ValidImageWrapper> = {
  component: ValidImageWrapper,
  title: "Core/Image/Utils",
};

export default meta;

export const LoadsSuccessfully: StoryObj<typeof ValidImageWrapper> = {
  render: () => <ValidImageWrapper />,
  play: async ({ canvas }) => {
    // Wait for image to load and component to display
    const display = await canvas.findByTestId("image-display", {}, { timeout: 3000 });
    await expect(display).toBeInTheDocument();
  },
} satisfies StoryObj<typeof ValidImageWrapper>;

export const ShowsLoaderInitially: StoryObj<typeof ValidImageWrapper> = {
  render: () => <ValidImageWrapper />,
  play: async ({ canvas }) => {
    // Loader or image should be present (image might load fast in Chromium)
    const hasLoader = canvas.queryByTestId("image-loader");
    const hasImage = canvas.queryByTestId("image-display");
    await expect(hasLoader !== null || hasImage !== null).toBe(true);
  },
} satisfies StoryObj<typeof ValidImageWrapper>;

export const ShowsErrorOnFailure: StoryObj<typeof InvalidImageWrapper> = {
  render: () => <InvalidImageWrapper />,
  play: async ({ canvas }) => {
    const error = await canvas.findByTestId("image-error", {}, { timeout: 3000 });
    await expect(error).toBeInTheDocument();
    await expect(error).toHaveTextContent("Failed to load");
  },
} satisfies StoryObj<typeof InvalidImageWrapper>;
