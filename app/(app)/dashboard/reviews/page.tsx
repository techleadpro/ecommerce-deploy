"use client"

import { useState } from "react";
import DashboardHeader from "@/app/components/DashboardHeader"

// ---- Types ----
interface Review {
	id: number;
	customerName: string;
	productBought: string;
	category: string;
	rating: number;
	comment: string;
	date: string;
}

// ---- Mock Data ----
const MOCK_REVIEWS: Review[] = [
	{ id: 1, customerName: "John Williams", productBought: "Woven Basket", category: "Home & Living", rating: 4, comment: "What stood out most was the attention to detail and how seamlessly everything worked together. It solved the problem it was created for and exceeded my expectations. I'd confidently recommend it to anyone looking for a reliable and well-crafted solution.", date: "01/01/26 - 10:23" },
	{ id: 2, customerName: "Sarah Mensah", productBought: "Leather Bag", category: "Fashion", rating: 4, comment: "What stood out most was the attention to detail and how seamlessly everything worked together. It solved the problem it was created for and exceeded my expectations. I'd confidently recommend it to anyone looking for a reliable and well-crafted solution.", date: "01/01/26 - 10:23" },
	{ id: 3, customerName: "Kwame Asante", productBought: "Running Shoes", category: "Sports", rating: 4, comment: "What stood out most was the attention to detail and how seamlessly everything worked together. It solved the problem it was created for and exceeded my expectations. I'd confidently recommend it to anyone looking for a reliable and well-crafted solution.", date: "01/01/26 - 10:23" },
	{ id: 4, customerName: "Ama Boateng", productBought: "Headphones", category: "Electronics", rating: 5, comment: "Absolutely fantastic product. Exceeded all my expectations and the quality is top notch.", date: "01/02/26 - 09:15" },
	{ id: 5, customerName: "Kofi Darko", productBought: "Smartwatch", category: "Electronics", rating: 3, comment: "Decent product overall, though there are a few areas that could be improved.", date: "01/02/26 - 11:40" },
	{ id: 6, customerName: "Abena Osei", productBought: "Woven Basket", category: "Home & Living", rating: 5, comment: "Perfect gift item. Everyone loved it and the packaging was great.", date: "01/03/26 - 14:05" },
];

const ITEMS_PER_PAGE = 3;

// ---- Star Rating Component ----
function StarRating({ rating }: { rating: number }) {
	return (
		<div className="flex items-center gap-1">
			{Array.from({ length: 5 }).map((_, i) => (
				<svg
					key={i}
					className={`w-5 h-5 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
					fill="currentColor"
					viewBox="0 0 20 20"
				>
					<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
				</svg>
			))}
			<span className="text-[14px] text-gray-600 ml-1">{rating}.0</span>
		</div>
	);
}

// ---- Review Card Component ----
function ReviewCard({ review }: { review: Review }) {
	return (
		<div className="border border-gray-200 rounded-lg p-5">
			<p className="text-[15px] font-semibold mb-1">{review.customerName}</p>
			<div className="flex items-center gap-2 mb-3">
				<span className="text-[13px] text-purple-700 font-medium">{review.productBought}</span>
				<span className="text-[13px] text-gray-400 italic">{review.category}</span>
			</div>
			<StarRating rating={review.rating} />
			<p className="text-[13px] text-gray-600 mt-3 leading-relaxed">"{review.comment}"</p>
			<p className="text-[12px] text-gray-400 mt-2">{review.date}</p>
		</div>
	);
}

// ---- Pagination Component ----
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

export default function ReviewsPage() {
	const [page, setPage] = useState<number>(1);
	const reviews = MOCK_REVIEWS;
	const totalPages = Math.ceil(reviews.length / ITEMS_PER_PAGE);
	const paginated = reviews.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

	return (
		<div>
			<DashboardHeader />

			<section className="mt-10 py-12 max-w-7xl border-t border-t-gray-300">
				<h1 className="text-[22px] font-bold mb-6">My Purchases</h1>
				<div className="mt-14">
					{/* Filters */}
					<div className="flex gap-4 mb-6">
						{["Product category", "Product", "From", "To"].map(ph => (
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
					{reviews.length === 0 ? (
						<div className="flex flex-col items-center justify-center py-24 text-center">
							<p className="text-[16px] text-gray-400 mb-6">
								You currently have no reviews yet, upload your first product and<br />make sales to get your first product review
							</p>
							<button className="bg-purple-700 hover:bg-purple-800 text-white text-[14px] px-6 py-3 rounded-md transition-colors">
								Upload Product
							</button>
						</div>
					) : (
						<>
							<div className="flex flex-col gap-4">
								{paginated.map(review => (
									<ReviewCard key={review.id} review={review} />
								))}
							</div>
							{totalPages > 1 && (
								<Pagination current={page} total={totalPages} onChange={setPage} />
							)}
						</>
					)}
				</div>
			</section>
		</div>
	)
}

