import { Flex } from "@radix-ui/themes";
import type { FC } from "react";
import { QRCard } from "./components/QRCard";
import { QRControlBar } from "./components/QRControlBar";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorBoundaryContent } from "./components/ErrorBoundaryContent";

export const App: FC = () => {
  return (
    <Flex direction="column" p="0" overflow={"visible"}>
      <ErrorBoundary fallback={<>
        <ErrorBoundaryContent />
      </>}>
        <>
          <QRControlBar />
          <Flex direction="column" gap="2" p="3" align="center" justify="center" height="calc(100svh - 116px)" maxHeight="100dvh">
            <QRCard />
          </Flex>
        </>
      </ErrorBoundary>
    </Flex>
  );

};