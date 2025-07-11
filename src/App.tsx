import type { FC } from "react";
import { QRCard } from "./components/QRCard";
import { QRControlBar } from "./components/QRControlBar";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorBoundaryContent } from "./components/ErrorBoundaryContent";
import { Frame } from "./components/Frame";
import { Landing } from "./Homepage";

export interface AppProps {
  app: "barcode" | "sku" | "landing";
}

export const App: FC<AppProps> = ({ app }) => {
  return (
    <div className="flex flex-col p-0 overflow-hidden">
      <ErrorBoundary fallback={<ErrorBoundaryContent />}>
        {app === "landing" ? (
          <Landing />
        ) : (
          <>
            <QRControlBar />
            <div className="flex flex-col gap-2 p-3 items-center justify-center app-core max-h-dvh">
              <QRCard />
            </div>
            <Frame app={app} />
          </>
        )}
      </ErrorBoundary>
    </div>
  );

};