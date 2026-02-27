"use client"

import { useState } from "react";
import DashboardHeader from "@/app/components/DashboardHeader"

// ---- Types ----
type ProductStatus = "Approved" | "Pending" | "Declined";
type View =
	| "listings"
	| "upload"
	| "upload-preview"
	| "upload-success"
	| "product-detail"
	| "edit"
	| "edit-success"
	| "appeal"
	| "appeal-success";

interface Product {
	id: number;
	name: string;
	category: string;
	subCategory: string;
	price: number;
	unitsLeft: number;
	status: ProductStatus;
	unitsSold: number;
	availableUnits: number;
	amountSold: string;
	images: string[];
	hasVideo: boolean;
	youtubeLink: string;
	description: string;
	details: string;
	instructions: string;
	weight: string;
	length: string;
	width: string;
	height: string;
	sku: string;
	declineReasons?: string[];
}

// ---- Mock Data ----
const MOCK_PRODUCTS: Product[] = [
	{ id: 1, name: "Wireless Headphones", category: "Electronics", subCategory: "Audio", price: 230, unitsLeft: 4, status: "Approved", unitsSold: 234, availableUnits: 123, amountSold: "GHC 1,200", images: ["🎧", "🎧", "🎧", "🎧", "🎧", "🎧", "🎧"], hasVideo: true, youtubeLink: "", description: "", details: "", instructions: "", weight: "23Kg", length: "23cm", width: "32cm", height: "12cm", sku: "SKU-001" },
	{ id: 2, name: "Smartwatch Pro", category: "Electronics", subCategory: "Wearables", price: 450, unitsLeft: 4, status: "Pending", unitsSold: 12, availableUnits: 45, amountSold: "GHC 5,400", images: ["⌚", "⌚", "⌚", "⌚", "⌚", "⌚", "⌚"], hasVideo: false, youtubeLink: "", description: "", details: "", instructions: "", weight: "0.5Kg", length: "10cm", width: "8cm", height: "2cm", sku: "SKU-002" },
	{ id: 3, name: "Leather Bag", category: "Fashion", subCategory: "Bags", price: 180, unitsLeft: 4, status: "Declined", unitsSold: 0, availableUnits: 10, amountSold: "GHC 0", images: ["👜", "👜", "👜", "👜", "👜", "👜", "👜"], hasVideo: false, youtubeLink: "", description: "", details: "", instructions: "", weight: "1.2Kg", length: "35cm", width: "25cm", height: "15cm", sku: "SKU-003", declineReasons: ["Images are too low quality", "Description is insufficient", "Price is incorrectly set"] },
	{ id: 4, name: "Running Shoes", category: "Sports", subCategory: "Footwear", price: 120, unitsLeft: 4, status: "Approved", unitsSold: 89, availableUnits: 30, amountSold: "GHC 10,680", images: ["👟", "👟", "👟", "👟", "👟", "👟", "👟"], hasVideo: false, youtubeLink: "", description: "", details: "", instructions: "", weight: "0.8Kg", length: "30cm", width: "12cm", height: "10cm", sku: "SKU-004" },
	{ id: 5, name: "Woven Basket", category: "Home & Living", subCategory: "Decor", price: 75, unitsLeft: 4, status: "Approved", unitsSold: 56, availableUnits: 20, amountSold: "GHC 4,200", images: ["🧺", "🧺", "🧺", "🧺", "🧺", "🧺", "🧺"], hasVideo: false, youtubeLink: "", description: "", details: "", instructions: "", weight: "1.5Kg", length: "40cm", width: "40cm", height: "30cm", sku: "SKU-005" },
	{ id: 6, name: "Ceramic Mug", category: "Home & Living", subCategory: "Kitchen", price: 35, unitsLeft: 4, status: "Approved", unitsSold: 200, availableUnits: 50, amountSold: "GHC 7,000", images: ["☕", "☕", "☕", "☕", "☕", "☕", "☕"], hasVideo: false, youtubeLink: "", description: "", details: "", instructions: "", weight: "0.3Kg", length: "10cm", width: "10cm", height: "12cm", sku: "SKU-006" },
];

const ITEMS_PER_PAGE = 6;

const STATUS_COLORS: Record<ProductStatus, string> = {
	Approved: "text-green-600",
	Pending: "text-yellow-500",
	Declined: "text-red-500",
};

