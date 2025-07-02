import type { FC } from "react";
import { Box, Flex, Text } from "@radix-ui/themes";

import "./style.css";
import { useLocation } from "react-router";
import { QRIcon } from "./icons";

export const Frame: FC = () => {
    const { pathname } = useLocation();

    console.log(pathname)

    return (
        <Flex flexShrink="0" gap="6" direction="column" width="100vw" style={{ overflow: "visible" }}>
            <Box
                mb="5"
                px="2"
                style={{
                    borderRadius: ".5rem",
                    boxShadow: "var(--shadow-6)",
                    marginLeft: 200,
                    marginRight: 200,
                    overflow: "visible",
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)'
                }}
            >
                <Flex height="100%" justify="between" position="relative">
                    <Flex gap="4" align="center" p="1">
                        <Flex direction="column" align="center" gap="1" style={{ color: 'black', background: 'var(--accent-a11)', borderRadius: "0.5rem" }} px="6" py="2">
                            <QRIcon />
                            <Text size="2" m="0">Barcodes</Text>
                        </Flex>
                    </Flex>

                    <Flex align="center" gap="3">
                        BAHHH
                    </Flex>

                    <Flex align="center" gap="2" p="5">
                        DAHHH
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    );
}
