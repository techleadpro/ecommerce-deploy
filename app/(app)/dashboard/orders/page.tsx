'use client'
import { useState } from "react";

import DashboardHeader from "@/app/components/DashboardHeader";

const STATUS_STEPS = ["Product ordered", "Order picked up by courier", "Order shipped", "Order delivered"];
const STATUS_DATES = ["Wed Jan 07, 2026 - 09:45", "Wed Jan 07, 2026 - 09:45", "Wed Jan 07, 2026 - 09:45", "Wed Jan 07, 2026 - 09:45"];

const STATUS_MAP = {
	Processing: 1,
	Cancelled: 2,
	Shipped: 3,
	Delivered: 4,
};

const STATUS_COLORS = {
	Processing: "text-amber-400",
	Cancelled: "text-red-400",
	Shipped: "text-green-600",
	Delivered: "text-violet-500",
};

const MOCK_ORDERS = [
	{ id: "PLD64773", status: "Processing", orderDate: "12/01/2026 - 09:34", estDelivery: "12/01/2026 - 09:34" },
	{ id: "PLD64774", status: "Cancelled", orderDate: "12/01/2026 - 10:00", estDelivery: "12/05/2026 - 10:00" },
	{ id: "PLD64775", status: "Shipped", orderDate: "12/01/2026 - 11:00", estDelivery: "12/06/2026 - 11:00" },
	{ id: "PLD64776", status: "Delivered", orderDate: "11/28/2026 - 08:00", estDelivery: "12/01/2026 - 08:00" },
];

function StatCard({ label, value }) {
	return (
		<div className="flex-1 border border-gray-200 rounded-md p-4">
			<p className="text-[13px] text-gray-500 mb-2">{label}</p>
			<p className="text-[22px] font-bold">{value}</p>
		</div>
	);
}