// ---- Shared Sub-components ----
function BackButton({ label, onClick }: { label: string; onClick: () => void }) {
	return (
		<button onClick={onClick} className="flex items-center gap-1 text-[15px] font-bold mb-6">
			<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
				<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
			</svg>
			{label}
		</button>
	);
}

function SectionTitle({ title }: { title: string }) {
	return <h3 className="text-[15px] font-bold mb-4">{title}</h3>;
}

function FormField({ label, placeholder, hint, value, onChange, readOnly }: {
	label: string; placeholder: string; hint?: string;
	value?: string; onChange?: (v: string) => void; readOnly?: boolean;
}) {
	return (
		<div className="flex flex-col">
			<label className="text-[12px] text-gray-400 mb-1">{label}</label>
			<input
				type="text"
				placeholder={placeholder}
				value={value ?? ""}
				readOnly={readOnly}
				onChange={e => onChange?.(e.target.value)}
				className={`text-[13px] p-3 outline-1 outline-gray-300 rounded-sm bg-white ${readOnly ? "text-gray-500" : ""}`}
			/>
			{hint && <span className="text-[11px] text-gray-400 mt-1">{hint}</span>}
		</div>
	);
}

function TextareaField({ label, placeholder, hint, value, onChange, hasError }: {
	label: string; placeholder: string; hint?: string;
	value?: string; onChange?: (v: string) => void; hasError?: boolean;
}) {
	return (
		<div className="flex flex-col">
			<label className="text-[12px] text-gray-400 mb-1">{label}</label>
			<textarea
				placeholder={placeholder}
				value={value ?? ""}
				onChange={e => onChange?.(e.target.value)}
				rows={3}
				className={`text-[13px] p-3 outline-1 rounded-sm bg-white resize-none ${hasError ? "outline-red-400" : "outline-gray-300"}`}
			/>
			{hint && <span className="text-[11px] text-gray-400 mt-1">{hint}</span>}
		</div>
	);
}

function SelectField({ label, placeholder, hint }: { label: string; placeholder: string; hint?: string }) {
	return (
		<div className="flex flex-col">
			<label className="text-[12px] text-gray-400 mb-1">{label}</label>
			<div className="relative">
				<select className="w-full appearance-none text-[13px] text-gray-400 p-3 outline-1 outline-gray-300 rounded-sm bg-white pr-8">
					<option>{placeholder}</option>
				</select>
				<svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
				</svg>
			</div>
			{hint && <span className="text-[11px] text-gray-400 mt-1">{hint}</span>}
		</div>
	);
}

function DimensionField({ label, unit, placeholder, hint }: { label: string; unit: string; placeholder: string; hint?: string }) {
	return (
		<div className="flex flex-col">
			<label className="text-[12px] text-gray-400 mb-1">{label}</label>
			<div className="flex items-center outline-1 outline-gray-300 rounded-sm bg-white overflow-hidden">
				<div className="flex items-center gap-1 px-3 border-r border-gray-300">
					<span className="text-[13px] text-gray-500">{unit}</span>
					<svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
				</div>
				<input type="text" placeholder={placeholder} className="flex-1 text-[13px] p-3 bg-white outline-none" />
			</div>
			{hint && <span className="text-[11px] text-gray-400 mt-1">{hint}</span>}
		</div>
	);
}

function ProductImages({ images, removable }: { images: string[]; removable?: boolean }) {
	return (
		<div className="flex gap-2 flex-wrap">
			{images.map((img, i) => (
				<div key={i} className="flex flex-col items-center gap-1">
					<div className="w-14 h-14 bg-yellow-400 rounded-lg flex items-center justify-center text-2xl">{img}</div>
					{removable && <button className="text-[11px] text-purple-700 hover:underline">Remove</button>}
				</div>
			))}
		</div>
	);
}

function VideoPreview() {
	return (
		<div className="relative w-full h-44 bg-yellow-700 rounded-md flex items-center justify-center mt-3">
			<div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
				<svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
					<path d="M8 5v14l11-7z" />
				</svg>
			</div>
		</div>
	);
}

