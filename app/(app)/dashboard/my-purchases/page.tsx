'use client'

import { useState } from "react";
import DashboardHeader from "@/app/components/DashboardHeader";

const STATUS_COLORS: Record<Purchase["status"], string> = {
	Processing: "text-amber-400",
	Cancelled: "text-red-400",
	Shipped: "text-green-600",
	Delivered: "text-violet-500",
};

interface Purchase {
	id: number;
	orderNo: string;
	name: string;
	status: string;
	orderedOn: string;
	productCost: number;
	deliveryCost: number;
	quantity: string;
	paymentMethod: string;
	orderDate: string;
	deliveryMethod: string;
	deliveryFee: string;
	courierContact: string;
	estDelivery: string;
	shippingInfo: string;
}

const MOCK_PURCHASES: Purchase[] = [
	{ id: 1, orderNo: "PLD44892", name: "Woven Basket", status: "Delivered", orderedOn: "12/01/2026 - 08:43", productCost: 200, deliveryCost: 20, quantity: "1 unit", paymentMethod: "Bank Transfer", orderDate: "12/01/2026 - 09:23", deliveryMethod: "Door step delivery", deliveryFee: "230GHC", courierContact: "+233-982-982-0833", estDelivery: "12/01/2026", shippingInfo: "John Williams\nNo 2A Wilson Road opposite AP industry first gate, Accra.\nAccra, Ghana." },
	{ id: 2, orderNo: "PLD44893", name: "Smartwatch", status: "Delivered", orderedOn: "12/01/2026 - 08:43", productCost: 450, deliveryCost: 30, quantity: "1 unit", paymentMethod: "Mobile Money", orderDate: "12/01/2026 - 08:43", deliveryMethod: "Door step delivery", deliveryFee: "30GHC", courierContact: "+233-982-982-0844", estDelivery: "12/05/2026", shippingInfo: "John Williams\nNo 2A Wilson Road opposite AP industry first gate, Accra.\nAccra, Ghana." },
	{ id: 3, orderNo: "PLD44894", name: "Headphones", status: "Delivered", orderedOn: "12/01/2026 - 08:43", productCost: 180, deliveryCost: 15, quantity: "2 units", paymentMethod: "Bank Transfer", orderDate: "12/01/2026 - 08:43", deliveryMethod: "Door step delivery", deliveryFee: "15GHC", courierContact: "+233-982-982-0855", estDelivery: "12/03/2026", shippingInfo: "John Williams\nNo 2A Wilson Road opposite AP industry first gate, Accra.\nAccra, Ghana." },
	{ id: 4, orderNo: "PLD44895", name: "Smartwatch Pro", status: "Processing", orderedOn: "12/01/2026 - 08:43", productCost: 600, deliveryCost: 40, quantity: "1 unit", paymentMethod: "Card", orderDate: "12/01/2026 - 08:43", deliveryMethod: "Door step delivery", deliveryFee: "40GHC", courierContact: "+233-982-982-0866", estDelivery: "12/10/2026", shippingInfo: "John Williams\nNo 2A Wilson Road opposite AP industry first gate, Accra.\nAccra, Ghana." },
	{ id: 5, orderNo: "PLD44896", name: "Leather Bag", status: "Delivered", orderedOn: "12/01/2026 - 08:43", productCost: 320, deliveryCost: 25, quantity: "1 unit", paymentMethod: "Mobile Money", orderDate: "12/01/2026 - 08:43", deliveryMethod: "Door step delivery", deliveryFee: "25GHC", courierContact: "+233-982-982-0877", estDelivery: "12/02/2026", shippingInfo: "John Williams\nNo 2A Wilson Road opposite AP industry first gate, Accra.\nAccra, Ghana." },
	{ id: 6, orderNo: "PLD44897", name: "Running Shoes", status: "Delivered", orderedOn: "12/01/2026 - 08:43", productCost: 210, deliveryCost: 20, quantity: "1 unit", paymentMethod: "Bank Transfer", orderDate: "12/01/2026 - 08:43", deliveryMethod: "Door step delivery", deliveryFee: "20GHC", courierContact: "+233-982-982-0888", estDelivery: "12/04/2026", shippingInfo: "John Williams\nNo 2A Wilson Road opposite AP industry first gate, Accra.\nAccra, Ghana." },
];

