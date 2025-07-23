"use client"

import { Button } from "@/components/ui/button"
import { useSKUStore, type SkuItem } from "@/store/sku.store"
import { type ColumnDef } from "@tanstack/react-table"
import type { FC, MouseEvent } from "react"
import { PiTrashThin } from "react-icons/pi"

const ActionColumn: FC<{ sku: SkuItem["sku"] }> = ({ sku }) => {
    const remove = useSKUStore(s => s.removeItem);

    const onClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        remove(sku);
    }

    return (
        <Button variant="outline" onClick={onClick}>
            <PiTrashThin size={24} />
        </Button >
    )
};

export const columns: ColumnDef<SkuItem>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "sku",
        header: "SKU",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "codeType",
        header: "Code Type",
        cell: ({ row }) => {
            const codeType: string | undefined = row.getValue("codeType");
            return <p className="uppercase">{codeType ? codeType : "N/A"}</p>;
        },
    },
    {
        header: "Actions",
        cell: ({ row }) => {
            return <ActionColumn sku={row.original.sku} />;
        },
    }
];