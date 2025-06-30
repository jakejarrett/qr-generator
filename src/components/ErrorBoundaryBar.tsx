import { type FC, type MouseEvent } from "react";
import { Box, Button, Flex } from "@radix-ui/themes";
import { useErrorBoundary } from "react-error-boundary";

export const ErrorBoundaryBar: FC = () => {
    const { resetBoundary } = useErrorBoundary();

    const onClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        localStorage.clear();
        window.requestAnimationFrame(() => {
            resetBoundary();
        })
    }

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
                        <Button color="jade" onClick={onClick}>Reset State</Button>
                    </Flex>

                    <Flex align="center" gap="3"></Flex>

                    <Flex align="center" gap="2" p="5">
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    );
};