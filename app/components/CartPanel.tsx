"use client";

import { useState } from "react";

interface CartItem {
	id: number;
	name: string;
	category: string;
	price: number;
	quantity: number;
	emoji: string;
}

const MOCK_CART_ITEMS: CartItem[] = [
	{ id: 1, name: "Name of product", category: "Category", price: 230, quantity: 2, emoji: "🍶" },
	{ id: 2, name: "Name of product", category: "Category", price: 230, quantity: 2, emoji: "🍶" },
	{ id: 3, name: "Name of product", category: "Category", price: 230, quantity: 2, emoji: "🍶" },
];


function CloseButton({ onClose }: { onClose: () => void }) {
	return (
		<button
			onClick={onClose}
			className="w-8 h-8 flex items-center justify-center border border-purple-700 rounded-md text-purple-700 hover:bg-purple-50 transition-colors shrink-0"
		>
			<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
				<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>
	);
}

function Backdrop({ onClose }: { onClose: () => void }) {
	return <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />;
}

function Panel({ children }: { children: React.ReactNode }) {
	return (
		<div className="fixed top-0 right-0 h-full w-120 bg-white z-50 shadow-xl flex flex-col">
			{children}
		</div>
	);
}

function PanelHeader({ title, onClose }: { title: string; onClose: () => void }) {
	return (
		<div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
			<h2 className="text-[18px] font-bold">{title}</h2>
			<CloseButton onClose={onClose} />
		</div>
	);
}

function EmptyState({ message, onGoToMarketplace }: { message: string; onGoToMarketplace?: () => void }) {
	return (
		<div className="flex-1 flex flex-col items-center justify-center gap-8 px-8">
			<p className="text-[15px] text-gray-400 text-center">{message}</p>
			<button
				onClick={onGoToMarketplace}
				className="bg-purple-700 hover:bg-purple-800 text-white text-[14px] px-8 py-3 rounded-md transition-colors"
			>
				Go to Marketplace
			</button>
		</div>
	);
}

function Pagination({ current, total, onChange }: { current: number; total: number; onChange: (p: number) => void }) {
	return (
		<div className="flex items-center justify-center gap-2 py-4">
			<button onClick={() => onChange(Math.max(1, current - 1))} className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-gray-500 hover:border-purple-700 hover:text-purple-700 transition-colors">‹</button>
			{Array.from({ length: total }, (_, i) => i + 1).map(p => (
				<button key={p} onClick={() => onChange(p)} className={`w-8 h-8 flex items-center justify-center rounded text-[14px] transition-colors ${p === current ? "bg-purple-700 text-white" : "border border-gray-300 text-gray-500 hover:border-purple-700 hover:text-purple-700"}`}>{p}</button>
			))}
			<button onClick={() => onChange(Math.min(total, current + 1))} className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-gray-500 hover:border-purple-700 hover:text-purple-700 transition-colors">›</button>
		</div>
	);
}

export function CartPanel({ onClose }: { onClose: () => void }) {
	const [items, setItems] = useState<CartItem[]>(MOCK_CART_ITEMS);
	const [promoOpen, setPromoOpen] = useState(false);
	const [promo, setPromo] = useState("");

	const updateQty = (id: number, delta: number) => {
		setItems(prev =>
			prev.map(item =>
				item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
			)
		);
	};

	const removeItem = (id: number) => setItems(prev => prev.filter(i => i.id !== id));

	const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
	const delivery = 230;
	const discount = 230;
	const total = subtotal + delivery - discount;

	return (
		<>
			<Backdrop onClose={onClose} />
			<Panel>
				<PanelHeader title="My Cart" onClose={onClose} />

				{items.length === 0 ? (
					<EmptyState message="You currently have no products added." />
				) : (
					<div className="flex-1 overflow-y-auto flex flex-col">
						{/* Items */}
						<div className="px-6 py-4 divide-y divide-gray-100 flex-1">
							{items.map(item => (
								<div key={item.id} className="py-4 flex items-center gap-4">
									{/* Image */}
									<div className="w-20 h-20 bg-gray-100 rounded-md flex items-center justify-center text-4xl flex-shrink-0">
										{item.emoji}
									</div>

									{/* Info */}
									<div className="flex-1 min-w-0">
										<p className="text-[14px] font-semibold">{item.name}</p>
										<p className="text-[13px] text-gray-400 mb-2">{item.category}</p>
										<div className="flex items-center gap-3">
											{/* Wishlist */}
											<button className="text-gray-400 hover:text-red-400 transition-colors">
												<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
													<path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
												</svg>
											</button>
											{/* Delete */}
											<button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
												<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
													<path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
												</svg>
											</button>
										</div>
									</div>

									{/* Price + Qty */}
									<div className="flex flex-col items-end gap-2 flex-shrink-0">
										<span className="text-[15px] font-semibold">{item.price}GHC</span>
										<div className="flex items-center gap-2">
											<button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-purple-700 transition-colors">
												<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg>
											</button>
											<span className="text-[14px] w-4 text-center">{item.quantity}</span>
											<button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-purple-700 transition-colors">
												<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
											</button>
										</div>
									</div>
								</div>
							))}
						</div>

						{/* Order Summary */}
						<div className="px-6 pb-6 border-t border-gray-100 pt-4">
							<h3 className="text-[15px] font-bold mb-4">Order Summary</h3>
							<div className="space-y-2 mb-3">
								{[
									{ label: "Subtotal", value: `${subtotal}GHC` },
									{ label: "Delivery", value: `${delivery}GHC` },
									{ label: "Discount", value: `${discount}GHC` },
								].map(row => (
									<div key={row.label} className="flex justify-between text-[13px] text-gray-500">
										<span>{row.label}</span>
										<span>{row.value}</span>
									</div>
								))}
							</div>
							<div className="flex justify-between text-[15px] font-semibold border-t border-gray-200 pt-3 mb-4">
								<span>Total</span>
								<span>{total}GHC</span>
							</div>

							{/* Promo */}
							{promoOpen ? (
								<div className="mb-4">
									<label className="text-[12px] text-gray-400 mb-1 block">Enter promo code</label>
									<input
										type="text"
										value={promo}
										onChange={e => setPromo(e.target.value)}
										placeholder="Eg: PLD2353"
										className="w-full text-[13px] p-3 outline outline-1 outline-gray-300 rounded-sm mb-2"
									/>
									<button className="text-[13px] text-purple-700 font-medium hover:underline">Apply promo code</button>
								</div>
							) : (
								<button
									onClick={() => setPromoOpen(true)}
									className="text-[13px] text-purple-700 font-medium hover:underline mb-4 block"
								>
									Use promo code
								</button>
							)}

							<button className="w-full bg-purple-700 hover:bg-purple-800 text-white text-[14px] py-3 rounded-md transition-colors">
								Proceed to Checkout
							</button>
						</div>
					</div>
				)}
			</Panel>
		</>
	);
}