function DeclineBanner({ reasons }: { reasons: string[] }) {
	return (
		<div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6 flex gap-3">
			<svg className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
				<path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 110 20A10 10 0 0112 2z" />
			</svg>
			<div>
				<p className="text-[13px] text-gray-700">Your product was declined for xyz reasons.</p>
				<ol className="list-decimal list-inside mt-1">
					{reasons.map((r, i) => <li key={i} className="text-[12px] text-gray-600">{r}</li>)}
				</ol>
			</div>
		</div>
	);
}

function PendingBanner() {
	return (
		<div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-6 flex gap-3 items-center">
			<svg className="w-4 h-4 text-yellow-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
				<path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 110 20A10 10 0 0112 2z" />
			</svg>
			<p className="text-[13px] text-gray-700">
				Your product will be approved within the next 48 hours. &nbsp;
				<span className="text-purple-700 font-semibold">47:56:09 hours left</span>
			</p>
		</div>
	);
}

function SuccessScreen({ title, subtitle, onViewProduct }: { title: string; subtitle: string; onViewProduct: () => void }) {
	return (
		<div className="flex flex-col items-center justify-center py-16 text-center max-w-lg mx-auto">
			<div className="text-8xl mb-6">🤝</div>
			<h2 className="text-[22px] font-bold text-purple-700 mb-3">{title}</h2>
			<p className="text-[14px] text-gray-500 mb-8 leading-relaxed">{subtitle}</p>
			<button onClick={onViewProduct} className="bg-purple-700 hover:bg-purple-800 text-white text-[14px] px-8 py-3 rounded-md transition-colors">
				View Product
			</button>
		</div>
	);
}

function Pagination({ current, total, onChange }: { current: number; total: number; onChange: (p: number) => void }) {
	return (
		<div className="flex items-center justify-center gap-2 mt-8">
			<button onClick={() => onChange(Math.max(1, current - 1))} className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-gray-500 hover:border-purple-700 hover:text-purple-700 transition-colors">‹</button>
			{Array.from({ length: total }, (_, i) => i + 1).map(p => (
				<button key={p} onClick={() => onChange(p)} className={`w-8 h-8 flex items-center justify-center rounded text-[14px] transition-colors ${p === current ? "bg-purple-700 text-white" : "border border-gray-300 text-gray-500 hover:border-purple-700 hover:text-purple-700"}`}>{p}</button>
			))}
			<button onClick={() => onChange(Math.min(total, current + 1))} className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-gray-500 hover:border-purple-700 hover:text-purple-700 transition-colors">›</button>
		</div>
	);
}

