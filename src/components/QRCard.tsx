import type { FC } from "react";
import bwipjs from 'bwip-js';
import { useShallow } from "zustand/shallow";
import { useQRStore } from "../store/qr.store";
import { Card } from "./ui/card";

export const QRCard: FC = () => {
    const state = useQRStore(useShallow(s => s));

    return (
        <Card className="max-w-64 max-h-64 w-full p-3">
            <canvas
                height={256}
                width={256}
                ref={(canvas) => {
                    if (!canvas) return;

                    bwipjs.toCanvas(canvas, {
                        bcid: state.bcid || ' ',
                        text: state.code || ' ',
                        width: 32,
                        height: 32,
                        textxalign: 'center',
                        textcolor: state.color,
                        barcolor: state.color,
                        backgroundcolor: state.background
                    });
                }}
            />
        </Card>
    )
};