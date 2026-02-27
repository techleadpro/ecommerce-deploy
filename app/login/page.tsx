'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type View = 'login' | 'reset-code' | 'reset-password'
type AccountTab = 'seller' | 'shopper'

const PASSWORD_RULES = [
	{ label: 'Capital Letter', test: (p: string) => /[A-Z]/.test(p) },
	{ label: 'Small Letter', test: (p: string) => /[a-z]/.test(p) },
	{ label: 'Number', test: (p: string) => /[0-9]/.test(p) },
	{ label: 'Symbol', test: (p: string) => /[^A-Za-z0-9]/.test(p) },
	{ label: 'More than 8 characters', test: (p: string) => p.length > 8 },
]

// ---- Shared UI ----
function Card({ children, wide }: { children: React.ReactNode; wide?: boolean }) {
	return (
		<section className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-16">
			<div className={`bg-white border border-gray-200 rounded-xl py-14 px-10 ${wide ? 'w-full max-w-3xl' : 'w-full max-w-xl'}`}>
				{children}
			</div>
		</section>
	)
}

function PasswordInput({ label, value, onChange, placeholder = 'Enter password', error }: {
	label: string; value: string; onChange: (v: string) => void;
	placeholder?: string; error?: string;
}) {
	const [show, setShow] = useState(false)
	return (
		<div className="flex flex-col">
			<label className="text-[13px] text-gray-500 mb-2">{label}</label>
			<div className="relative">
				<input
					type={show ? 'text' : 'password'}
					value={value}
					onChange={e => onChange(e.target.value)}
					placeholder={placeholder}
					className={`text-[14px] p-3 outline outline-1 rounded-sm w-full pr-10 ${error ? 'outline-red-400' : 'outline-gray-300'}`}
				/>
				<button type="button" onClick={() => setShow(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
					<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
						<path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
						<path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
					</svg>
				</button>
			</div>
			{error
				? <p className="text-[12px] text-red-500 mt-1">{error}</p>
				: <p className="text-[11px] text-gray-400 mt-1">Enter valid password</p>
			}
		</div>
	)
}

function PasswordRules({ password }: { password: string }) {
	return (
		<div className="mt-1">
			<p className="text-[11px] text-gray-400">Password must align with the following;</p>
			{PASSWORD_RULES.map(rule => (
				<p key={rule.label} className={`text-[11px] ${rule.test(password) ? 'text-green-600' : 'text-gray-400'}`}>
					{rule.label}
				</p>
			))}
		</div>
	)
}

function AccountTabs({ active, onChange }: { active: AccountTab; onChange: (t: AccountTab) => void }) {
	return (
		<div className="flex justify-center mt-8">
			{(['seller', 'shopper'] as AccountTab[]).map(t => (
				<button
					key={t}
					onClick={() => onChange(t)}
					className={`py-2 px-12 text-xl border-b transition-colors ${active === t ? 'border-b-gray-600 text-black' : 'border-b-gray-200 text-gray-400'}`}
				>
					{t === 'seller' ? "Seller's Account" : "Shopper's Account"}
				</button>
			))}
		</div>
	)
}

// ---- Main Page ----
export default function LoginPage() {
	const router = useRouter()
	const [view, setView] = useState<View>('login')
	const [activeTab, setActiveTab] = useState<AccountTab>('seller')

	// Login state
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loginError, setLoginError] = useState('')
	const [loginSuccess, setLoginSuccess] = useState(false)

	// Reset OTP state
	const [otpValues, setOtpValues] = useState(['', '', '', '', '', ''])
	const [otpError, setOtpError] = useState(false)
	const otpRefs = useRef<(HTMLInputElement | null)[]>([])

	// New password state
	const [newPassword, setNewPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const handleLogin = () => {
		setLoginError('')
		if (!email || !password) return
		if (password === 'wrongpass') {
			setLoginError('The password inputted is incorrect')
			return
		}
		localStorage.setItem('auth_token', 'logged_in')
		setLoginSuccess(true)
		setTimeout(() => router.push('/dashboard'), 1500)
	}

	const handleOtpChange = (i: number, val: string) => {
		if (!/^\d?$/.test(val)) return
		const next = [...otpValues]
		next[i] = val
		setOtpValues(next)
		setOtpError(false)
		if (val && i < 5) otpRefs.current[i + 1]?.focus()
	}

	const handleOtpKeyDown = (i: number, e: React.KeyboardEvent) => {
		if (e.key === 'Backspace' && !otpValues[i] && i > 0) otpRefs.current[i - 1]?.focus()
	}

	const handleResetPassword = () => {
		if (otpValues.join('') !== '123456') { setOtpError(true); return }
		setView('reset-password')
	}

	// ── Login view ──
	if (view === 'login') return (
		<Card>
			<h1 className="text-3xl font-extrabold text-center text-[#1a1040]">Welcome Back!</h1>
			<p className="mt-2 text-center text-gray-500 text-[14px]">Let us get you back into your dashboard.</p>

			<AccountTabs active={activeTab} onChange={setActiveTab} />

			<div className="w-full max-w-sm mx-auto flex flex-col mt-10 gap-5">
				{loginSuccess && (
					<div className="p-3 bg-green-100 text-green-700 rounded-sm text-[13px] text-center">
						✓ Login successful! Redirecting...
					</div>
				)}

				<div className="flex flex-col">
					<label className="text-[13px] text-gray-500 mb-2">Email Address</label>
					<input
						type="email"
						value={email}
						onChange={e => setEmail(e.target.value)}
						placeholder="Enter email"
						className="text-[14px] p-3 outline outline-1 outline-gray-300 rounded-sm w-full"
					/>
					<span className="text-[11px] text-gray-400 mt-1">Enter a valid email address</span>
				</div>

				<PasswordInput
					label="Password"
					value={password}
					onChange={p => { setPassword(p); setLoginError('') }}
					error={loginError}
				/>

				<div className="flex justify-end">
					<button onClick={() => setView('reset-code')} className="text-[13px] font-bold text-[#6A1B9A]">
						Forgot Password?
					</button>
				</div>

				<button
					onClick={handleLogin}
					disabled={!email || !password || loginSuccess}
					className="w-full bg-[#6A1B9A] hover:bg-[#8646ad] disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-sm text-[14px] transition-colors mt-2"
				>
					Login
				</button>

				<p className="text-center text-[13px]">
					Don't have an account?{' '}
					<Link href="/create-profile" className="font-bold text-[#6A1B9A]">
						Create Yours Here
					</Link>
				</p>
			</div>
		</Card>
	)

	// ── Reset code (OTP) view ──
	if (view === 'reset-code') return (
		<Card>
			<h1 className="text-3xl font-extrabold text-center text-[#1a1040]">Reset Account Password</h1>
			<p className="mt-2 text-center text-gray-500 text-[14px]">
				A code was sent to your email address.<br />Input code below to reset password.
			</p>

			{otpError && <p className="text-red-500 text-[13px] text-center mt-4">You inputted an incorrect code.</p>}

			<div className="flex justify-center gap-3 mt-6">
				{otpValues.map((v, i) => (
					<input
						key={i}
						ref={el => { otpRefs.current[i] = el }}
						type="text"
						inputMode="numeric"
						maxLength={1}
						value={v}
						onChange={e => handleOtpChange(i, e.target.value)}
						onKeyDown={e => handleOtpKeyDown(i, e)}
						className={`w-14 h-16 text-center text-[20px] border rounded-lg outline-none focus:border-purple-500 transition-colors ${otpError ? 'border-red-400 text-red-500' : 'border-gray-300'}`}
					/>
				))}
			</div>

			<p className="text-center text-[13px] text-gray-500 mt-4">
				Did not receive code?{' '}
				<button onClick={() => setOtpValues(['', '', '', '', '', ''])} className="font-bold text-[#6A1B9A]">
					Resend Code
				</button>
			</p>

			<div className="flex gap-4 mt-8">
				<button onClick={() => setView('login')} className="flex-1 border border-purple-700 text-purple-700 hover:bg-purple-50 py-3 rounded-sm text-[14px] transition-colors">
					Back to Login
				</button>
				<button onClick={handleResetPassword} className="flex-1 bg-[#6A1B9A] hover:bg-[#8646ad] text-white py-3 rounded-sm text-[14px] transition-colors">
					Reset Password
				</button>
			</div>
			<p className="text-center text-[12px] text-gray-400 mt-3">(Use code 123456 to proceed)</p>
		</Card>
	)

	// ── Create new password view ──
	if (view === 'reset-password') return (
		<Card>
			<h1 className="text-3xl font-extrabold text-center text-[#1a1040]">Create New Password</h1>
			<p className="mt-2 text-center text-gray-500 text-[14px]">Create a new password</p>

			<div className="w-full max-w-sm mx-auto flex flex-col mt-10 gap-5">
				<div>
					<PasswordInput label="Create New Password" value={newPassword} onChange={setNewPassword} />
					<PasswordRules password={newPassword} />
				</div>
				<div>
					<PasswordInput label="Confirm New Password" value={confirmPassword} onChange={setConfirmPassword} />
					<PasswordRules password={confirmPassword} />
				</div>
				<button
					onClick={() => setView('login')}
					disabled={!newPassword || !confirmPassword || newPassword !== confirmPassword}
					className="w-full bg-[#6A1B9A] hover:bg-[#8646ad] disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-sm text-[14px] transition-colors mt-4"
				>
					Create Password
				</button>
			</div>
		</Card>
	)

	return null
}