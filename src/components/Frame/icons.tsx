import BwipJs from "bwip-js";
import type { FC } from "react";
import type { SupportedBCID } from "../../bcid";

export const QRIcon: FC = () => (
    <canvas
        height="1em"
        width="1em"
        ref={(canvas) => {
            if (!canvas) return;

            BwipJs.toCanvas(canvas, {
                bcid: 'qrcode' as SupportedBCID,               // Barcode type
                text: 'https://ecom.minecraftemails.com',
                textxalign: 'center',                // Always good to set this
                barcolor: "#000",
                backgroundcolor: '',
                height: .5,
                width: .5,
            });
        }}
    />
)