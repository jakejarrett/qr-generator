import * as React from "react";
import { Popover } from "radix-ui";
import { SketchPicker } from "react-color";

import "./styles.css";

interface ColorPickerProps {
    defaultValue: string;
    onChange: (hex: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ defaultValue, onChange }) => {
    const [color, setColor] = React.useState<string>(defaultValue);

    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <button className="IconButton" aria-label="Update dimensions" style={{ backgroundColor: color }} />
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content className="PopoverContent" sideOffset={5}>
                    <SketchPicker color={color} onChange={c => setColor(c.hex)} onChangeComplete={({ hex }) => onChange(hex)} />
                    <Popover.Arrow className="PopoverArrow" />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
};