// ---- Product Form (shared by Upload, Edit, Appeal) ----
function ProductForm({
	mode,
	product,
	onCancel,
	onSubmit,
}: {
	mode: "upload" | "edit" | "appeal";
	product?: Product;
	onCancel: () => void;
	onSubmit: () => void;
}) {
	const submitLabel = mode === "upload" ? "Preview" : mode === "edit" ? "Save Changes" : "Re-upload Product";

	return (
		<div className="max-w-3xl">
			{mode === "appeal" && product?.declineReasons && <DeclineBanner reasons={product.declineReasons} />}

			{mode === "appeal" && (
				<div className="mb-6">
					<TextareaField label="Input Appeal" placeholder="Enter appeal" hint="Kindly input why your product should be approved" />
				</div>
			)}

			{/* About Product */}
			<SectionTitle title="About Product" />
			<div className="grid grid-cols-2 gap-4 mb-4">
				<FormField label="Product Name" placeholder="Enter name" hint="This is how your product name will be displayed on the marketplace" value={product?.name} />
				<FormField label="YouTube Video (optional)" placeholder="Enter name" hint="This helps convince users to buy the product" value={product?.youtubeLink} />
			</div>
			<div className="mb-4">
				<TextareaField label="Product Description" placeholder="Enter product description" hint="What makes your item special? Buyers will only see the first few lines unless they expand the description." value={product?.description} hasError={mode === "appeal"} />
			</div>
			<div className="mb-4">
				<TextareaField label="Product Details" placeholder="Enter product details" hint="Include key details like size, scent notes, fragrance type, and packaging. e.g., Size: 50ml, Fragrance Type: Eau de Parfum, Top Notes: Jasmine, Pear" value={product?.details} hasError={mode === "appeal"} />
			</div>
			<div className="mb-6">
				<TextareaField label="Instruction to Buyers (optional)" placeholder="Enter instruction to buyers" hint={"Instructions for buyers\nEnter the personalisation instructions you want buyers to see."} value={product?.instructions} />
			</div>

			{/* Images */}
			<div className="mb-2">
				<p className="text-[13px] text-gray-500 mb-2">Product Images - Add up to 10 photos and 1 video.</p>
				<button className="text-[13px] text-purple-700 font-medium flex items-center gap-1 mb-3">
					Upload Product Images
					<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
				</button>
				{product?.images && <ProductImages images={product.images} removable />}
			</div>
			<div className="mb-6">
				<button className="text-[13px] text-purple-700 font-medium flex items-center gap-1 mb-2">
					Upload Product Video
					<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
				</button>
				{product?.hasVideo && (
					<>
						<VideoPreview />
						<button className="text-[12px] text-purple-700 hover:underline mt-2">Remove Video</button>
					</>
				)}
				<p className="text-[11px] text-gray-400 mt-2">We found that listings with video get twice as many orders as listings with just photos. Supported formats are *.jpg and *.png</p>
			</div>

			{/* Product Category */}
			<SectionTitle title="Product Category" />
			<div className="grid grid-cols-2 gap-4 mb-6">
				<SelectField label="Product Category" placeholder="Choose category" hint="Choose the category this product falls under" />
				<SelectField label="Product Sub-category" placeholder="Choose sub-category" hint="Choose the sub-category this product falls under" />
			</div>

			{/* Price & Inventory */}
			<SectionTitle title="Product Price and Inventory" />
			<div className="grid grid-cols-2 gap-4 mb-4">
				<div className="flex flex-col">
					<label className="text-[12px] text-gray-400 mb-1">Product Cost Per Unit</label>
					<div className="flex items-center outline-1 outline-gray-300 rounded-sm bg-white overflow-hidden">
						<div className="flex items-center gap-1 px-3 border-r border-gray-300">
							<span className="text-lg">🇬🇭</span>
							<span className="text-[13px] text-gray-500">GHC</span>
							<svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
						</div>
						<input type="text" placeholder="Enter amount" defaultValue={product?.price} className="flex-1 text-[13px] p-3 bg-white outline-none" />
					</div>
					<span className="text-[11px] text-gray-400 mt-1">Choose preferred currency and get an automatic conversion on the marketplace</span>
				</div>
				<FormField label="Available Quantity in Stock" placeholder="Enter units" hint="This will automatically change as you make sales" />
			</div>
			<div className="mb-6">
				<FormField label="SKU (Optional)" placeholder="Enter SKU" hint="This helps you internally track your product" value={product?.sku} />
			</div>

			{/* Dimensions */}
			<SectionTitle title="Product Dimensions" />
			<div className="grid grid-cols-2 gap-4 mb-8">
				<DimensionField label="Product Weight" unit="Kg" placeholder="Enter weight of product" hint="The weight of your product determines the cost of shipping" />
				<DimensionField label="Product Length" unit="cm" placeholder="Enter length of product" hint="The length of your product determines the cost of shipping" />
				<DimensionField label="Product Width" unit="cm" placeholder="Enter width of product" hint="The width of your product determines the cost of shipping" />
				<DimensionField label="Product Height" unit="cm" placeholder="Enter height of product" hint="The height of your product determines the cost of shipping" />
			</div>

			{/* Actions */}
			<div className="grid grid-cols-2 gap-4">
				<button onClick={onCancel} className="border border-gray-300 text-gray-500 hover:border-purple-700 hover:text-purple-700 text-[14px] py-3 rounded-md transition-colors">
					Cancel
				</button>
				<button onClick={onSubmit} className="bg-purple-700 hover:bg-purple-800 text-white text-[14px] py-3 rounded-md transition-colors">
					{submitLabel}
				</button>
			</div>
		</div>
	);
}

