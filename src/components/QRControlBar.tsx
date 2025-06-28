import type { FC } from "react";
import { Box, Flex, Heading, TextField } from "@radix-ui/themes";
import { useShallow } from "zustand/shallow";

import { useQRStore } from "../store/qr.store";
import { BCIDSearch } from "./BCIDSearch";
import { ColorPicker } from "./ColorPicker";

export const QRControlBar: FC = () => {
    const state = useQRStore(useShallow(s => s));

    console.log(state);

    return (
        <Flex flexShrink="0" gap="6" direction="column" width="100vw" style={{ overflow: "visible" }}>
            <Box
                mt="3"
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
                        <Flex direction="row" align="center" gap="2">
                            <BCIDSearch />

                            <TextField.Root placeholder="Enter a value here" radius="large" className="box-shadow-none" value={state.code} onChange={e => state.update({ code: e.target.value })}>
                                <TextField.Slot></TextField.Slot>
                            </TextField.Root>
                        </Flex>
                    </Flex>

                    <Flex align="center" gap="3">
                        <Flex direction="row" align="center" gap="2">
                            <Heading size="1">Background</Heading>
                            <ColorPicker defaultValue={state.background} onChange={h => state.update({ background: h })} />
                        </Flex>
                        <Flex direction="row" align="center" gap="2">
                            <Heading size="1">Foreground</Heading>
                            <ColorPicker defaultValue={state.color} onChange={h => state.update({ color: h })} />
                        </Flex>
                    </Flex>

                    <Flex align="center" gap="2" p="5">
                        End
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    );
};