const ITEMS_PER_PAGE = 6;

function CopyIcon() {
	return (
		<svg className="w-4 h-4 text-gray-400 cursor-pointer hover:text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
			<rect x="9" y="9" width="13" height="13" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
			<path strokeLinecap="round" strokeLinejoin="round" d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
		</svg>
	);
}

function InfoField({ label, value, copyable, wide }: { label: string; value: string; copyable: boolean; wide: boolean; }) {
	return (
		<div className={`flex flex-col ${wide ? "col-span-2" : ""}`}>
			<label className="text-[12px] text-gray-400 mb-1">{label}</label>
			<div className="flex items-center justify-between border border-gray-200 rounded-sm px-3 py-2 text-[13px] text-gray-700 bg-white">
				<span className={wide ? "whitespace-pre-line" : ""}>{value}</span>
				{copyable && <CopyIcon />}
			</div>
		</div>
	);
}

function ProductImages({ count = 7 }) {
	return (
		<div className="flex gap-2 mt-4 flex-wrap">
			{Array.from({ length: count }).map((_, i) => (
				<div key={i} className="w-16 h-16 bg-yellow-400 rounded-lg flex items-center justify-center text-2xl">🎧</div>
			))}
		</div>
	);
}

function PurchaseDetailView({ purchase, onBack }: { purchase: Purchase; onBack: () => void; }) {
	const total = purchase.productCost + purchase.deliveryCost;
	return (
		<div className="max-w-7xl mx-auto px-6 py-8">
			<button onClick={onBack} className="flex items-center gap-1 text-[15px] font-bold mb-6">
				<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
					<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
				</svg>
				Purchase Details
			</button>

			{/* Cost Summary */}
			<div className="border border-gray-200 rounded-lg p-6 flex justify-between items-start mb-5">
				<div>
					<h2 className="text-[20px] font-semibold mb-3">Total Cost - {total}GHC</h2>
					<p className="text-[13px] text-gray-500">Product Cost &nbsp;&nbsp;&nbsp; <span className="text-black">{purchase.productCost}GHC</span></p>
					<p className="text-[13px] text-gray-500 mt-1">Delivery Cost &nbsp;&nbsp; <span className="text-black">{purchase.deliveryCost}GHC</span></p>
				</div>
				<button className="bg-purple-700 hover:bg-purple-800 text-white text-[14px] px-5 py-3 rounded-md transition-colors">
					Track Purchase
				</button>
			</div>

			{/* Order Details */}
			<div className="border border-gray-200 rounded-lg p-6 mb-5">
				<div className="flex items-center gap-3 mb-5">
					<h3 className="text-[16px] font-bold">Order Details</h3>
					<span className={`text-[14px] font-medium ${STATUS_COLORS[purchase.status]}`}>{purchase.status}</span>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<InfoField label="Product" value={purchase.name} copyable={false} wide={false} />
					<InfoField label="Amount" value={`${purchase.productCost}GHC`} copyable={false} wide={false} />
					<InfoField label="Order ID" value={purchase.orderNo} copyable wide={false} />
					<InfoField label="Quantity" value={purchase.quantity} copyable={false} wide={false} />
					<InfoField label="Order Date/Time" value={purchase.orderDate} copyable={false} wide={false} />
					<InfoField label="Payment Method" value={purchase.paymentMethod} copyable={false} wide={false} />
				</div>
				<ProductImages />
			</div>

			{/* Delivery Details */}
			<div className="border border-gray-200 rounded-lg p-6">
				<div className="flex items-center gap-3 mb-5">
					<h3 className="text-[16px] font-bold">Delivery Details</h3>
					<span className={`text-[14px] font-medium ${STATUS_COLORS[purchase.status]}`}>{purchase.status}</span>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<InfoField label="Delivery Method" value={purchase.deliveryMethod} copyable={false} wide={false} />
					<InfoField label="Delivery Fee" value={purchase.deliveryFee} copyable={false} wide={false} />
					<InfoField label="Courier Contact Info" value={purchase.courierContact} copyable wide={false} />
					<InfoField label="Estimated Delivery Date" value={purchase.estDelivery} copyable={false} wide={false} />
					<InfoField label="Shipping Information" value={purchase.shippingInfo} wide copyable={false} />
				</div>
			</div>
		</div>
	);
}

