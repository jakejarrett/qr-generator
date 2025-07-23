import { useRef, useState, type FC, type MouseEvent } from "react";
import { useShallow } from "zustand/shallow";
import bwipjs from 'bwip-js';

import { useSKUStore, type SkuItem } from "@/store/sku.store";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { getSKUList } from "@/utils/lib";
import { useQRStore } from "@/store/qr.store";
import { BCIDSearchControlled } from "./BCIDSearchControlled";
import type { SupportedBCID } from "@/bcid";

export const SKUControlBar: FC = () => {
    const skuRef = useRef<HTMLInputElement>(null);
    const state = useSKUStore(useShallow(s => s));
    const qrState = useQRStore(useShallow(s => s));
    const [name, setName] = useState<string | undefined>();
    const [description, setDescription] = useState<string | undefined>();
    const [sku, setSKU] = useState<string | undefined>();
    const [bcid, setBCID] = useState<SupportedBCID | undefined>();

    const onClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if ((name && name?.trim() !== "") && (sku && sku?.trim() !== "") && (description && description?.trim() !== "")) {
            state.addItem({ name, description, sku, codeType: bcid ?? "qrcode" });
        }

        window.requestAnimationFrame(() => {
            setName(undefined);
            setSKU(undefined);
            setDescription(undefined);
            setBCID(undefined);

            skuRef?.current?.focus();
        });
    };

    const onChangeBCID = (newBCID: SupportedBCID) => setBCID(newBCID);

    const onRequestDownload = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const skus = getSKUList();
        const res = { skus, codes: [] as { sku: string; code: string; }[] };

        for (const sku of skus) {
            const code = bwipjs.toSVG({
                bcid: sku.codeType || qrState.bcid || 'qrcode',
                text: sku.sku || ' ',
                textxalign: 'center',
                textcolor: qrState.color,
                barcolor: qrState.color,
                backgroundcolor: qrState.background
            });

            res.codes.push({
                sku: sku.sku,
                code,
            });
        }

        console.log(res);
    };

    return (
        <div className="flex shrink-0 gap-6 flex-col w-dvw overflow-visible">
            <form className="my-5 px-2 rounded-xl shadow mx-auto overflow-visible control-bar backdrop-blur-md w-full max-w-7xl">
                <div className="flex justify-between relative h-full gap-5 p-5 px-3">
                    <div className="flex items-center gap-4 w-full">
                        <Input className="rounded-lg box-shadow-none w-full" placeholder="Enter a product Name" value={name} onChange={e => setName(e.target.value)} ref={skuRef} />
                        <Input className="rounded-lg box-shadow-none w-full" placeholder="Enter a SKU" value={sku} onChange={e => setSKU(e.target.value)} ref={skuRef} />
                        <BCIDSearchControlled onChange={onChangeBCID} />
                        <Input className="rounded-lg box-shadow-none w-full" placeholder="Enter a description" value={description} onChange={e => setDescription(e.target.value)} />
                        <Button variant="secondary" className="bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-950 focus:bg-emerald-950" onClick={onClick}>Add</Button>
                    </div>

                    <div className="flex items-center gap-2 border-l border-l-gray-10 pl-5">
                        <Button variant="secondary" className="bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-950 focus:bg-emerald-950" onClick={onRequestDownload}>Download List</Button>
                    </div>
                </div>
            </form>
        </div>
    );
};