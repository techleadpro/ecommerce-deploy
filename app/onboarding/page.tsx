'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function CreateSellerAccountPage() {
	const [activeTab, setActiveTab] = useState<'personal' | 'business'>('business')

	return (
		<section className="min-h-screen bg-gray-50 py-12">
			<div className='w-full mx-auto max-w-7xl px-16'>
				<div className='w-180 bg-white py-16 px-12 rounded-xl'>
					{/* Header */}
					<div className='text-center mb-12'>
						<h1 className="text-4xl font-extrabold mb-3">Create Your Seller's Account</h1>
						<p className='text-gray-600'>Let's help you personalize your shop</p>
						<p className='text-gray-500 text-sm'>You can always edit and add more information later.</p>
					</div>

					{/* Tabs */}
					<div className='flex justify-center gap-16 mb-8'>
						<button
							onClick={() => setActiveTab('personal')}
							className={`pb-2 text-lg ${activeTab === 'personal'
								? 'text-black font-medium'
								: 'text-gray-500'
								}`}>
							Personal Information
						</button>
						<button
							onClick={() => setActiveTab('business')}
							className={`pb-2 text-lg ${activeTab === 'business'
								? 'text-[#D4A017] font-medium'
								: 'text-gray-500'
								}`}>
							Shop/Business Information
						</button>
					</div>

					{/* Progress Bar */}
					<div className='w-full h-2 bg-gray-200 rounded-full mb-12'>
						<div className='w-full h-full bg-[#D4A017] rounded-full'></div>
					</div>

					{/* Form */}
					<div className='max-w-3xl mx-auto'>
						{/* Row 1 */}
						<div className='grid grid-cols-2 gap-6 mb-6'>
							<div className='flex flex-col'>
								<label className='text-[13px] text-gray-600 mb-2'>Shop Name</label>
								<input
									type="text"
									className="text-[14px] p-3 border border-gray-300 rounded-sm w-full outline-none focus:border-gray-400"
									placeholder="" />
								<p className='text-[11px] text-gray-500 mt-1'>Enter a valid name</p>
							</div>
							<div className='flex flex-col'>
								<label className='text-[13px] text-gray-600 mb-2'>Shop Category</label>
								<select
									className="text-[14px] p-3 border border-gray-300 rounded-sm w-full outline-none focus:border-gray-400 bg-white">
									<option>Fashion</option>
									<option>Electronics</option>
									<option>Home & Garden</option>
								</select>
								<p className='text-[11px] text-gray-500 mt-1'>Select your most suitable category</p>
							</div>
						</div>

						{/* Row 2 */}
						<div className='grid grid-cols-2 gap-6 mb-6'>
							<div className='flex flex-col'>
								<label className='text-[13px] text-gray-600 mb-2'>Sub Category</label>
								<select
									className="text-[14px] p-3 border border-gray-300 rounded-sm w-full outline-none focus:border-gray-400 bg-white">
									<option>Shoes</option>
									<option>Clothing</option>
									<option>Accessories</option>
								</select>
								<p className='text-[11px] text-gray-500 mt-1'>Select your most suitable sub category</p>
							</div>
							<div className='flex flex-col'>
								<label className='text-[13px] text-gray-600 mb-2'>Business Email Address</label>
								<input
									type="email"
									className="text-[14px] p-3 border border-gray-300 rounded-sm w-full outline-none focus:border-gray-400"
									placeholder="johnmartins@gmail.com" />
								<p className='text-[11px] text-gray-500 mt-1'>Enter a valid email address</p>
							</div>
						</div>

						{/* Row 3 */}
						<div className='grid grid-cols-2 gap-6 mb-6'>
							<div className='flex flex-col'>
								<label className='text-[13px] text-gray-600 mb-2'>State/Province</label>
								<input
									type="text"
									className="text-[14px] p-3 border border-gray-300 rounded-sm w-full outline-none focus:border-gray-400"
									placeholder="Lagos" />
								<p className='text-[11px] text-gray-500 mt-1'>Enter a valid state/province</p>
							</div>
							<div className='flex flex-col'>
								<label className='text-[13px] text-gray-600 mb-2'>City</label>
								<input
									type="text"
									className="text-[14px] p-3 border border-gray-300 rounded-sm w-full outline-none focus:border-gray-400"
									placeholder="Eti-Osa" />
								<p className='text-[11px] text-gray-500 mt-1'>Enter a valid city</p>
							</div>
						</div>

						{/* Address Line 1 */}
						<div className='flex flex-col mb-6'>
							<label className='text-[13px] text-gray-600 mb-2'>Address Line 1</label>
							<input
								type="text"
								className="text-[14px] p-3 border border-gray-300 rounded-sm w-full outline-none focus:border-gray-400"
								placeholder="28 Deigo street" />
							<p className='text-[11px] text-gray-500 mt-1'>Enter a valid address</p>
						</div>

						{/* Address Line 2 */}
						<div className='flex flex-col mb-6'>
							<label className='text-[13px] text-gray-600 mb-2'>Address Line 2 (Optional)</label>
							<input
								type="text"
								className="text-[14px] p-3 border border-gray-300 rounded-sm w-full outline-none focus:border-gray-400"
								placeholder="28 Deigo street" />
							<p className='text-[11px] text-gray-500 mt-1'>Enter a valid address</p>
						</div>

						{/* Row 4 */}
						<div className='grid grid-cols-2 gap-6 mb-12'>
							<div className='flex flex-col'>
								<label className='text-[13px] text-gray-600 mb-2'>Zip/Postal Code</label>
								<input
									type="text"
									className="text-[14px] p-3 border border-gray-300 rounded-sm w-full outline-none focus:border-gray-400"
									placeholder="7588993" />
								<p className='text-[11px] text-gray-500 mt-1'>Enter a valid zip/postal code</p>
							</div>
							<div className='flex flex-col'>
								<label className='text-[13px] text-gray-600 mb-2'>Tax ID (optional)</label>
								<input
									type="text"
									className="text-[14px] p-3 border border-gray-300 rounded-sm w-full outline-none focus:border-gray-400"
									placeholder="N-774892" />
								<p className='text-[11px] text-gray-500 mt-1'>Enter a valid tax ID</p>
							</div>
						</div>

						{/* Buttons */}
						<div className='flex justify-center gap-4'>
							<Link href="/">
								<button className='border border-gray-400 text-gray-700 py-3 px-12 rounded-sm hover:bg-gray-50'>
									Go to Previous Page
								</button>
							</Link>
							<Link href="/onboarding/create-password">
								<button className='bg-[#6A1B9A] hover:bg-[#8646ad] text-white py-3 px-12 rounded-sm'>
									Save and Continue
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}