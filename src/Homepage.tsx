import type { FC } from "react";
import { useShallow } from "zustand/shallow";
import { PiTableThin, PiBarcodeThin } from "react-icons/pi";

import { useQRStore } from "./store/qr.store";
import { LinkCard } from "./components/ui/card";

export const Landing: FC = () => {
    const state = useQRStore(useShallow(s => s));
    console.log(state);
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

            <div>
                Previous Projects

                <div className="flex flex-col">
                    <p>Hi</p>
                    <p>Hi</p>
                </div>
            </div>
        </div>
    );
};