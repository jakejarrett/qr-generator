import { type FC, type MouseEvent } from "react";
import { useShallow } from "zustand/shallow";
import { useErrorBoundary } from "react-error-boundary";

import { useQRStore } from "../store/qr.store";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

export const ErrorBoundaryContent: FC = () => {
    const state = useQRStore(useShallow(s => s));
    const { resetBoundary } = useErrorBoundary();

    const onClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        state.reset();
        window.requestAnimationFrame(() => {
            resetBoundary();
        })
    }

    return (
        <div className="flex flex-col gap-2 p-3 mt-9 items-center">
            <Card className="p-0 m-0">
                <h3 className="scroll-m-20 text-xl font-semibold tracking-tight w-full bg-accent pad">
                    An error occurred, click reset state to reset state.
                </h3>
                <div className="pad font-sm">
                    <p>Failed with the following state (likely the BCID/Barcode type)</p>
                    <pre>
                        {JSON.stringify(state, null, 2)}
                    </pre>
                </div>

                <div className="w-full bg-accent pad">
                    <Button variant="destructive" onClick={onClick}>Reset State</Button>
                </div>
            </Card>
        </div>
    );
};