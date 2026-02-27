"use client";

import { useState } from "react";
import DashboardHeader from "@/app/components/DashboardHeader";

// ---- Types ----
interface Shipment {
	id: number;
	shipmentId: string;
	dateTime: string;
	courierPartner: string;
	pickupLocation: string;
	deliveryLocation: string;
	status: "Processing" | "Shipped" | "Delivered";
	courierContact: string;
	orderId: string;
	weight: string;
	length: string;
	width: string;
	height: string;
}

// ---- Mock Data ----
const MOCK_SHIPMENTS: Shipment[] = [
	{ id: 1, shipmentId: "PLD73883", dateTime: "12/24/25 - 18:45", courierPartner: "DHL Group", pickupLocation: "Accra, Ghana", deliveryLocation: "Lagos, Nigeria", status: "Delivered", courierContact: "+233-8728-9827-873, +233-8272-972-983", orderId: "PLD827272", weight: "0.5 Kg", length: "23 cm", width: "12 cm", height: "10 cm" },
	{ id: 2, shipmentId: "PLD73884", dateTime: "12/24/25 - 18:45", courierPartner: "DHL Group", pickupLocation: "Accra, Ghana", deliveryLocation: "Lagos, Nigeria", status: "Delivered", courierContact: "+233-8728-9827-873, +233-8272-972-983", orderId: "PLD827273", weight: "1.2 Kg", length: "30 cm", width: "15 cm", height: "12 cm" },
	{ id: 3, shipmentId: "PLD73885", dateTime: "12/24/25 - 18:45", courierPartner: "DHL Group", pickupLocation: "Accra, Ghana", deliveryLocation: "Lagos, Nigeria", status: "Processing", courierContact: "+233-8728-9827-873, +233-8272-972-983", orderId: "PLD827274", weight: "0.8 Kg", length: "20 cm", width: "10 cm", height: "8 cm" },
	{ id: 4, shipmentId: "PLD73886", dateTime: "12/24/25 - 18:45", courierPartner: "DHL Group", pickupLocation: "Accra, Ghana", deliveryLocation: "Lagos, Nigeria", status: "Delivered", courierContact: "+233-8728-9827-873, +233-8272-972-983", orderId: "PLD827275", weight: "2.0 Kg", length: "40 cm", width: "20 cm", height: "15 cm" },
	{ id: 5, shipmentId: "PLD73887", dateTime: "12/24/25 - 18:45", courierPartner: "DHL Group", pickupLocation: "Accra, Ghana", deliveryLocation: "Lagos, Nigeria", status: "Shipped", courierContact: "+233-8728-9827-873, +233-8272-972-983", orderId: "PLD827276", weight: "0.3 Kg", length: "15 cm", width: "8 cm", height: "5 cm" },
];

const ITEMS_PER_PAGE = 5;

const STATUS_COLORS: Record<string, string> = {
	Processing: "text-amber-400",
	Cancelled: "text-red-400",
	Shipped: "text-green-600",
	Delivered: "text-violet-500",
};

// ---- Delivery Steps ----
const SHIPMENT_STEPS = [
	"Shipment picked up by courier",
	"Shipment processed and shipped",
	"Shipment delivered",
];

const STEP_DATES = [
	"Wed Jan 07, 2026 - 09:45",
	"Wed Jan 07, 2026 - 09:45",
	"Wed Jan 07, 2026 - 09:45",
];

const STATUS_STEP_MAP: Record<string, number> = {
	Processing: 1,
	Shipped: 2,
	Delivered: 3,
};

// ---- Sub-components ----
function StatCard({ label, value }: { label: string; value: number }) {
	return (
		<div className="flex-1 border border-gray-200 rounded-md p-4">
			<p className="text-[13px] text-gray-500 mb-2">{label}</p>
			<p className="text-[22px] font-bold">{value}</p>
		</div>
	);
}

