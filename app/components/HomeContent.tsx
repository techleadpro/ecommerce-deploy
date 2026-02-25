import Image from 'next/image';

import { Button } from "./Button"
import { IconGlobal } from "./IconGlobal"
import { IconGroup } from "./IconGroup"
import { IconTruck } from "./IconTruck"
import { FAQ } from './FAQ';
import { Form } from './Form';
import { IconLinkedIn } from './IconLinkedIn';
import { IconX } from './IconX';
import { IconWhatsApp } from './IconWhatsApp';
import { IconInstagram } from './IconInstagram';

export const HomeContent = () => {
	return (
		<>
			<section className='w-full mx-auto max-w-7xl px-16'>
				<div className="min-h-auto mx-auto mt-40 flex flex-col items-center gap-y-8">
					<div className="text-center">
						<p className="text-4xl font-extrabold">
							Expand Your Reach. Grow Your business.
						</p>
					</div>
					<div>
						<ul className="grid grid-cols-3 gap-x-4 h-fit [&>li]:h-auto [&>li]:py-9 [&>li]:px-6 [&>li]:rounded-lg [&>li>p]:text-gray-400">
							<li className="border border-gray-300">
								<div className="flex items-center gap-x-3 mb-4">
									<IconGroup />
									<span className="text-xl font-extrabold">Reach buyers Globally</span>
								</div>
								<p>
									Sell to customers in Europe, the USA and the Rest of the World, without needing international contacts or networks
								</p>
							</li>
							<li className="border border-gray-300">
								<div className="flex items-start gap-x-3 mb-4">
									<IconTruck />
									<span className="text-xl font-extrabold">Focus on your craft--we handle the logistics</span>
								</div>
								<p>
									From shipping to cross-border delivery.
								</p>
							</li>
							<li className="border border-gray-300">
								<div className="flex items-center gap-x-3 mb-4">
									<IconGlobal />
									<span className="text-xl font-extrabold">Earn from the global market</span>
								</div>
								<p>
									Unlock higher sales potential by selling beyond local markets--many sellers grow enough to reinvest and create new jobs.
								</p>
							</li>
						</ul>
					</div>
					<div>
						<Button label="Sign up for free" />
					</div>
				</div>
			</section>
			{/* ------------------------------------------------------------------------------------------------------------------------- */}
			<section className='w-full mx-auto max-w-7xl px-16'>
				<div className="min-h-auto mx-auto mt-40 flex flex-col items-center gap-y-8">
					<div className="text-center">
						<h1 className="text-4xl font-extrabold">
							How It Works.
						</h1>
					</div>
					<div>
						<ul className="grid grid-cols-3 gap-x-4 h-fit [&>li]:h-auto [&>li]:py-9 [&>li]:px-6 [&>li]:rounded-lg [&>li>p]:text-gray-400">
							<li className="border border-gray-300">
								<Image
									src="/payment-1.jpg"
									width={500}
									height={350}
									objectFit='cover'
									alt="" />
								<div className="flex items-center gap-x-3 mb-4">
									<IconGroup />
									<span className="text-xl font-extrabold">Reach buyers Globally</span>
								</div>
								<p>
									Sell to customers in Europe, the USA and the Rest of the World, without needing international contacts or networks
								</p>
							</li>
							<li className="border border-gray-300">
								<Image
									src="/payment-1.jpg"
									width={500}
									height={350}
									objectFit='cover'
									alt="" />
								<div className="flex items-start gap-x-3 mb-4">
									<IconTruck />
									<span className="text-xl font-extrabold">Focus on your craft--we handle the logistics</span>
								</div>
								<p>
									From shipping to cross-border delivery.
								</p>
							</li>
							<li className="border border-gray-300">
								<Image
									src="/payment-1.jpg"
									width={500}
									height={350}
									objectFit='cover'
									alt="" />
								<div className="flex items-center gap-x-3 mb-4">
									<IconGlobal />
									<span className="text-xl font-extrabold">Earn from the global market</span>
								</div>
								<p>
									Unlock higher sales potential by selling beyond local markets--many sellers grow enough to reinvest and create new jobs.
								</p>
							</li>
						</ul>
					</div>
					<div>
						<Button label="Get started" />
					</div>
				</div>
			</section>
			{/* ------------------------------------------------------------------------------------------------------------------------- */}
			<section className='w-full mx-auto max-w-7xl px-16'>
				<div className="min-h-auto mx-auto mt-40 flex items-center gap-x-8">
					<div className='flex flex-col gap-y-16'>
						<div>
							<h1 className="text-5xl font-extrabold">Grow Your Business</h1>
							<p className='text-gray-400 mt-4'>Reach buyers around the world and expand your business beyond borders.</p>
						</div>
						<div>
							<Button label="Create a free account." />
						</div>
					</div>
					<Image
						src="/blocks.jpg"
						width={584}
						height={585}
						style={{ borderRadius: '16px' }}
						alt="" />
				</div>
			</section>
			{/* ------------------------------------------------------------------------------------------------------------------------- */}
			<section className='w-full mx-auto max-w-7xl px-16'>
				<div className="w-full min-h-auto mx-auto mt-40 flex flex-col items-center gap-y-8">
					<div className="text-center mb-12">
						<h1 className="text-4xl font-extrabold">
							Your Sales Are Safe.
						</h1>
						<p className='text-gray-400 mt-4'>We protect your business so you can focus on growth.</p>
					</div>
					<div>
						<ul className="w-full grid grid-cols-4 gap-x-7 justify-between h-fit [&>li]:h-auto [&>li]:py-6 [&>li]:px-4 [&>li]:rounded-lg [&>li>p]:text-gray-400">
							<li className="border border-gray-200">
								<div className="flex items-center gap-x-3">
									<IconGroup />
									<span className="text-xl">Quick Deposits</span>
								</div>
							</li>
							<li className="border border-gray-200">
								<div className="flex items-center gap-x-3">
									<IconTruck />
									<span className="text-xl">Secure transactions</span>
								</div>
							</li>
							<li className="border border-gray-200">
								<div className="flex items-center gap-x-3">
									<IconGlobal />
									<span className="text-xl">Seller protection</span>
								</div>
							</li>
							<li className="border border-gray-200">
								<div className="flex items-center gap-x-3">
									<IconGlobal />
									<span className="text-xl">No set-up fee</span>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</section>
			{/* ------------------------------------------------------------------------------------------------------------------------- */}
			<section className='w-full mx-auto max-w-7xl px-16'>
				<div className="w-full min-h-auto mx-auto mt-40 flex flex-col items-center gap-y-8">
					<div className="text-center mb-12">
						<h1 className="text-4xl font-extrabold">
							Don't Take Our Word For It
						</h1>
						<p className='text-gray-400 mt-4'>See what other sellers are saying about Plendify.</p>
					</div>
					<Image
						src="/reviews.jpg"
						width={1269}
						height={382}
						alt="" />
				</div>
			</section>
			{/* ------------------------------------------------------------------------------------------------------------------------- */}
			<Form />
			{/* ------------------------------------------------------------------------------------------------------------------------- */}
			<FAQ />
			{/* ------------------------------------------------------------------------------------------------------------------------- */}
			<section className='py-36'>
				<div className="bg-[#FFFEFA] max-w-7xl mx-auto py-24 px-18 border border-gray-200 rounded-lg">
					<h1 className="text-5xl font-extrabold">Start Selling</h1>
					<p className='text-xl my-8'>Join our growing community of sellers and reach millions of customers worldwide.</p>
					<Button label='Start Selling' />
				</div>
			</section>
			{/* ------------------------------------------------------------------------------------------------------------------------- */}
			<section className='bg-[#FBF6FD]'>
				<div className="max-w-7xl mx-auto py-16">
					<h1 className="text-4xl font-extrabold">Get exclusive offers and discounts</h1>
					<p className='text-xl my-6'>
						Subscribe to our newsletter and be the first to know about new arrivals,<br />
						special deals and members-only promotions.
					</p>
					<div>
						<input type="text" className="w-90 text-[14px] bg-white p-3 outline-1 outline-gray-400 rounded-l-sm"
							placeholder="Input email address" />
						<Button label='Subscribe' />
					</div>
				</div>
			</section>
			<section>
				<div className="max-w-7xl mx-auto py-16">
					<div className='flex gap-x-34'>
						<div>
							<h2 className='text-2xl font-extrabold mb-5'>Company</h2>
							<ul className='*:cursor-pointer *:mb-4 [&>li]:text-lg'>
								<li>Our Impact</li>
								<li>Partners</li>
								<li>Give a Gift Today</li>
							</ul>
						</div>
						<div>
							<h2 className='text-2xl font-extrabold mb-5'>Marketplace</h2>
							<ul className='*:cursor-pointer *:mb-4 [&>li]:text-lg'>
								<li>Create Seller Account</li>
								<li>Free Shipping Calculator</li>
							</ul>
						</div>
						<div>
							<h2 className='text-2xl font-extrabold mb-5'>Policies</h2>
							<ul className='*:cursor-pointer *:mb-4 [&>li]:text-lg'>
								<li>Terms & Conditions</li>
								<li>Privacy Policy</li>
								<li>Shipping & Returns</li>
								<li>Refund Policy</li>
								<li>Prohibited Items Policy</li>
							</ul>
						</div>
						<div>
							<h2 className='text-2xl font-extrabold mb-5'>Contact Us</h2>
							<ul className='*:cursor-pointer *:mb-4 [&>li]:text-lg'>
								<li>Digital Address:</li>
								<li>Address: 8 Garden Road, East Legon,<br />Accra, Ghana.</li>
								<ul className='flex gap-x-8'>
									<li><IconLinkedIn /></li>
									<li><IconX /></li>
									<li><IconWhatsApp /></li>
									<li><IconInstagram /></li>
								</ul>
							</ul>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}