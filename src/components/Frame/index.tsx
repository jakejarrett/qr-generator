import type { FC } from "react";
import { Link } from "react-router";
import { PiBarcodeThin, PiHouseThin, PiTableThin } from "react-icons/pi";

import type { AppProps } from "../../App";

import "./style.css";

export const Frame: FC<AppProps> = ({ app }) => {

    return (
        <div className="flex flex-col shrink-0 gap-6 w-dvw overflow-visible bottom-nav">
            <div className="mb-5 px-2 rounded-xl shadow mx-auto overflow-visible control-bar backdrop-blur-md">
                <div className="flex justify-between relative h-full">
                    <div className="flex items-center p-1 gap-4">
                        <Link viewTransition={true} to="/" className={app === 'landing' ? 'active' : undefined}>
                            <div className="flex flex-col gap-1 items-center rounded-xl px-6 py-2">
                                <PiHouseThin />
                                <p className="text-sm m-0">Homepage</p>
                            </div>
                        </Link>
                        <Link viewTransition={true} to="/barcode" className={app === 'barcode' ? 'active' : undefined}>
                            <div className="flex flex-col gap-1 items-center rounded-xl px-6 py-2">
                                <PiBarcodeThin />
                                <p className="text-sm m-0">Barcodes</p>
                            </div>
                        </Link>
                        <Link viewTransition={true} to="/sku" className={app === 'sku' ? 'active' : undefined}>
                            <div className="flex flex-col gap-1 items-center rounded-xl px-6 py-2">
                                <PiTableThin />
                                <p className="text-sm m-0">SKU</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