// ---- Product Detail View ----
function ProductDetailView({
	product,
	onBack,
	onEdit,
	onAppeal,
}: {
	product: Product;
	onBack: () => void;
	onEdit: () => void;
	onAppeal: () => void;
}) {
	return (
		<div className="max-w-3xl">
			<BackButton label="Product Details" onClick={onBack} />

			{product.status === "Pending" && <PendingBanner />}
			{product.status === "Declined" && product.declineReasons && <DeclineBanner reasons={product.declineReasons} />}

			{/* Stats */}
			<div className="flex gap-4 mb-6">
				{[
					{ label: "Total Number of Units", value: product.unitsLeft },
					{ label: "Number of Units Sold", value: product.unitsSold },
					{ label: "Available Units", value: product.availableUnits },
					{ label: "Amount Sold", value: product.amountSold },
				].map(s => (
					<div key={s.label} className="flex-1 border border-gray-200 rounded-md p-3">
						<p className="text-[12px] text-gray-400 mb-1">{s.label}</p>
						<p className="text-[18px] font-bold">{s.value}</p>
					</div>
				))}
			</div>

			{/* Header */}
			<div className="border border-gray-200 rounded-lg p-5 flex justify-between items-center mb-5">
				<div className="flex items-center gap-3">
					<h2 className="text-[18px] font-semibold">{product.name}</h2>
					<span className={`text-[13px] font-medium ${STATUS_COLORS[product.status]}`}>{product.status}</span>
				</div>
				{product.status === "Declined" ? (
					<button onClick={onAppeal} className="bg-purple-700 hover:bg-purple-800 text-white text-[13px] px-5 py-2.5 rounded-md transition-colors">Appeal For Approval</button>
				) : (
					<button onClick={onEdit} className="bg-purple-700 hover:bg-purple-800 text-white text-[13px] px-5 py-2.5 rounded-md transition-colors">Edit Product</button>
				)}
			</div>

			{/* Detail Card */}
			<div className="border border-gray-200 rounded-lg p-5">
				<SectionTitle title="About Product" />
				<div className="flex flex-col gap-3 mb-4">
					<FormField label="YouTube Video Link" placeholder="Enter name" readOnly value={product.youtubeLink || "Enter name"} />
					<FormField label="Product Description" placeholder="Enter product description" readOnly />
					<FormField label="Product Details" placeholder="Enter product details" readOnly />
					<FormField label="Instruction to Buyers" placeholder="Enter instruction to buyers" readOnly />
				</div>

				<div className="mb-4">
					<p className="text-[12px] text-gray-400 mb-2">Product Images -</p>
					<ProductImages images={product.images} />
					{product.hasVideo && <VideoPreview />}
				</div>

				<SectionTitle title="Product Category" />
				<div className="grid grid-cols-2 gap-3 mb-4">
					<FormField label="Product Category" placeholder="Choose category" readOnly value={product.category} />
					<FormField label="Product Sub-category" placeholder="Choose sub-category" readOnly value={product.subCategory} />
				</div>

				<SectionTitle title="Product Price and Inventory" />
				<div className="grid grid-cols-2 gap-3 mb-4">
					<FormField label="Product Cost Per Unit" placeholder="" readOnly value={String(product.price)} />
					<FormField label="SKU" placeholder="SKU number" readOnly value={product.sku} />
				</div>

				<SectionTitle title="Product Dimensions" />
				<div className="grid grid-cols-2 gap-3">
					<FormField label="Product Weight" placeholder="" readOnly value={product.weight} />
					<FormField label="Product Length" placeholder="" readOnly value={product.length} />
					<FormField label="Product Width" placeholder="" readOnly value={product.width} />
					<FormField label="Product Height" placeholder="" readOnly value={product.height} />
				</div>
			</div>
		</div>
	);
}

