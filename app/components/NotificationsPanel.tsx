"use client";

import { useState } from "react";

// ---- Types ----
type NotifTab = "All" | "Read" | "Unread";

interface Notification {
	id: number;
	message: string;
	date: string;
	tag: "Order" | "Shipment";
	read: boolean;
}

// ---- Mock Data ----
const MOCK_NOTIFICATIONS: Notification[] = [
	{ id: 1, message: 'Your product "woven basket" has a new order for 2 units', date: "Today, 12/01/2026 · 10:23", tag: "Order", read: false },
	{ id: 2, message: 'Your product "woven basket" has a new order for 2 units', date: "Today, 12/01/2026 · 10:23", tag: "Order", read: false },
	{ id: 3, message: 'Your product "woven basket" has a new order for 2 units', date: "Today, 12/01/2026 · 10:23", tag: "Order", read: false },
	{ id: 4, message: 'Your product "woven basket" has a new order for 2 units', date: "Today, 12/01/2026 · 10:23", tag: "Order", read: true },
	{ id: 5, message: 'Your product "woven basket" has a new order for 2 units', date: "Today, 12/01/2026 · 10:23", tag: "Shipment", read: true },
	{ id: 6, message: 'Your product "woven basket" has a new order for 2 units', date: "Today, 12/01/2026 · 10:23", tag: "Shipment", read: true },
	{ id: 7, message: 'Your product "woven basket" has a new order for 2 units', date: "Today, 12/01/2026 · 10:23", tag: "Shipment", read: true },
];

const ITEMS_PER_PAGE = 7;

// ---- Pagination ----
function Pagination({ current, total, onChange }: { current: number; total: number; onChange: (p: number) => void }) {
	return (
		<div className="flex items-center justify-center gap-2 mt-6">
			<button onClick={() => onChange(Math.max(1, current - 1))} className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-gray-500 hover:border-purple-700 hover:text-purple-700 transition-colors">‹</button>
			{Array.from({ length: total }, (_, i) => i + 1).map(p => (
				<button key={p} onClick={() => onChange(p)} className={`w-8 h-8 flex items-center justify-center rounded text-[14px] transition-colors ${p === current ? "bg-purple-700 text-white" : "border border-gray-300 text-gray-500 hover:border-purple-700 hover:text-purple-700"}`}>{p}</button>
			))}
			<button onClick={() => onChange(Math.min(total, current + 1))} className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-gray-500 hover:border-purple-700 hover:text-purple-700 transition-colors">›</button>
		</div>
	);
}

// ---- Notifications Panel ----
export function NotificationsPanel({ onClose }: { onClose: () => void }) {
	const [tab, setTab] = useState<NotifTab>("All");
	const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
	const [page, setPage] = useState<number>(1);

	const unreadCount = notifications.filter(n => !n.read).length;

	const filtered = notifications.filter(n => {
		if (tab === "Read") return n.read;
		if (tab === "Unread") return !n.read;
		return true;
	});

	const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
	const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

	const markAllAsRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));

	const tabs: NotifTab[] = ["All", "Read", "Unread"];

	return (
		<>
			{/* Backdrop */}
			<div
				className="fixed inset-0 bg-black/30 z-40"
				onClick={onClose}
			/>

			{/* Panel */}
			<div className="fixed top-0 right-0 h-full w-208 bg-white z-50 shadow-xl flex flex-col">

				{/* Header */}
				<div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
					<h2 className="text-[18px] font-bold">Notifications</h2>
					<button
						onClick={onClose}
						className="w-8 h-8 flex items-center justify-center border border-purple-700 rounded-md text-purple-700 hover:bg-purple-50 transition-colors"
					>
						<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				{/* Body */}
				<div className="flex-1 overflow-y-auto px-8 py-6">

					{notifications.length === 0 ? (
						<div className="flex items-center justify-center h-full">
							<p className="text-[15px] text-gray-400">You currently have no notifications.</p>
						</div>
					) : (
						<>
							{/* Tabs + Mark all as read */}
							<div className="flex items-center justify-between mb-4">
								<div className="flex gap-6">
									{tabs.map(t => (
										<button
											key={t}
											onClick={() => { setTab(t); setPage(1); }}
											className={`text-[14px] pb-2 border-b-2 transition-colors ${tab === t ? "border-black text-black font-medium" : "border-transparent text-gray-400 hover:text-gray-600"}`}
										>
											{t === "Unread" && unreadCount > 0 ? `Unread (${unreadCount})` : t}
										</button>
									))}
								</div>
								{unreadCount > 0 && (
									<button
										onClick={markAllAsRead}
										className="text-[13px] text-purple-700 font-semibold hover:underline"
									>
										Mark all as read
									</button>
								)}
							</div>

							{/* Notification List */}
							<div className="divide-y divide-gray-100">
								{paginated.map(n => (
									<div key={n.id} className="py-4">
										<p className={`text-[14px] mb-1 ${n.read ? "text-gray-500 font-normal" : "text-black font-semibold"}`}>
											{n.message}
										</p>
										<div className="flex items-center gap-2">
											<span className="text-[12px] text-gray-400 italic">{n.date}</span>
											<span className="text-[12px] text-gray-400">{n.tag}</span>
										</div>
									</div>
								))}
							</div>

							{totalPages > 1 && (
								<Pagination current={page} total={totalPages} onChange={setPage} />
							)}
						</>
					)}
				</div>
			</div>
		</>
	);
}