import { useEffect, type FC } from "react";
import { useShallow } from "zustand/shallow";

import { useSKUStore } from "@/store/sku.store";

export const SKUControlBar: FC = () => {
    const state = useSKUStore(useShallow(s => s));

    console.log(state.items);

    useEffect(() => {
        state.addItem({ name: "Sample Item", sku: "PP-FLWR-SM" });
        return () => state.removeItem("1");
    }, []);

    return (
        <div className="flex shrink-0 gap-6 flex-col w-dvw overflow-visible">
            <div className="my-5 px-2 rounded-xl shadow mx-auto overflow-visible control-bar backdrop-blur-md w-full max-w-7xl">
                <div className="flex justify-between relative h-full">
                    <div className="flex items-center p-1 gap-4">

                        <div className="flex items-center p-5 gap-2">
                            Hi!
                        </div>
                    </div>

                    <div className="flex items-center p-5 gap-2">
                        Filter items here
                    </div>
                </div>
            </div>
        </div>
    );
};