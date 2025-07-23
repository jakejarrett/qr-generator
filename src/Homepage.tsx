import type { FC } from "react";
import { useShallow } from "zustand/shallow";
import { PiTableThin, PiBarcodeThin } from "react-icons/pi";

import { LinkCard } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { useSKUStore, type SkuItem } from "./store/sku.store";

export const Landing: FC = () => {
    const SKUState = useSKUStore(useShallow(s => s));

    return (
        <div className="flex flex-col justify-center items-center h-dvh w-dvw gap-6">
            <p className="font-bold">
                Apps
            </p>
            <div className="flex justify-center items-stretch gap-4">
                <LinkCard
                    className="bg-emerald-700 h-40 w-64 hover:bg-emerald-900 active:bg-emerald-950 focus:bg-emerald-950 no-underline flex flex-col gap-3 items-center"
                    to="/barcode"
                    viewTransition={true}
                >
                    <div className="icon-container h-16 w-16">
                        <PiBarcodeThin className="h-16 w-16" />
                    </div>
                    <div>
                        <p className="font-bold text-lg">
                            Barcode Generator
                        </p>
                    </div>

                </LinkCard>

                <LinkCard
                    className="bg-emerald-700 h-40 w-64 hover:bg-emerald-900 active:bg-emerald-950 focus:bg-emerald-950 no-underline flex flex-col gap-3 items-center"
                    to="/sku"
                    viewTransition={true}
                >
                    <div className="icon-container h-16 w-16">
                        <PiTableThin className="h-16 w-16" />
                    </div>
                    <div>
                        <p className="font-bold text-lg">
                            SKU Generator
                        </p>
                    </div>
                </LinkCard>
            </div>

            <div className="flex flex-col gap-3">
                <h3 className="font-semibold text-center">Import Project (JSON / ZIP)</h3>

                <div className="flex flex-col">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
                    <Input
                        className="w-full cursor-pointer"
                        id="file_input"
                        type="file"
                        onChange={e => {
                            e.target.files?.[0]?.text().then(contents => {
                                try {
                                    const parsed = JSON.parse(contents);
                                    const skus: SkuItem[] = parsed.skus;
                                    SKUState.clearItems()
                                    SKUState.addItems(skus);
                                } catch (err) {
                                    console.error(err);
                                }
                            }).catch(console.error)
                        }}
                    />
                </div>
            </div>
        </div>
    );
};