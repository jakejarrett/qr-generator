import type { FC } from "react"
import { columns, type Payment } from "./columns"
import { DataTable } from "./DataTable"

const getData = (): Payment[] => {
    // Fetch data from your API here.
    return [
        {
            id: "728ed52f",
            description: "Small flower plant pot",
            sku: "PP-FLWR-SM"
        },
        // ...
    ]
}

export const TableView: FC = () => {
    const data = getData();

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}