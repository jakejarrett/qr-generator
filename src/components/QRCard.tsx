import { Box, Card } from "@radix-ui/themes";
import type { FC } from "react";
import bwipjs from 'bwip-js';

interface QRCardProps {
    code: string;
    type: "qrcode" | "datamatrix";
    color: string;
    background: string;
}

export const QRCard: FC<QRCardProps> = () => {
    // state here
    return (
        <Box maxWidth="256px">
            <Card>
                <canvas
                    height={256}
                    width={256}
                    ref={(canvas) => {
                        if (!canvas) {
                            return;
                        }

                        bwipjs.toCanvas(canvas, {
                            bcid: 'qrcode',               // Barcode type
                            text: '0123456789',            // Text to encode
                            // scale: 400, // Scaling factor for high-DPI devices
                            // height: 10,                      // Bar height, in millimeters
                            textxalign: 'center',                // Always good to set this
                            textcolor: '#fff',
                            barcolor: '#fff',
                        });
                    }}
                />
            </Card>
        </Box>

    )
};