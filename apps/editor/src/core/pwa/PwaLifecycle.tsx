import type { ReactElement } from "react";
import { PwaOfflineDialog } from "~/components/feedback/pwa-offline-dialog/PwaOfflineDialog";
import { PwaUpdateDialog } from "~/components/feedback/pwa-update-dialog/PwaUpdateDialog";
import { usePwaLifecycle } from "./UsePwaLifecycle";

interface Props {
  children: ReactElement;
}

export function PwaLifecycle({ children }: Props): ReactElement {
  const { needRefresh, offlineReady, handleOfflineClose, handleRefresh } = usePwaLifecycle();

  return (
    <>
      <PwaUpdateDialog open={needRefresh} onUpdate={handleRefresh} />
      <PwaOfflineDialog open={offlineReady} onClose={handleOfflineClose} />
      {children}
    </>
  );
}
