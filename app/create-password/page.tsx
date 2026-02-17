'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateNewPasswordPage() {
	const router = useRouter()
	const [newPassword, setNewPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [showNewPassword, setShowNewPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)

	// Validation functions
	const hasCapital = (password: string) => /[A-Z]/.test(password)
	const hasSmall = (password: string) => /[a-z]/.test(password)
	const hasNumber = (password: string) => /[0-9]/.test(password)
	const hasSymbol = (password: string) => /[!@#$%^&*(),.?":{}|<>]/.test(password)
	const isLongEnough = (password: string) => password.length > 8
	const passwordsMatch = newPassword === confirmPassword && confirmPassword !== ''

	const isValidPassword = hasCapital(newPassword) &&
		hasSmall(newPassword) &&
		hasNumber(newPassword) &&
		hasSymbol(newPassword) &&
		isLongEnough(newPassword) &&
		passwordsMatch

	const handleCreatePassword = () => {
		if (isValidPassword) {
			router.push('/success')
		}
	}

	return (
		<section className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
			<div className='w-full mx-auto max-w-7xl px-16'>
				<div className='w-180 bg-white py-16 px-12 rounded-xl border border-gray-200'>
					{/* Header */}
					<div className='text-center mb-12'>
						<h1 className="text-4xl font-extrabold mb-3">Create New Password</h1>
						<p className='text-gray-600'>Create a new password</p>
					</div>

					{/* Form */}
					<div className='max-w-md mx-auto'>
						{/* Create New Password */}
						<div className='flex flex-col mb-6'>
							<label className='text-[13px] text-gray-600 mb-2'>Create New Password</label>
							<div className='relative'>
								<input
									type={showNewPassword ? "text" : "password"}
									value={newPassword}
									onChange={(e) => setNewPassword(e.target.value)}
									className="text-[14px] p-3 border border-gray-300 rounded-sm w-full outline-none focus:border-gray-400 pr-12"
									placeholder="Enter password" />
								<button
									type="button"
									onClick={() => setShowNewPassword(!showNewPassword)}
									className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
										<path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
										<path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
									</svg>
								</button>
							</div>
							<div className='mt-2 text-[11px]'>
								<p className='text-gray-600 mb-1'>Password must align with the following:</p>
								<p className={hasCapital(newPassword) ? 'text-green-600' : 'text-gray-600'}>
									{hasCapital(newPassword) ? '✓' : '○'} Capital Letter
								</p>
								<p className={hasSmall(newPassword) ? 'text-green-600' : 'text-gray-600'}>
									{hasSmall(newPassword) ? '✓' : '○'} Small Letter
								</p>
								<p className={hasNumber(newPassword) ? 'text-green-600' : 'text-gray-600'}>
									{hasNumber(newPassword) ? '✓' : '○'} Number
								</p>
								<p className={hasSymbol(newPassword) ? 'text-green-600' : 'text-gray-600'}>
									{hasSymbol(newPassword) ? '✓' : '○'} Symbol
								</p>
								<p className={isLongEnough(newPassword) ? 'text-green-600' : 'text-gray-600'}>
									{isLongEnough(newPassword) ? '✓' : '○'} More than 8 character long
								</p>
							</div>
						</div>

						{/* Confirm New Password */}
						<div className='flex flex-col mb-10'>
							<label className='text-[13px] text-gray-600 mb-2'>Confirm New Password</label>
							<div className='relative'>
								<input
									type={showConfirmPassword ? "text" : "password"}
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									className="text-[14px] p-3 border border-gray-300 rounded-sm w-full outline-none focus:border-gray-400 pr-12"
									placeholder="Enter password" />
								<button
									type="button"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
										<path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
										<path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
									</svg>
								</button>
							</div>
							<div className='mt-2 text-[11px]'>
								{confirmPassword && (
									<p className={passwordsMatch ? 'text-green-600' : 'text-red-600'}>
										{passwordsMatch ? '✓ Passwords match' : '✗ Passwords do not match'}
									</p>
								)}
							</div>
						</div>

						{/* Button */}
						<div className='flex justify-center'>
							<button
								onClick={handleCreatePassword}
								disabled={!isValidPassword}
								className='bg-[#6A1B9A] hover:bg-[#8646ad] text-white py-3 px-16 rounded-sm disabled:bg-gray-400 disabled:cursor-not-allowed'>
								Create Password
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}