import { Box, Card } from "@radix-ui/themes";
import type { FC } from "react";
import bwipjs from 'bwip-js';
import { useShallow } from "zustand/shallow";
import { useQRStore } from "../store/qr.store";

export const QRCard: FC = () => {
    const state = useQRStore(useShallow(s => s));

    return (
        <Box maxWidth="256px">
            <Card>
                <canvas
                    height={256}
                    width={256}
                    ref={(canvas) => {
                        if (!canvas) return;

                        bwipjs.toCanvas(canvas, {
                            bcid: state.bcid || ' ',               // Barcode type
                            text: state.code || ' ',            // Text to encode
                            // scale: 400, // Scaling factor for high-DPI devices
                            // height: 10,                      // Bar height, in millimeters
                            textxalign: 'center',                // Always good to set this
                            textcolor: state.color,
                            barcolor: state.color,
                            backgroundcolor: state.background
                        });
                    }}
                />
            </Card>
        </Box>

    )
};