// ---- Upload Preview ----
function UploadPreview({ onBack, onEdit, onUpload }: { onBack: () => void; onEdit: () => void; onUpload: () => void }) {
	return (
		<div className="max-w-3xl">
			<BackButton label="Upload Product" onClick={onBack} />
			<div className="border border-gray-200 rounded-lg p-5 mb-5">
				<div className="flex items-center gap-3 mb-4">
					<h2 className="text-[18px] font-semibold">Name of product</h2>
					<span className="text-[13px] font-medium text-yellow-500">Pending</span>
				</div>
				<SectionTitle title="About Product" />
				<div className="flex flex-col gap-3 mb-4">
					<FormField label="Product Name" placeholder="Enter name" readOnly />
					<FormField label="YouTube Video" placeholder="Enter name" readOnly />
					<FormField label="Product Description" placeholder="Enter product description" readOnly />
					<FormField label="Product Details" placeholder="Enter product details" readOnly />
					<FormField label="Instruction to Buyers" placeholder="Enter instruction to buyers" readOnly />
				</div>
				<div className="mb-4">
					<p className="text-[12px] text-gray-400 mb-2">Product Images -</p>
					<ProductImages images={["🎧", "🎧", "🎧", "🎧", "🎧", "🎧", "🎧"]} />
					<VideoPreview />
				</div>
				<SectionTitle title="Product Category" />
				<div className="grid grid-cols-2 gap-3 mb-4">
					<FormField label="Product Category" placeholder="Choose category" readOnly />
					<FormField label="Product Sub-category" placeholder="Choose sub-category" readOnly />
				</div>
				<SectionTitle title="Product Price and Inventory" />
				<div className="grid grid-cols-2 gap-3 mb-4">
					<FormField label="Product Cost Per Unit" placeholder="" readOnly value="230" />
					<FormField label="SKU" placeholder="SKU number" readOnly />
				</div>
				<SectionTitle title="Product Dimensions" />
				<div className="grid grid-cols-2 gap-3">
					<FormField label="Product Weight" placeholder="" readOnly value="23Kg" />
					<FormField label="Product Length" placeholder="" readOnly value="23cm" />
					<FormField label="Product Width" placeholder="" readOnly value="32cm" />
					<FormField label="Product Height" placeholder="" readOnly value="12cm" />
				</div>
			</div>
			<div className="grid grid-cols-2 gap-4">
				<button onClick={onEdit} className="border border-gray-300 text-gray-500 hover:border-purple-700 hover:text-purple-700 text-[14px] py-3 rounded-md transition-colors">Edit Listing</button>
				<button onClick={onUpload} className="bg-purple-700 hover:bg-purple-800 text-white text-[14px] py-3 rounded-md transition-colors">Upload Product Listing</button>
			</div>
		</div>
	);
}

