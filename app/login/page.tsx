'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function OnboardingPage() {
	const router = useRouter()
	const [activeTab, setActiveTab] = useState<'seller' | 'shopper'>('seller');
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [success, setSuccess] = useState(false)

	const handleLogin = () => {
		setError('')
		setSuccess(false)

		if (password.length < 8) {
			setError('Password must be at least 8 characters long.')
		} else if (password === 'wrongpass') {
			setError('Incorrect password. Please try again.')
		} else if (email && password) {
			setSuccess(true)
		}
	}

	// Redirect after 3 seconds when login is successful
	useEffect(() => {
		if (success) {
			const timer = setTimeout(() => {
				router.push('/')
			}, 3000)

			return () => clearTimeout(timer)
		}
	}, [success, router])

	const isValid = email && password && password !== 'wrongpass'

	return (
		<section className="h-auto">
			<div className='w-full mx-auto max-w-7xl px-16'>
				<div className='w-180 py-20 mx-auto border border-gray-300 rounded-xl'>
					<h1 className="text-4xl font-extrabold text-center">Welcome Back!</h1>
					<p className='mt-3 text-center'>Let us get you back into your dashboard.</p>
					<div className='flex justify-center mt-8'>
						<button
							onClick={() => setActiveTab('seller')}
							className={`py-2 px-12 text-xl border-b ${activeTab === 'seller'
								? 'border-b-gray-500 text-black'
								: 'border-b-gray-300 text-gray-400'
								}`}>
							Seller's Account
						</button>
						<button
							onClick={() => setActiveTab('shopper')}
							className={`py-2 px-12 text-xl border-b ${activeTab === 'shopper'
								? 'border-b-gray-500 text-black'
								: 'border-b-gray-300 text-gray-400'
								}`}>
							Shopper's Account
						</button>
					</div>

					<div className='w-full max-w-md mx-auto flex flex-col mt-18'>
						{success && (
							<div className='mb-4 p-3 bg-green-100 text-green-700 rounded-sm text-sm text-center'>
								✓ Login successful! Redirecting to homepage...
							</div>
						)}
						{error && (
							<div className='mb-4 p-3 bg-red-100 text-red-700 rounded-sm text-sm text-center'>
								{error}
							</div>
						)}

						<div className='flex flex-col mb-8'>
							<label className='text-[13px] text-gray-500 mb-2'>Email Address</label>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="text-[14px] p-3 outline-1 outline-gray-300 rounded-sm w-full"
								placeholder="Enter email" />
						</div>
						<div className='flex flex-col'>
							<label className='text-[13px] text-gray-500 mb-2'>Password</label>
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="text-[14px] p-3 outline-1 outline-gray-300 rounded-sm w-full"
								placeholder="Enter password" />
						</div>
						<div className='flex justify-end mt-6'>
							<Link href="/reset-password"><p className='text-sm font-bold text-[#6A1B9A] cursor-pointer'>Forget Password?</p></Link>
						</div>

						<div className='w-full justify-items-center mt-14'>
							<button
								onClick={handleLogin}
								disabled={!email || !password || success}
								className="bg-[#6A1B9A] hover:bg-[#8646ad] text-white gap-x-2 py-2 px-26 rounded-sm cursor-pointer flex disabled:bg-gray-400 disabled:cursor-not-allowed">
								<span>Login</span>
							</button>
							<p className='mt-4'>Don't have an account? <span className='text-sm font-bold text-[#6A1B9A] cursor-pointer'>Create Yours Here</span></p>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}