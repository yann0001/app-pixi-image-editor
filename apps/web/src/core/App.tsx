import { type ReactElement, useEffect } from "react";
import { AppProviders } from "./AppProviders";
import { AppRoutes } from "./routes/AppRoutes";

export function App(): ReactElement {
  function handlePreloadError(): void {
    window.location.reload();
  }

  useEffect(() => {
    window.addEventListener("vite:preloadError", handlePreloadError);

    return () => {
      window.removeEventListener("vite:preloadError", handlePreloadError);
    };
  }, []);

  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
}
