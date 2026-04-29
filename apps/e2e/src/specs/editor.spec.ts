import { test, expect } from "@playwright/test";

// Minimal valid 1×1 transparent PNG — enough for the editor to load without errors.
const MINIMAL_PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
  "base64"
);

async function uploadImage(page: import("@playwright/test").Page): Promise<void> {
  const fileInput = page.getByTestId("home__dropzone-input");
  await fileInput.setInputFiles({ name: "test.png", mimeType: "image/png", buffer: MINIMAL_PNG });
}

test.describe("home", () => {
  test("shows the upload prompt", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});

test.describe("editor flow", () => {
  test("uploading a file opens the editor", async ({ page }) => {
    await page.goto("/");
    await uploadImage(page);
    await expect(page).toHaveURL(/#\/editor/);
  });

  test("new image button returns to the home view", async ({ page }) => {
    await page.goto("/");
    await uploadImage(page);
    await expect(page).toHaveURL(/#\/editor/);

    await page.getByTestId("editor__menu-button").click();
    await page.getByTestId("editor__drawer-new-image").click();

    await expect(page).toHaveURL(/#\//);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
