'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ResetPasswordPage() {
	const router = useRouter()
	const [code, setCode] = useState(['', '', '', '', '', ''])
	const [isResetting, setIsResetting] = useState(false)
	const [success, setSuccess] = useState(false)
	const inputRefs = useRef<(HTMLInputElement | null)[]>([])

	const handleChange = (index: number, value: string) => {
		if (value.length <= 1 && /^\d*$/.test(value)) {
			const newCode = [...code]
			newCode[index] = value
			setCode(newCode)

			// Auto-focus next input
			if (value && index < 5) {
				inputRefs.current[index + 1]?.focus()
			}
		}
	}

	const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Backspace' && !code[index] && index > 0) {
			inputRefs.current[index - 1]?.focus()
		}
	}

	const handleResetPassword = () => {
		setIsResetting(true)
		setSuccess(true)
	}

	// Redirect after 3 seconds when reset is successful
	useEffect(() => {
		if (success) {
			const timer = setTimeout(() => {
				router.push('/onboarding/success')
			}, 3000)

			return () => clearTimeout(timer)
		}
	}, [success, router])

	const isCodeComplete = code.every(digit => digit !== '')

	return (
		<section className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
			<div className='w-full mx-auto max-w-xl px-8'>
				<div className='bg-white py-16 px-12 rounded-xl border border-gray-200'>
					{/* Header */}
					<div className='text-center mb-12'>
						<h1 className="text-4xl font-extrabold mb-4">Reset Account Password</h1>
						<p className='text-gray-600'>A code was sent to your email address.</p>
						<p className='text-gray-600'>Input code below to reset password.</p>
					</div>

					{/* Success Message */}
					{success && (
						<div className='mb-6 p-3 bg-green-100 text-green-700 rounded-sm text-sm text-center'>
							✓ Password reset successful! Redirecting...
						</div>
					)}

					{/* Code Input Boxes */}
					<div className='flex justify-center gap-3 mb-6'>
						{code.map((digit, index) => (
							<input
								key={index}
								ref={(el) => { inputRefs.current[index] = el }}
								type="text"
								maxLength={1}
								value={digit}
								onChange={(e) => handleChange(index, e.target.value)}
								onKeyDown={(e) => handleKeyDown(index, e)}
								disabled={isResetting}
								className="w-16 h-20 text-center text-3xl border border-gray-300 rounded-lg outline-none focus:border-[#6A1B9A] focus:ring-2 focus:ring-[#6A1B9A]/20 disabled:bg-gray-100"
							/>
						))}
					</div>

					{/* Resend Code */}
					<div className='text-center mb-10'>
						<p className='text-gray-600 text-sm'>
							Did not receive code?{' '}
							<span className='text-[#6A1B9A] font-bold cursor-pointer'>Resend Code</span>
						</p>
					</div>

					{/* Buttons */}
					<div className='flex justify-center gap-4'>
						<Link
							href="/onboarding"
							className='border border-[#6A1B9A] text-[#6A1B9A] py-3 px-10 rounded-sm hover:bg-gray-50'>
							Back to Login
						</Link>
						<button
							onClick={handleResetPassword}
							disabled={!isCodeComplete || isResetting}
							className='bg-[#6A1B9A] hover:bg-[#8646ad] text-white py-3 px-10 rounded-sm disabled:bg-gray-400 disabled:cursor-not-allowed'>
							Reset Password
						</button>
					</div>
				</div>
			</div>
		</section>
	)
}