function PurchaseCard({ purchase, onView }: { purchase: Purchase; onView: React.Dispatch<React.SetStateAction<Purchase | null>>; }) {
	return (
		<div className="border border-gray-200 rounded-lg p-4 flex gap-4">
			<div className="w-24 h-24 bg-gray-100 rounded-md shrink-0 flex items-center justify-center text-3xl">⌚</div>
			<div className="flex-1">
				<div className="flex items-center gap-2 mb-1">
					<span className="text-[15px] font-semibold">{purchase.name}</span>
					<span className={`text-[13px] font-medium ${STATUS_COLORS[purchase.status]}`}>{purchase.status}</span>
				</div>
				<p className="text-[13px] text-gray-400">Order No</p>
				<p className="text-[13px] text-gray-400">Ordered on {purchase.orderedOn}</p>
				<div className="text-right mt-1">
					<button onClick={() => onView(purchase)} className="text-purple-700 hover:underline text-[13px]">
						View Details
					</button>
				</div>
			</div>
		</div>
	);
}

function Pagination({ current, total, onChange }: { current: number; total: number; onChange: (p: number) => void; }) {
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

export default function MyPurchasesPage() {
	const [selected, setSelected] = useState<Purchase | null>(null);
	const [page, setPage] = useState<number>(1);
	const purchases = MOCK_PURCHASES; // toggle to [] to see empty state
	const totalPages = Math.ceil(purchases.length / ITEMS_PER_PAGE);
	const paginated = purchases.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

	if (selected) {
		return (
			<div>
				<DashboardHeader />

				<section className="mt-10 py-12 max-w-7xl border-t border-t-gray-300">
					<h1 className="text-[22px] font-bold mb-6">My Purchases</h1>
					<div className="mt-14">
						<PurchaseDetailView purchase={selected} onBack={() => setSelected(null)} />
					</div>
				</section>
			</div>
		);
	}

	return (
		<div>
			<DashboardHeader />

			<section className="mt-10 py-12 max-w-7xl border-t border-t-gray-300">
				<h1 className="text-[22px] font-bold mb-6">My Purchases</h1>
				<div className="mt-14">
					{/* Filters */}
					<div className="flex gap-4 mb-6">
						{["Choose status", "From", "To"].map(ph => (
							<div key={ph} className="flex-1 relative">
								<select className="w-full appearance-none text-[13px] text-gray-400 p-3 outline-1 outline-gray-300 rounded-sm bg-white pr-8">
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
					{purchases.length === 0 ? (
						<div className="flex flex-col items-center justify-center py-24 text-center">
							<p className="text-[16px] text-gray-400 mb-6">You currently have no purchases made yet.</p>
							<button className="bg-purple-700 hover:bg-purple-800 text-white text-[14px] px-6 py-3 rounded-md transition-colors">
								Go to Marketplace
							</button>
						</div>
					) : (
						<>
							<div className="grid grid-cols-2 gap-4">
								{paginated.map(p => (
									<PurchaseCard key={p.id} purchase={p} onView={setSelected} />
								))}
							</div>
							{totalPages > 1 && <Pagination current={page} total={totalPages} onChange={setPage} />}
						</>
					)}
				</div>
			</section>
		</div>
	);
}