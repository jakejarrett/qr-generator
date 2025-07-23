import type { FC } from "react"
import { columns } from "./columns"
import { DataTable } from "./DataTable"
import { useSKUStore } from "@/store/sku.store";

export const TableView: FC = () => {
    const data = useSKUStore(s => s.items);

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}