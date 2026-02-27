import { columns, OrderHistory } from "./columns";
import { DataTable } from "./data-table";
import DashboardHeader from "@/app/components/DashboardHeader";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

import { HugeiconsIcon } from '@hugeicons/react';
import {
	ShoppingCart02Icon,
} from '@hugeicons/core-free-icons';

async function getData(): Promise<OrderHistory[]> {
	// Fetch data from your API here (or use this mock for dev/testing)
	return [
		{
			id: "ORD-49316-F",
			customer: "Mia Jackson",
			date: "06/11/25 - 20:15",
			order_number: "PO-7988",
			product: "Tablet 10\"",
			units: 2,
			price: 436.79,
			order_status: "Processing",
		},
		{
			id: "ORD-53686-C",
			customer: "Alex Hernandez",
			date: "20/01/26 - 12:40",
			order_number: "PO-6895",
			product: "Yoga Mat",
			units: 14,
			price: 167.94,
			order_status: "Shipped",
		},
		{
			id: "ORD-79974-A",
			customer: "Liam Brown",
			date: "17/04/25 - 10:15",
			order_number: "PO-9760",
			product: "Yoga Mat",
			units: 3,
			price: 203.01,
			order_status: "Shipped",
		},
		{
			id: "ORD-61667-F",
			customer: "Elijah Thomas",
			date: "15/02/25 - 18:35",
			order_number: "PO-7593",
			product: "Laptop Sleeve",
			units: 24,
			price: 671.64,
			order_status: "Delivered",
		},
		{
			id: "ORD-26424-H",
			customer: "Olivia Miller",
			date: "30/06/25 - 15:10",
			order_number: "PO-14158",
			product: "Protein Shaker",
			units: 6,
			price: 673.41,
			order_status: "Processing",
		},
		{
			id: "ORD-20357-H",
			customer: "Ava Jackson",
			date: "11/02/26 - 17:55",
			order_number: "PO-6921",
			product: "4K Camera",
			units: 3,
			price: 348.48,
			order_status: "Shipped",
		},
		{
			id: "ORD-23697-C",
			customer: "Elijah Martin",
			date: "03/07/25 - 15:40",
			order_number: "PO-5356",
			product: "LED Desk Lamp",
			units: 12,
			price: 307.83,
			order_status: "Processing",
		},
		{
			id: "ORD-72402-B",
			customer: "Sophia Wilson",
			date: "18/09/25 - 12:30",
			order_number: "PO-5373",
			product: "4K Camera",
			units: 6,
			price: 321.79,
			order_status: "Cancelled",
		},
		{
			id: "ORD-96275-G",
			customer: "Noah Williams",
			date: "07/12/25 - 11:15",
			order_number: "PO-13373",
			product: "Coffee Mug Warmer",
			units: 5,
			price: 648.00,
			order_status: "Shipped",
		},
		{
			id: "ORD-60785-G",
			customer: "Ava Johnson",
			date: "03/07/25 - 15:00",
			order_number: "PO-11167",
			product: "Protein Shaker",
			units: 27,
			price: 210.05,
			order_status: "Processing",
		},
		{
			id: "ORD-83547-H",
			customer: "Mason Gonzalez",
			date: "24/04/25 - 18:15",
			order_number: "PO-13429",
			product: "Noise-Cancelling Headphones",
			units: 29,
			price: 304.45,
			order_status: "Delivered",
		},
		{
			id: "ORD-87809-F",
			customer: "Charlotte Jones",
			date: "16/08/25 - 10:50",
			order_number: "PO-7908",
			product: "Resistance Bands",
			units: 6,
			price: 145.77,
			order_status: "Shipped",
		},
		{
			id: "ORD-33071-H",
			customer: "Alex Smith",
			date: "17/10/25 - 11:35",
			order_number: "PO-11283",
			product: "Phone Case",
			units: 27,
			price: 60.11,
			order_status: "Shipped",
		},
		{
			id: "ORD-66062-F",
			customer: "Sophia Anderson",
			date: "24/03/25 - 15:35",
			order_number: "PO-8546",
			product: "Coffee Mug Warmer",
			units: 6,
			price: 29.08,
			order_status: "Processing",
		},
		{
			id: "ORD-93453-G",
			customer: "Ava Lopez",
			date: "29/05/25 - 10:20",
			order_number: "PO-12029",
			product: "Portable Charger",
			units: 12,
			price: 201.20,
			order_status: "Cancelled",
		},
		{
			id: "ORD-75748-F",
			customer: "Elijah Williams",
			date: "29/04/25 - 10:25",
			order_number: "PO-5375",
			product: "Phone Case",
			units: 23,
			price: 862.65,
			order_status: "Cancelled",
		},
		{
			id: "ORD-60082-C",
			customer: "Ava Smith",
			date: "08/02/25 - 22:40",
			order_number: "PO-14393",
			product: "Sunglasses Polarized",
			units: 16,
			price: 560.41,
			order_status: "Delivered",
		},
		{
			id: "ORD-74604-C",
			customer: "Ava Hernandez",
			date: "18/01/25 - 21:45",
			order_number: "PO-14480",
			product: "Yoga Mat",
			units: 30,
			price: 883.72,
			order_status: "Delivered",
		},
		{
			id: "ORD-37307-C",
			customer: "Alex Hernandez",
			date: "12/10/25 - 15:30",
			order_number: "PO-9518",
			product: "Phone Case",
			units: 4,
			price: 82.79,
			order_status: "Delivered",
		},
		{
			id: "ORD-70976-H",
			customer: "Liam Martin",
			date: "28/02/25 - 13:45",
			order_number: "PO-10965",
			product: "USB-C Hub",
			units: 28,
			price: 64.11,
			order_status: "Delivered",
		},
	];
}


