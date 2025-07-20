"use client"

import { type ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id: string
    sku: string
    // status: "pending" | "processing" | "success" | "failed"
    description: string
}

export const columns: ColumnDef<Payment>[] = [
    // {
    //     accessorKey: "status",
    //     header: "Status",
    // },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "sku",
        header: "SKU",
    },
];