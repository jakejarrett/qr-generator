import { Flex } from "@radix-ui/themes";
import type { FC } from "react";
import { QRCard } from "./components/QRCard";
import { QRControlBar } from "./components/BottomBar";

export const App: FC = () => {
  return (
    <Flex direction="column" gap="2" p="0" overflow={"visible"}>
      <QRControlBar />
      <Flex direction="column" gap="2" p="3" mt="9" align="center">
        <QRCard background="white" code="123" color="black" type="qrcode" />
      </Flex>
    </Flex>
  );

};