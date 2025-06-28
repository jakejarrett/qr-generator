import type { FC } from "react";
import {
    Box,
    DropdownMenu,
    Flex,
    Heading,
    IconButton,
    Select,
    Slider,
    Text,
} from "@radix-ui/themes";
import { useShallow } from "zustand/shallow";
import { useQRStore } from "../store/qr.store";

export const QRControlBar: FC = () => {
    const state = useQRStore(useShallow(s => s));

    return (
        <Flex flexShrink="0" gap="6" direction="column" width="100vw" style={{ overflow: "visible" }}>
            <Box
                mt="3"
                mb="5"
                px="2"
                style={{
                    borderRadius: "0",
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
                        <Flex direction="row" align="center" gap="2">
                            <Heading size="1">Type</Heading>
                            <Select.Root defaultValue="apple">
                                <Select.Trigger style={{ borderRadius: '0' }} />
                                <Select.Content position="popper">
                                    <Select.Group>
                                        <Select.Label>Fruits</Select.Label>
                                        <Select.Item value="orange">Orange</Select.Item>
                                        <Select.Item value="apple">Apple</Select.Item>
                                        <Select.Item value="grape" disabled>
                                            Grape
                                        </Select.Item>
                                    </Select.Group>
                                    <Select.Separator />
                                    <Select.Group>
                                        <Select.Label>Vegetables</Select.Label>
                                        <Select.Item value="carrot">Carrot</Select.Item>
                                        <Select.Item value="potato">Potato</Select.Item>
                                    </Select.Group>
                                </Select.Content>
                            </Select.Root>
                        </Flex>
                    </Flex>

                    <Flex align="center" gap="3">
                        Middle
                    </Flex>

                    <Flex align="center" gap="2" p="5">
                        End
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    );
};