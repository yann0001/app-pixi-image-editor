import type { FC, ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { withImage } from "./WithImage";

const VALID_IMAGE_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

const INVALID_IMAGE_URL = "data:image/png;base64,INVALID_BASE64!!";

interface ImageDisplayProps {
  image: HTMLImageElement;
  url: string;
  LoaderComponent: FC;
  ErrorComponent: FC;
}

function ImageDisplay({ image }: ImageDisplayProps): ReactElement {
  return <img data-testid="image-display" src={image.src} alt="loaded" />;
}

function Loader(): ReactElement {
  return <span data-testid="image-loader">Loading…</span>;
}

function ErrorFallback(): ReactElement {
  return <span data-testid="image-error">Failed to load</span>;
}

const WrappedImage = withImage(ImageDisplay);

describe("withImage", () => {
  it("eventually renders the image after a valid URL loads", async () => {
    render(<WrappedImage url={VALID_IMAGE_URL} LoaderComponent={Loader} ErrorComponent={ErrorFallback} />);

    const display = await screen.findByTestId("image-display", {}, { timeout: 3000 });
    expect(display).toBeTruthy();
  });

  it("shows loader or image immediately after mount for a valid URL", () => {
    render(<WrappedImage url={VALID_IMAGE_URL} LoaderComponent={Loader} ErrorComponent={ErrorFallback} />);

    const hasLoader = screen.queryByTestId("image-loader");
    const hasImage = screen.queryByTestId("image-display");
    expect(hasLoader !== null || hasImage !== null).toBe(true);
  });

  it("shows error fallback when the image URL is invalid", async () => {
    render(<WrappedImage url={INVALID_IMAGE_URL} LoaderComponent={Loader} ErrorComponent={ErrorFallback} />);

    const error = await screen.findByTestId("image-error", {}, { timeout: 3000 });
    expect(error).toBeTruthy();
    expect(error.textContent).toBe("Failed to load");
  });
});