function DeliveryTracker({ status }) {
	const completed = STATUS_MAP[status] ?? 0;
	return (
		<div className="mt-4">
			<div className="flex items-center w-full">
				{STATUS_STEPS.map((_, i) => (
					<div key={i} className="flex items-center flex-1 last:flex-none">
						<div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${i < completed ? "bg-green-700" : "bg-gray-300"}`}>
							{i < completed && (
								<svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
									<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
								</svg>
							)}
						</div>
						{i < STATUS_STEPS.length - 1 && (
							<div className={`h-px flex-1 ${i < completed - 1 ? "bg-green-700" : "bg-gray-300"}`} />
						)}
					</div>
				))}
			</div>
			<div className="flex mt-2">
				{STATUS_STEPS.map((step, i) => (
					<div key={i} className="flex-1 pr-2">
						<p className="text-[13px] font-medium">{step}</p>
						{i < completed && <p className="text-[12px] text-gray-400">{STATUS_DATES[i]}</p>}
					</div>
				))}
			</div>
		</div>
	);
}

function OrderDetailView({ order, onBack }) {
	return (
		<div className="px-6 py-8">
			<button onClick={onBack} className="flex items-center gap-1 text-[15px] font-bold mb-6">
				<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
					<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
				</svg>
				Order Details
			</button>

			{/* Order Summary */}
			<div className="border border-gray-200 rounded-lg p-6 flex justify-between items-start mb-5">
				<div>
					<div className="flex items-center gap-3 mb-3">
						<h2 className="text-[20px] font-semibold">Order No: {order.id}</h2>
						<span className={`text-[14px] font-medium ${STATUS_COLORS[order.status]}`}>{order.status}</span>
					</div>
					<p className="text-[13px] text-gray-500">Order date &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span className="text-black">{order.orderDate}</span></p>
					<p className="text-[13px] text-gray-500 mt-1">Estimated delivery date &nbsp; <span className="text-black">{order.estDelivery}</span></p>
				</div>
				<button className="bg-purple-700 hover:bg-purple-800 text-white text-[14px] px-5 py-3 rounded-md transition-colors">
					Print Waybill
				</button>
			</div>

			{/* Send out product */}
			<div className="border border-gray-200 rounded-lg p-6 flex justify-between items-center mb-5">
				<div>
					<h3 className="text-[16px] font-bold mb-1">Send out product</h3>
					<p className="text-[13px] text-gray-500">Kindly call our courier partner in your city to send out this order to the customer</p>
				</div>
				<button className="border border-purple-700 text-purple-700 hover:bg-purple-50 text-[14px] px-5 py-3 rounded-md transition-colors whitespace-nowrap ml-6">
					Find Courier Partner
				</button>
			</div>

			{/* Order Details + Delivery Status */}
			<div className="border border-gray-200 rounded-lg p-6">
				<h3 className="text-[16px] font-bold mb-4">Order Details</h3>
				<div className="flex items-start justify-between mb-6">
					<div className="flex items-center gap-4">
						<div className="w-16 h-16 bg-amber-50 rounded-md overflow-hidden flex items-center justify-center">
							<span className="text-3xl">🧺</span>
						</div>
						<div>
							<p className="text-[14px]"><span className="font-semibold">Woven Basket</span> - 2 units</p>
							<p className="text-[13px] text-gray-400">Category</p>
							<p className="text-[13px] text-gray-400">Sub-category</p>
						</div>
					</div>
					<div className="text-right">
						<p className="text-[13px] text-gray-400">Name of customer</p>
						<p className="text-[20px] font-semibold">GHC 230</p>
					</div>
				</div>

				<div>
					<div className="flex items-center gap-3 mb-4">
						<h3 className="text-[16px] font-bold">Delivery Status</h3>
						<span className={`text-[14px] font-medium ${STATUS_COLORS[order.status]}`}>{order.status}</span>
					</div>
					<DeliveryTracker status={order.status} />
				</div>
			</div>
		</div>
	);
}

export default function OrdersPage() {
	const [selectedOrder, setSelectedOrder] = useState(null);

	if (selectedOrder) {
		return <OrderDetailView order={selectedOrder} onBack={() => setSelectedOrder(null)} />;
	}

	const stats = {
		total: MOCK_ORDERS.length,
		processed: MOCK_ORDERS.filter(o => o.status === "Processing" || o.status === "Picked").length,
		shipped: MOCK_ORDERS.filter(o => o.status === "Shipped").length,
		delivered: MOCK_ORDERS.filter(o => o.status === "Delivered").length,
	};

	return (
		<div>
			<DashboardHeader />

			<section className="mt-10 py-12 max-w-7xl border-t border-t-gray-300">
				<h1 className="text-[22px] font-bold mb-6">My Orders</h1>
				<div className="mt-14">
					{/* Stat Cards */}
					<div className="flex gap-4 mb-8">
						<StatCard label="Total Orders" value={stats.total} />
						<StatCard label="Processed Orders" value={stats.processed} />
						<StatCard label="Shipped Orders" value={stats.shipped} />
						<StatCard label="Delivered Orders" value={stats.delivered} />
					</div>

					{/* Filters */}
					<div className="flex gap-4 mb-6">
						{["Choose Order Status", "To", "From"].map((ph) => (
							<div key={ph} className="flex-1 relative">
								<select className="w-full appearance-none text-[13px] text-gray-400 p-3 outline outline-1 outline-gray-300 rounded-sm bg-white pr-8">
									<option>{ph}</option>
								</select>
								<svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
								</svg>
							</div>
						))}
						<button className="border border-purple-700 text-purple-700 hover:bg-purple-50 text-[14px] px-6 py-2 rounded-md transition-colors whitespace-nowrap">
							Apply Filter
						</button>
					</div>

					{/* Order History */}
					<div className="border border-gray-200 rounded-lg p-6">
						<h2 className="text-[16px] font-bold mb-4">Order History</h2>

						{MOCK_ORDERS.length === 0 ? (
							<div className="flex flex-col items-center justify-center py-16 text-center">
								<p className="text-[16px] text-gray-400 mb-5">You currently have no orders yet, upload your first<br />product and make sales</p>
								<button className="bg-purple-700 hover:bg-purple-800 text-white text-[14px] px-6 py-3 rounded-md transition-colors">
									Upload Product
								</button>
							</div>
						) : (
							<table className="w-full text-[13px]">
								<thead>
									<tr className="border-b border-gray-200 text-gray-400">
										<th className="text-left pb-3 font-medium">Order No</th>
										<th className="text-left pb-3 font-medium">Order Date</th>
										<th className="text-left pb-3 font-medium">Est. Delivery</th>
										<th className="text-left pb-3 font-medium">Status</th>
										<th className="text-left pb-3 font-medium"></th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-100">
									{MOCK_ORDERS.map((order) => (
										<tr key={order.id} className="py-3">
											<td className="py-4 font-medium">{order.id}</td>
											<td className="py-4 text-gray-500">{order.orderDate}</td>
											<td className="py-4 text-gray-500">{order.estDelivery}</td>
											<td className="py-4">
												<span className={`font-medium ${STATUS_COLORS[order.status]}`}>{order.status}</span>
											</td>
											<td className="py-4">
												<button
													onClick={() => setSelectedOrder(order)}
													className="text-purple-700 hover:underline text-[13px]"
												>
													View Details
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						)}
					</div>
				</div>
			</section>
		</div>
	);
}