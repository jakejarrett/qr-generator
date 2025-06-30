import { Flex, Heading } from "@radix-ui/themes";
import type { FC } from "react";
import { QRCard } from "./components/QRCard";
import { QRControlBar } from "./components/QRControlBar";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorBoundaryContent } from "./components/ErrorBoundaryContent";

export const App: FC = () => {
  return (
    <Flex direction="column" gap="2" p="0" overflow={"visible"}>
      <ErrorBoundary fallback={<>
        <ErrorBoundaryContent />
      </>}>
        <>
          <QRControlBar />
          <Flex direction="column" gap="2" p="3" mt="9" align="center">
            <QRCard />
          </Flex>
        </>
      </ErrorBoundary>
    </Flex>
  );

};