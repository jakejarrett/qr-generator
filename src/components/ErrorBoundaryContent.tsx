import { type FC, type MouseEvent } from "react";
import { Box, Button, Card, Flex, Heading, Text, } from "@radix-ui/themes";
import { useShallow } from "zustand/shallow";
import { useQRStore } from "../store/qr.store";
import { useErrorBoundary } from "react-error-boundary";

export const ErrorBoundaryContent: FC = () => {
    const state = useQRStore(useShallow(s => s));
    const { resetBoundary } = useErrorBoundary();

    const onClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        state.reset();
        window.requestAnimationFrame(() => {
            resetBoundary();
        })
    }

    return (
        <Flex direction="column" gap="2" p="3" mt="9" align="center">
            <Card className="p-0" m="0">
                <Heading className="w-full bg-accent pad" size="2">An error occurred, click reset state to reset state.</Heading>
                <Box className="pad font-sm">
                    <Text>Failed with the following state (likely the BCID/Barcode type)</Text>
                    <pre>
                        {JSON.stringify(state, null, 2)}
                    </pre>
                </Box>

                <Box className="w-full bg-accent pad">
                    <Button onClick={onClick}>Reset State</Button>
                </Box>
            </Card>
        </Flex >
    );
};