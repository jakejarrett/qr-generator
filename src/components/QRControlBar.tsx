import { useState, type FC, type MouseEvent } from "react";
import { useShallow } from "zustand/shallow";

import { useQRStore } from "../store/qr.store";
import { BCIDSearch } from "./BCIDSearch";
import { ColorPicker } from "./ColorPicker";
import bwipjs from 'bwip-js';
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const saveSVG = (svg: string, name: string) => {
    const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = `${name}.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

export const QRControlBar: FC = () => {
    const state = useQRStore(useShallow(s => s));
    const [name, setName] = useState<string>("generated_svg");

    const onClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        saveSVG(
            bwipjs.toSVG({
                bcid: state.bcid || ' ',
                text: state.code || ' ',
                textxalign: 'center',
                textcolor: state.color,
                barcolor: state.color,
                backgroundcolor: state.background
            }),
            name
        );
    }


    return (
        <div className="flex shrink-0 gap-6 flex-col w-dvw overflow-visible">
            <div className="my-5 px-2 rounded-xl shadow mx-auto overflow-visible control-bar backdrop-blur-md w-full max-w-7xl">
                <div className="flex justify-between relative h-full">
                    <div className="flex items-center p-1 gap-4">

                        <div className="flex items-center p-1 gap-2">
                            <BCIDSearch />

                            <Input className="rounded-lg box-shadow-none" placeholder="Enter a value here" value={state.code} onChange={e => state.update({ code: e.target.value })} />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center p-1 gap-2">
                            <h3 className="text-sm">Background</h3>
                            <ColorPicker value={state.background} onChange={h => state.update({ background: h })} />
                        </div>
                        <div className="flex items-center p-1 gap-2">
                            <h3 className="text-sm">Foreground</h3>
                            <ColorPicker value={state.color} onChange={h => state.update({ color: h })} />
                        </div>
                    </div>

                    <div className="flex items-center p-5 gap-2">
                        <Input className="rounded-lg box-shadow-none" placeholder="Enter file name here" value={name} onChange={e => setName(e.target.value)} />
                        <Button variant="secondary" className="bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-950 focus:bg-emerald-950" onClick={onClick}>Download</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};