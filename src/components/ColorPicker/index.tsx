import * as React from "react";
// import { Popover } from "radix-ui";
import { SketchPicker } from "react-color";

import "./styles.css";
import * as Popover from "@radix-ui/react-popover";

interface ColorPickerProps {
    value: string;
    onChange: (hex: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange }) => {
    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <button className="IconButton" aria-label="Update dimensions" style={{ backgroundColor: value }} />
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content className="PopoverContent" sideOffset={0}>
                    <SketchPicker color={value} onChange={({ hex }) => onChange(hex)} onChangeComplete={({ hex }) => onChange(hex)} />
                    <Popover.Arrow className="PopoverArrow" />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
};
