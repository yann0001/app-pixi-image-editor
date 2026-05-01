import type { ReactElement, ReactNode } from "react";
import { AppLocales } from "./AppLocales";
import { PwaLifecycle } from "~/core/pwa/PwaLifecycle";

export interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps): ReactElement {
  return (
    <AppLocales>
      <PwaLifecycle>{children as ReactElement}</PwaLifecycle>
    </AppLocales>
  );
}
