"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrderHistory = {
	id: string
	customer: string
	date: string
	order_number: string
	product: string
	units: number
	price: number
	order_status: "Processing" | "Shipped" | "Delivered" | "Cancelled"
}

export const columns: ColumnDef<OrderHistory>[] = [
	{
		accessorKey: "customer",
		header: "Customer",
	},
	{
		accessorKey: "date",
		header: "Date",
	},
	{
		accessorKey: "order_number",
		header: "Order Num.",
	},
	{
		accessorKey: "product",
		header: "Product",
	},
	{
		accessorKey: "units",
		header: "Units",
	},
	{
		accessorKey: "price",
		header: "Sales Price",
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue("price"))
			const formatted = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD",
			}).format(amount)

			return <div className="text-left font-medium">{formatted}</div>
		},
	},
	{
		accessorKey: "order_status",
		header: "Order Status",
		cell: ({ row }) => {
			const status = row.getValue("order_status")

			switch (status) {
				case "Processing": return <div className="text-amber-400 font-semibold">{status}</div>;
				case "Shipped": return <div className="text-green-600 font-semibold">{status}</div>
				case "Delivered": return <div className="text-violet-500 font-semibold">{status}</div>
				case "Cancelled": return <div className="text-red-400 font-semibold">{status}</div>
			}
		},
	}
]
