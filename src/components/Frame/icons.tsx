import BwipJs from "bwip-js";
import { type FC } from "react";
import parse from 'html-react-parser';

import type { SupportedBCID } from "../../bcid";

interface QRIconProps { color?: string; };

const svg = ({ color = '#000' }: QRIconProps) => BwipJs.toSVG({
    bcid: 'qrcode' as SupportedBCID,               // Barcode type
    text: '/sku',
    textxalign: 'center',                // Always good to set this
    barcolor: color,
    backgroundcolor: '',
});

export const QRIcon: FC<QRIconProps> = (props) => parse(svg(props));