// ---- Main Page ----
export default function ProductListingsPage() {
	const [view, setView] = useState<View>("listings");
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
	const [page, setPage] = useState<number>(1);

	const products = MOCK_PRODUCTS;
	const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
	const paginated = products.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

	const stats = {
		categories: 3,
		units: 234,
		total: products.length,
		sold: 120,
	};

	const goTo = (v: View, p?: Product) => {
		if (p) setSelectedProduct(p);
		setView(v);
	};

	return (
		<div>
			<DashboardHeader />

			<section className="mt-10 py-12 max-w-7xl border-t border-t-gray-300">
				<h1 className="text-[22px] font-bold mb-6">My Product Listings</h1>
				<div className="mt-14">

					{/* ── LISTINGS ── */}
					{view === "listings" && (
						<>
							{/* Stat Cards */}
							<div className="flex gap-4 mb-6">
								{[
									{ label: "Total Product Categories", value: stats.categories },
									{ label: "Total Product Units", value: stats.units },
									{ label: "Total Products", value: stats.total },
									{ label: "Total Products Sold", value: stats.sold },
								].map(s => (
									<div key={s.label} className="flex-1 border border-gray-200 rounded-md p-4">
										<p className="text-[13px] text-gray-500 mb-2">{s.label}</p>
										<p className="text-[22px] font-bold">{s.value}</p>
									</div>
								))}
							</div>

							{products.length > 0 && (
								<button onClick={() => setView("upload")} className="bg-purple-700 hover:bg-purple-800 text-white text-[14px] px-5 py-2.5 rounded-md transition-colors flex items-center gap-2 mb-5">
									Upload New Product
									<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
								</button>
							)}

							{/* Filters */}
							<div className="flex gap-4 mb-6">
								{["Choose category", "Choose product status", "Choose weight range"].map(ph => (
									<div key={ph} className="flex-1 relative">
										<select className="w-full appearance-none text-[13px] text-gray-400 p-3 outline-1 outline-gray-300 rounded-sm bg-white pr-8">
											<option>{ph}</option>
										</select>
										<svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
									</div>
								))}
								<button className="border border-purple-700 text-purple-700 hover:bg-purple-50 text-[14px] px-6 py-2 rounded-md transition-colors whitespace-nowrap">Apply Filter</button>
							</div>

							{/* Empty State */}
							{products.length === 0 ? (
								<div className="flex flex-col items-center justify-center py-24 text-center">
									<p className="text-[16px] text-gray-400 mb-6">You currently have no products yet, upload your first<br />product and make sales.</p>
									<button onClick={() => setView("upload")} className="bg-purple-700 hover:bg-purple-800 text-white text-[14px] px-6 py-3 rounded-md transition-colors">Upload Product</button>
								</div>
							) : (
								<>
									<div className="grid grid-cols-3 gap-5">
										{paginated.map(p => (
											<div key={p.id} className="border border-gray-200 rounded-lg overflow-hidden">
												<div className="h-44 bg-gray-100 flex items-center justify-center text-6xl">{p.images[0]}</div>
												<div className="p-4">
													<div className="flex justify-between items-start mb-1">
														<span className="text-[14px] font-semibold">{p.name}</span>
														<span className="text-[12px] text-gray-400">{p.unitsLeft} Units left</span>
													</div>
													<div className="flex justify-between items-center mb-1">
														<span className="text-[13px] text-gray-400">{p.category}</span>
														<span className={`text-[12px] font-medium ${STATUS_COLORS[p.status]}`}>{p.status}</span>
													</div>
													<div className="flex justify-between items-center mb-3">
														<span className="text-[13px] text-gray-400">{p.subCategory}</span>
														<span className="text-[14px] font-semibold">GHC {p.price}</span>
													</div>
													<button
														onClick={() => goTo("product-detail", p)}
														className="w-full border border-purple-700 text-purple-700 hover:bg-purple-50 text-[13px] py-2 rounded-md transition-colors"
													>
														View Product
													</button>
												</div>
											</div>
										))}
									</div>
									{totalPages > 1 && <Pagination current={page} total={totalPages} onChange={setPage} />}
								</>
							)}
						</>
					)}

					{/* ── UPLOAD FORM ── */}
					{view === "upload" && (
						<>
							<BackButton label="Upload Product" onClick={() => setView("listings")} />
							<ProductForm
								mode="upload"
								onCancel={() => setView("listings")}
								onSubmit={() => setView("upload-preview")}
							/>
						</>
					)}

					{/* ── UPLOAD PREVIEW ── */}
					{view === "upload-preview" && (
						<UploadPreview
							onBack={() => setView("upload")}
							onEdit={() => setView("upload")}
							onUpload={() => setView("upload-success")}
						/>
					)}

					{/* ── UPLOAD SUCCESS ── */}
					{view === "upload-success" && (
						<SuccessScreen
							title="Product Upload Successful!"
							subtitle={"Congratulations!!! You have successfully uploaded your first product\nYour product will be approved within the next 48 hours, and will be displayed on the marketplace."}
							onViewProduct={() => setView("listings")}
						/>
					)}

					{/* ── PRODUCT DETAIL ── */}
					{view === "product-detail" && selectedProduct && (
						<ProductDetailView
							product={selectedProduct}
							onBack={() => setView("listings")}
							onEdit={() => setView("edit")}
							onAppeal={() => setView("appeal")}
						/>
					)}

					{/* ── EDIT FORM ── */}
					{view === "edit" && selectedProduct && (
						<>
							<BackButton label="Edit Product" onClick={() => setView("product-detail")} />
							<ProductForm
								mode="edit"
								product={selectedProduct}
								onCancel={() => setView("product-detail")}
								onSubmit={() => setView("edit-success")}
							/>
						</>
					)}

					{/* ── EDIT SUCCESS ── */}
					{view === "edit-success" && (
						<SuccessScreen
							title="Changes Saved Successfully!"
							subtitle="You have successfully made changes to your product and they have been reflected on the marketplace and your dashboard."
							onViewProduct={() => setView("product-detail")}
						/>
					)}

					{/* ── APPEAL FORM ── */}
					{view === "appeal" && selectedProduct && (
						<>
							<BackButton label="Appeal Product" onClick={() => setView("product-detail")} />
							<p className="text-[13px] text-gray-500 mb-6">Let us know why your product should be reconsidered, edit product details and re-upload your product.</p>
							<ProductForm
								mode="appeal"
								product={selectedProduct}
								onCancel={() => setView("product-detail")}
								onSubmit={() => setView("appeal-success")}
							/>
						</>
					)}

					{/* ── APPEAL SUCCESS ── */}
					{view === "appeal-success" && (
						<SuccessScreen
							title="Product Re-uploaded Successfully!"
							subtitle={"Congratulations!!! You have successfully re-uploaded your product\nYour product will be approved within the next 48 hours, and will be displayed on the marketplace."}
							onViewProduct={() => setView("listings")}
						/>
					)}

				</div>
			</section>
		</div>
	);
}