function Pagination({ current, total, onChange }: { current: number; total: number; onChange: (p: number) => void }) {
	return (
		<div className="flex items-center justify-center gap-2 mt-6">
			<button
				onClick={() => onChange(Math.max(1, current - 1))}
				className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-gray-500 hover:border-purple-700 hover:text-purple-700 transition-colors"
			>
				‹
			</button>
			{Array.from({ length: total }, (_, i) => i + 1).map(p => (
				<button
					key={p}
					onClick={() => onChange(p)}
					className={`w-8 h-8 flex items-center justify-center rounded text-[14px] transition-colors ${p === current ? "bg-purple-700 text-white" : "border border-gray-300 text-gray-500 hover:border-purple-700 hover:text-purple-700"}`}
				>
					{p}
				</button>
			))}
			<button
				onClick={() => onChange(Math.min(total, current + 1))}
				className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-gray-500 hover:border-purple-700 hover:text-purple-700 transition-colors"
			>
				›
			</button>
		</div>
	);
}

function InfoField({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex flex-col">
			<label className="text-[12px] text-gray-400 mb-1">{label}</label>
			<div className="border border-gray-200 rounded-sm px-3 py-2 text-[13px] text-gray-700 bg-white">
				{value}
			</div>
		</div>
	);
}

function DeliveryTracker({ status }: { status: string }) {
	const completed = STATUS_STEP_MAP[status] ?? 0;
	return (
		<div className="mt-4">
			<div className="flex items-center w-full">
				{SHIPMENT_STEPS.map((_, i) => (
					<div key={i} className="flex items-center flex-1 last:flex-none">
						<div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${i < completed ? "bg-green-700" : "bg-gray-300"}`}>
							{i < completed && (
								<svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
									<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
								</svg>
							)}
						</div>
						{i < SHIPMENT_STEPS.length - 1 && (
							<div className={`h-px flex-1 ${i < completed - 1 ? "bg-green-700" : "bg-gray-300"}`} />
						)}
					</div>
				))}
			</div>
			<div className="flex mt-2">
				{SHIPMENT_STEPS.map((step, i) => (
					<div key={i} className="flex-1 pr-2">
						<p className="text-[13px] font-medium">{step}</p>
						{i < completed && <p className="text-[12px] text-gray-400">{STEP_DATES[i]}</p>}
					</div>
				))}
			</div>
		</div>
	);
}

function ShipmentDetailView({ shipment, onBack }: { shipment: Shipment; onBack: () => void }) {
	return (
		<div className="max-w-7xl mx-auto">
			<button onClick={onBack} className="flex items-center gap-1 text-[15px] font-bold mb-6">
				<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
					<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
				</svg>
				Shipment Details
			</button>

			{/* Header Card */}
			<div className="border border-gray-200 rounded-lg p-6 flex justify-between items-start mb-5">
				<div>
					<div className="flex items-center gap-3 mb-3">
						<h2 className="text-[20px] font-semibold">Shipment ID: {shipment.shipmentId}</h2>
						<span className={`text-[14px] font-medium ${STATUS_COLORS[shipment.status]}`}>{shipment.status}</span>
					</div>
					<p className="text-[13px] text-gray-500">
						Pickup Location &nbsp;&nbsp;&nbsp;&nbsp; <span className="text-black">26, George Street Accra Ghana</span>
					</p>
					<p className="text-[13px] text-gray-500 mt-1">
						Delivery Location &nbsp;&nbsp; <span className="text-black">18 John Street. Yaba Lagos, Nigeria</span>
					</p>
				</div>
				<button className="border border-purple-700 text-purple-700 hover:bg-purple-50 text-[14px] px-5 py-3 rounded-md transition-colors whitespace-nowrap">
					View Order
				</button>
			</div>

			{/* Shipment Details Card */}
			<div className="border border-gray-200 rounded-lg p-6 mb-5">
				<h3 className="text-[16px] font-bold mb-5">Shipment Details</h3>
				<div className="grid grid-cols-2 gap-4">
					<InfoField label="Courier Partner Contact" value={shipment.courierContact} />
					<InfoField label="Order ID" value={shipment.orderId} />
					<InfoField label="Shipment Weight" value={shipment.weight} />
					<InfoField label="Shipment Length" value={shipment.length} />
					<InfoField label="Shipment Width" value={shipment.width} />
					<InfoField label="Shipment Height" value={shipment.height} />
				</div>

				<div className="mt-6">
					<div className="flex items-center gap-3 mb-4">
						<h3 className="text-[16px] font-bold">Delivery Status</h3>
						<span className={`text-[14px] font-medium ${STATUS_COLORS[shipment.status]}`}>{shipment.status}</span>
					</div>
					<DeliveryTracker status={shipment.status} />
				</div>
			</div>
		</div>
	);
}

// ---- Main Page ----
export default function MyShipmentsPage() {
	const [selected, setSelected] = useState<Shipment | null>(null);
	const [page, setPage] = useState<number>(1);

	const shipments = MOCK_SHIPMENTS;
	const totalPages = Math.ceil(shipments.length / ITEMS_PER_PAGE);
	const paginated = shipments.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

	const stats = {
		all: shipments.length,
		processed: shipments.filter(s => s.status === "Processing" || s.status === "Shipped").length,
		delivered: shipments.filter(s => s.status === "Delivered").length,
	};

	return (
		<div>
			<DashboardHeader />

			<section className="mt-10 py-12 max-w-7xl border-t border-t-gray-300">
				<h1 className="text-[22px] font-bold mb-6">My Shipments</h1>
				<div className="mt-14">

					{selected ? (
						<ShipmentDetailView shipment={selected} onBack={() => setSelected(null)} />
					) : (
						<>
							{/* Stat Cards */}
							<div className="flex gap-4 mb-8">
								<StatCard label="All Shipments" value={stats.all} />
								<StatCard label="Processed Shipments" value={stats.processed} />
								<StatCard label="Delivered Shipments" value={stats.delivered} />
							</div>

							{/* Filters */}
							<div className="flex gap-4 mb-6">
								{["Choose status", "From", "To"].map(ph => (
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

							{/* Empty State */}
							{shipments.length === 0 ? (
								<div className="flex flex-col items-center justify-center py-24 text-center">
									<p className="text-[16px] text-gray-400 mb-6">
										You currently have no shipments yet, upload your first<br />product and make sales to get your first shipment
									</p>
									<button className="bg-purple-700 hover:bg-purple-800 text-white text-[14px] px-6 py-3 rounded-md transition-colors">
										Upload Product
									</button>
								</div>
							) : (
								<>
									{/* Table */}
									<table className="w-full text-[13px]">
										<thead>
											<tr className="border-b border-gray-200 text-gray-400">
												<th className="text-left pb-3 font-medium">Shipment ID</th>
												<th className="text-left pb-3 font-medium">Date/Time</th>
												<th className="text-left pb-3 font-medium">Courier Partner</th>
												<th className="text-left pb-3 font-medium">Pickup Location</th>
												<th className="text-left pb-3 font-medium">Delivery Location</th>
												<th className="text-left pb-3 font-medium">Shipment Status</th>
												<th className="pb-3" />
											</tr>
										</thead>
										<tbody className="divide-y divide-gray-100">
											{paginated.map(s => (
												<tr key={s.id}>
													<td className="py-4">{s.shipmentId}</td>
													<td className="py-4 text-gray-500">{s.dateTime}</td>
													<td className="py-4 text-gray-500">{s.courierPartner}</td>
													<td className="py-4 text-gray-500">{s.pickupLocation}</td>
													<td className="py-4 text-gray-500">{s.deliveryLocation}</td>
													<td className="py-4">
														<span className={`font-medium ${STATUS_COLORS[s.status]}`}>{s.status}</span>
													</td>
													<td className="py-4">
														<button
															onClick={() => setSelected(s)}
															className="text-purple-700 font-semibold hover:underline text-[13px]"
														>
															View
														</button>
													</td>
												</tr>
											))}
										</tbody>
									</table>

									{totalPages > 1 && (
										<Pagination current={page} total={totalPages} onChange={setPage} />
									)}
								</>
							)}
						</>
					)}

				</div>
			</section>
		</div>
	);
}