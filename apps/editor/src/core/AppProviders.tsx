import type { ReactElement, ReactNode } from "react";
import { AppLocales } from "./AppLocales";
import { PwaProvider } from "~/components/library/pwa/PwaProvider";

export interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps): ReactElement {
  return (
    <AppLocales>
      <PwaProvider>{children as ReactElement}</PwaProvider>
    </AppLocales>
  );
}
