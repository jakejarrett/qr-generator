import { type FC, type MouseEvent } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { Button } from "./ui/button";

export const ErrorBoundaryBar: FC = () => {
    const { resetBoundary } = useErrorBoundary();

    const onClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        localStorage.clear();
        window.requestAnimationFrame(() => {
            resetBoundary();
        })
    }

    return (
        <div className="flex flex-col shrink-0 gap-6 w-dvw overflow-visible bottom-nav">
            <div className="mb-5 px-2 rounded-xl shadow mx-auto overflow-visible control-bar backdrop-blur-md">
                <div className="flex justify-between relative h-full">
                    <div className="flex items-center p-1 gap-4">
                        <Button variant="destructive" onClick={onClick}>Reset State</Button>
                    </div>

                    <div className="flex items-center gap-3"></div>

                    <div className="flex items-center gap-2 p-5"></div>

                </div>
            </div>
        </div>
    );
};