'use client'

import DashboardHeader from "@/app/components/DashboardHeader";
import { useState } from "react";

const tabs = ["Personal Information", "Shop/Business Information", "Notification Settings"];

function Field({ label, placeholder, hint, colSpan = 1 }: { label: string; placeholder: string; hint: string; colSpan: number }) {
	return (
		<div className={`flex flex-col ${colSpan === 2 ? "col-span-2" : ""}`}>
			<label className="text-[13px] text-gray-500 mb-2">{label}</label>
			<input
				type="text"
				className="text-[14px] p-3 outline-1 outline-gray-300 rounded-sm"
				placeholder={placeholder}
			/>
			{hint && <span className="text-[12px] text-gray-400 mt-1">{hint}</span>}
		</div>
	);
}

function Toggle({ label, enabled, onToggle }: { label: string; enabled: boolean; onToggle: () => void }) {
	return (
		<div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 last:border-b-0">
			<span className="text-[15px] font-semibold">{label}</span>
			<button
				onClick={onToggle}
				className={`relative w-14 h-7 rounded-full transition-colors duration-200 ${enabled ? "bg-green-700" : "bg-gray-300"}`}
			>
				<span
					className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${enabled ? "translate-x-7" : "translate-x-1"}`}
				/>
			</button>
		</div>
	);
}

function PersonalInfo() {
	return (
		<div className="grid grid-cols-2 gap-x-8 gap-y-6 mt-6">
			<Field label="First Name" placeholder="John" hint="Enter your legal first name" colSpan={1} />
			<Field label="Last Name" placeholder="Martins" hint="Enter your legal last name" colSpan={1} />
			<Field label="Email address" placeholder="john@gmail.com" hint="Enter your valid email address" colSpan={1} />
			<div className="flex flex-col">
				<label className="text-[13px] text-gray-500 mb-2">Nationality</label>
				<div className="flex items-center gap-2 text-[14px] p-3 outline-1 outline-gray-300 rounded-sm">
					<span>🇬🇭</span>
					<span className="text-gray-400">Ghana</span>
				</div>
				<span className="text-[12px] text-gray-400 mt-1">Select your nationality</span>
			</div>
			<div className="flex flex-col col-span-1">
				<label className="text-[13px] text-gray-500 mb-2">Phone Number</label>
				<div className="flex items-center gap-2 text-[14px] p-3 outline-1 outline-gray-300 rounded-sm">
					<span>🇬🇭</span>
					<span className="text-gray-400 border-r border-gray-300 pr-3">+233</span>
					<span className="text-gray-400">8038383992</span>
				</div>
				<span className="text-[12px] text-gray-400 mt-1">Enter a valid phone number</span>
			</div>
			<div className="col-span-2 mt-2">
				<button className="bg-[#6A1B9A] hover:bg-[#8646ad] text-white text-[15px] px-8 py-3 rounded-sm transition-colors cursor-pointer">
					Edit Profile
				</button>
			</div>
		</div>
	);
}

function ShopInfo() {
	return (
		<div className="grid grid-cols-2 gap-x-8 gap-y-6 mt-6">
			<Field label="Shop Name" placeholder="Plendify" hint="Enter a valid name" colSpan={0} />
			<Field label="Shop Category" placeholder="Fashion" hint="Select your most suitable category" colSpan={0} />
			<Field label="Sub Category" placeholder="Shoes" hint="Select your most suitable sub category" colSpan={0} />
			<Field label="Business Email Address" placeholder="johnmartins@gmail.com" hint="Enter a valid email address" colSpan={0} />
			<Field label="State/Province" placeholder="Lagos" hint="Enter a valid state/province" colSpan={0} />
			<Field label="City" placeholder="Eti-Osa" hint="Enter a valid city" colSpan={0} />
			<Field label="Address Line 1" placeholder="28 Deigo street" hint="Enter a valid address" colSpan={2} />
			<Field label="Zip/Postal Code" placeholder="7588993" hint="Enter a valid zip/postal code" colSpan={0} />
			<Field label="Tax ID (optional)" placeholder="N-774892" hint="Enter a valid tax ID" colSpan={0} />
			<div className="col-span-2 mt-2">
				<button className="bg-[#6A1B9A] hover:bg-[#8646ad] text-white text-[15px] px-8 py-3 rounded-sm transition-colors cursor-pointer">
					Save Changes
				</button>
			</div>
		</div>
	);
}

function NotificationSettings() {
	const [email, setEmail] = useState(false);
	const [inApp, setInApp] = useState(true);

	return (
		<div className="max-w-3xl mt-6">
			<div className="bg-gray-100 rounded-lg p-5">
				<p className="text-[15px] text-gray-700 mb-4">How would you like to be notified on Plendify?</p>
				<div className="bg-white rounded-md divide-y divide-gray-200">
					<Toggle label="Email Notifications" enabled={email} onToggle={() => setEmail(!email)} />
					<Toggle label="In-app Notifications" enabled={inApp} onToggle={() => setInApp(!inApp)} />
				</div>
			</div>
		</div>
	);
}

export default function ProfilePage() {
	const [activeTab, setActiveTab] = useState(0);

	return (
		<div>
			<DashboardHeader />

			<section className="mt-10 py-12 max-w-7xl border-t border-t-gray-300">
				<h1 className="text-[22px] font-bold mb-6">My Profile</h1>
				<div className='mt-14'>
					<div className="flex border-b border-gray-200">
						{tabs.map((tab, i) => (
							<button
								key={tab}
								onClick={() => setActiveTab(i)}
								className={`text-[15px] pb-3 mr-10 transition-colors border-b-2 -mb-px ${activeTab === i
									? "border-black text-black font-medium"
									: "border-transparent text-gray-400 hover:text-gray-600"
									}`}
							>
								{tab}
							</button>
						))}
					</div>

					{/* Tab Content */}
					{activeTab === 0 && <PersonalInfo />}
					{activeTab === 1 && <ShopInfo />}
					{activeTab === 2 && <NotificationSettings />}
				</div>
				{/* Tabs */}

			</section>
		</div>

	);
}