
import { matchSorter, rankings } from "match-sorter";
import { useMemo, useState, type FC } from "react";
import { BCID_LIST, type SupportedBCID } from "../../bcid";
import "./style.css";
import { useShallow } from "zustand/shallow";
import { useQRStore } from "../../store/qr.store";

import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"



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
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="flex flex-row justify-between cursor-pointer">
                    {state.bcid
                        ? state.bcid
                        : "Select a barcode type"}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search barcode types" onValueChange={val => setSearchValue(val)} value={searchValue} />
                    <CommandList>
                        <CommandEmpty>None found :(</CommandEmpty>
                        <CommandGroup>
                            {matches.map((bcid) => (
                                <CommandItem
                                    key={bcid}
                                    value={bcid}
                                    onSelect={(val) => {
                                        state.update({ bcid: val as SupportedBCID })
                                        setOpen(false)
                                    }}
                                >
                                    <CheckIcon
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            searchValue === bcid ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {bcid}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

