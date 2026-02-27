"use client";

import { useState } from "react";

interface WishlistItem {
	id: number;
	name: string;
	price: number;
	category: string;
	emoji: string;
}

const MOCK_WISHLIST: WishlistItem[] = [
	{ id: 1, name: "Name of product", price: 230, category: "Category of product", emoji: "⌚" },
	{ id: 2, name: "Name of product", price: 230, category: "Category of product", emoji: "⌚" },
	{ id: 3, name: "Name of product", price: 230, category: "Category of product", emoji: "⌚" },
	{ id: 4, name: "Name of product", price: 230, category: "Category of product", emoji: "⌚" },
	{ id: 5, name: "Name of product", price: 230, category: "Category of product", emoji: "⌚" },
	{ id: 6, name: "Name of product", price: 230, category: "Category of product", emoji: "⌚" },
	{ id: 7, name: "Name of product", price: 230, category: "Category of product", emoji: "⌚" },
	{ id: 8, name: "Name of product", price: 230, category: "Category of product", emoji: "⌚" },
];

const WISHLIST_PER_PAGE = 4;

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

export function WishlistPanel({ onClose }: { onClose: () => void }) {
	const [items, setItems] = useState<WishlistItem[]>(MOCK_WISHLIST);
	const [page, setPage] = useState<number>(1);

	const removeFromWishlist = (id: number) => setItems(prev => prev.filter(i => i.id !== id));

	const totalPages = Math.ceil(items.length / WISHLIST_PER_PAGE);
	const paginated = items.slice((page - 1) * WISHLIST_PER_PAGE, page * WISHLIST_PER_PAGE);

	return (
		<>
			<Backdrop onClose={onClose} />
			<Panel>
				<PanelHeader title="My Wishlist" onClose={onClose} />

				{items.length === 0 ? (
					<EmptyState message="You currently have no products added." />
				) : (
					<div className="flex-1 overflow-y-auto flex flex-col justify-between">
						<div className="px-6 py-4 divide-y divide-gray-100">
							{paginated.map(item => (
								<div key={item.id} className="py-4 flex items-center gap-4">
									{/* Image */}
									<div className="w-20 h-20 bg-gray-100 rounded-md flex items-center justify-center text-4xl shrink-0">
										{item.emoji}
									</div>

									{/* Info */}
									<div className="flex-1 min-w-0">
										<div className="flex items-center justify-between mb-1">
											<span className="text-[14px] font-semibold">{item.name}</span>
											{/* Heart — filled red, click removes */}
											<button onClick={() => removeFromWishlist(item.id)} className="text-red-500 hover:text-red-400 transition-colors shrink-0">
												<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
													<path d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
												</svg>
											</button>
										</div>
										<p className="text-[14px] font-bold mb-0.5">{item.price}GHC</p>
										<p className="text-[12px] text-gray-400 mb-3">{item.category}</p>
										<div className="flex items-center gap-3">
											<button className="bg-purple-700 hover:bg-purple-800 text-white text-[12px] px-4 py-1.5 rounded-md transition-colors">
												View product
											</button>
											<button className="text-[12px] text-purple-700 hover:underline font-medium">
												Add to cart
											</button>
										</div>
									</div>
								</div>
							))}
						</div>

						{totalPages > 1 && (
							<Pagination current={page} total={totalPages} onChange={setPage} />
						)}
					</div>
				)}
			</Panel>
		</>
	);
}