import {
    Combobox,
    ComboboxItem,
    ComboboxList,
    ComboboxProvider,
} from "@ariakit/react";
import * as RadixSelect from "@radix-ui/react-select";
import { matchSorter, rankings } from "match-sorter";
import { startTransition, useMemo, useState, type FC } from "react";
import { BCID_LIST, type SupportedBCID } from "../../bcid";
import "./style.css";
import { CheckIcon } from "@radix-ui/react-icons";
import { Box } from "@radix-ui/themes";
import { useShallow } from "zustand/shallow";
import { useQRStore } from "../../store/qr.store";

const ChevronUpDownIcon: FC = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="m7 15 5 5 5-5" />
        <path d="m7 9 5-5 5 5" />
    </svg>
);

const SearchIcon: FC = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
    </svg>
);


export const BCIDSearch: FC = () => {
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const state = useQRStore(useShallow(s => s));

    const matches = useMemo(() => {
        if (!searchValue) return BCID_LIST;
        const matches = matchSorter(BCID_LIST, searchValue, { threshold: rankings.CONTAINS });
        // Radix Select does not work if we don't render the selected item, so we
        // make sure to include it in the list of matches.
        const selectedLanguage = BCID_LIST.find((bcidValue) => bcidValue === state.bcid);
        if (selectedLanguage && !matches.includes(selectedLanguage)) {
            matches.push(selectedLanguage);
        }
        return matches;
    }, [searchValue, state.bcid]);

    return (
        <Box className={state.bcid.trim() === "" ? "data-empty" : undefined}>
            <RadixSelect.Root
                value={state.bcid}
                onValueChange={(val: SupportedBCID) => state.update({ bcid: val })}
                open={open}
                onOpenChange={setOpen}
            >
                <ComboboxProvider
                    open={open}
                    setOpen={setOpen}
                    resetValueOnHide
                    includesBaseElement={false}
                    setValue={(value) => {
                        startTransition(() => {
                            setSearchValue(value);
                        });
                    }}
                >
                    <RadixSelect.Trigger aria-label="Language" className="select">
                        <RadixSelect.Value placeholder="Select a barcode type" />
                        <RadixSelect.Icon className="select-icon">
                            <ChevronUpDownIcon />
                        </RadixSelect.Icon>
                    </RadixSelect.Trigger>
                    <RadixSelect.Content
                        role="dialog"
                        aria-label="Barcodes"
                        position="popper"
                        className="popover"
                        sideOffset={4}
                        alignOffset={-16}
                    >
                        <Box className="combobox-wrapper" mb="2">
                            <div className="combobox-icon">
                                <SearchIcon />
                            </div>
                            <Combobox
                                autoSelect
                                placeholder="Search barcodes"
                                className="combobox"
                                // Ariakit's Combobox manually triggers a blur event on virtually
                                // blurred items, making them work as if they had actual DOM
                                // focus. These blur events might happen after the corresponding
                                // focus events in the capture phase, leading Radix Select to
                                // close the popover. This happens because Radix Select relies on
                                // the order of these captured events to discern if the focus was
                                // outside the element. Since we don't have access to the
                                // onInteractOutside prop in the Radix SelectContent component to
                                // stop this behavior, we can turn off Ariakit's behavior here.
                                onBlurCapture={(event) => {
                                    event.preventDefault();
                                    event.stopPropagation();
                                }}
                            />
                        </Box>
                        <ComboboxList className="listbox">
                            {matches.map((label) => (
                                <RadixSelect.Item
                                    key={label}
                                    value={label}
                                    asChild
                                    className="item"
                                >
                                    <ComboboxItem>
                                        <RadixSelect.ItemText>{label}</RadixSelect.ItemText>
                                        <RadixSelect.ItemIndicator className="item-indicator">
                                            <CheckIcon />
                                        </RadixSelect.ItemIndicator>
                                    </ComboboxItem>
                                </RadixSelect.Item>
                            ))}
                        </ComboboxList>
                    </RadixSelect.Content>
                </ComboboxProvider>
            </RadixSelect.Root>
        </Box >
    );
}

