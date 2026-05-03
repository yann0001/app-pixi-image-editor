import type { FC, ReactElement } from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, afterEach } from "vitest";
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

let container: HTMLDivElement;

afterEach(() => {
  if (container && container.parentNode) {
    document.body.removeChild(container);
  }
});

function waitFor(fn: () => boolean, timeout = 3000): Promise<void> {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    function check(): void {
      if (fn()) {
        resolve();
      } else if (Date.now() - start > timeout) {
        reject(new Error("waitFor timed out"));
      } else {
        setTimeout(check, 50);
      }
    }
    check();
  });
}

describe("withImage", () => {
  it("eventually renders the image after a valid URL loads", async () => {
    container = document.createElement("div");
    document.body.appendChild(container);
    act(() => {
      createRoot(container).render(
        <WrappedImage url={VALID_IMAGE_URL} LoaderComponent={Loader} ErrorComponent={ErrorFallback} />
      );
    });

    await waitFor(() => container.querySelector('[data-testid="image-display"]') !== null);
    expect(container.querySelector('[data-testid="image-display"]')).toBeTruthy();
  });

  it("shows loader or image immediately after mount for a valid URL", () => {
    container = document.createElement("div");
    document.body.appendChild(container);
    act(() => {
      createRoot(container).render(
        <WrappedImage url={VALID_IMAGE_URL} LoaderComponent={Loader} ErrorComponent={ErrorFallback} />
      );
    });

    const hasLoader = container.querySelector('[data-testid="image-loader"]');
    const hasImage = container.querySelector('[data-testid="image-display"]');
    expect(hasLoader !== null || hasImage !== null).toBe(true);
  });

  it("shows error fallback when the image URL is invalid", async () => {
    container = document.createElement("div");
    document.body.appendChild(container);
    act(() => {
      createRoot(container).render(
        <WrappedImage url={INVALID_IMAGE_URL} LoaderComponent={Loader} ErrorComponent={ErrorFallback} />
      );
    });

    await waitFor(() => container.querySelector('[data-testid="image-error"]') !== null);
    const error = container.querySelector('[data-testid="image-error"]');
    expect(error).toBeTruthy();
    expect(error?.textContent).toBe("Failed to load");
  });
});