export default async function DashboardContent() {
	const data = await getData();

	return (
		<div>
			<DashboardHeader />
			<section className="mt-10 py-12 max-w-7xl border-t border-t-gray-300">
				<div className="flex items-center">
					<div className="flex-1">
						<div>
							<p className="text-xl font-bold">Good Morning, John</p>
							<p className="text-gray-400 mt-1 italic">Here's your store progress for today</p>
						</div>
					</div>

					<div className="flex gap-x-8">
						<Select>
							<SelectTrigger className="w-45">
								<SelectValue placeholder="Choose Frequency" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value="GHC">Daily</SelectItem>
									<SelectItem value="USD">Monthly</SelectItem>
									<SelectItem value="GBP">Quarterly</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>

						<Select>
							<SelectTrigger className="w-45">
								<SelectValue placeholder="From" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value="GHC">January</SelectItem>
									<SelectItem value="USD">February</SelectItem>
									<SelectItem value="GBP">March</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>

						<Select>
							<SelectTrigger className="w-45">
								<SelectValue placeholder="To" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value="GHC">January</SelectItem>
									<SelectItem value="USD">February</SelectItem>
									<SelectItem value="GBP">March</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>

						<button className="bg-white hover:bg-gray-200 text-[#6A1B9A] border border-[#6A1B9A] py-3 px-6 rounded-sm cursor-pointer flex-1">
							<span className='text-[13px]'>Apply Filter</span>
						</button>
					</div>
				</div>
			</section>

			<section className="mb-10 pb-15 max-w-7xl border-b border-b-gray-300">
				<div className="flex gap-x-12">
					<div className="border border-gray-300 p-7 flex-1 rounded-md">
						<div className="flex item-center gap-x-2">
							<HugeiconsIcon icon={ShoppingCart02Icon} size={24} strokeWidth={1.5} className="text-gray-500" />
							<p className="text-xl text-gray-500">Total Sales</p>
						</div>
						<p className="font-bold text-3xl mt-2">$12,768</p>
					</div>
					<div className="border border-gray-300 p-7 flex-1 rounded-md">
						<div className="flex item-center gap-x-2">
							<HugeiconsIcon icon={ShoppingCart02Icon} size={24} strokeWidth={1.5} className="text-gray-500" />
							<p className="text-xl text-gray-500">Total Orders</p>
						</div>
						<p className="font-bold text-3xl mt-2">1,768</p>
					</div>
					<div className="border border-gray-300 p-7 flex-1 rounded-md">
						<div className="flex item-center gap-x-2">
							<HugeiconsIcon icon={ShoppingCart02Icon} size={24} strokeWidth={1.5} className="text-gray-500" />
							<p className="text-xl text-gray-500">Total Products</p>
						</div>
						<p className="font-bold text-3xl mt-2">268</p>
					</div>
					<div className="border border-gray-300 p-7 flex-1 rounded-md">
						<div className="flex item-center gap-x-2">
							<HugeiconsIcon icon={ShoppingCart02Icon} size={24} strokeWidth={1.5} className="text-gray-500" />
							<p className="text-xl text-gray-500">Total Reviews</p>
						</div>
						<p className="font-bold text-3xl mt-2">120</p>
					</div>
				</div>
			</section>

			<section className="mt-20">
				<h2 className="font-bold text-xl">Order History</h2>
				<div className="max-w-7xl py-10">
					<DataTable columns={columns} data={data} />
				</div>
			</section>
		</div>
	);
}