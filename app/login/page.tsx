'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

// ---- Types ----
type View = 'login' | 'register-personal' | 'register-business' | 'register-success' | 'reset-code' | 'reset-password'
type AccountTab = 'seller' | 'shopper'

const PASSWORD_RULES = [
	{ label: 'Capital Letter', test: (p: string) => /[A-Z]/.test(p) },
	{ label: 'Small Letter', test: (p: string) => /[a-z]/.test(p) },
	{ label: 'Number', test: (p: string) => /[0-9]/.test(p) },
	{ label: 'Symbol', test: (p: string) => /[^A-Za-z0-9]/.test(p) },
	{ label: 'More than 8 characters', test: (p: string) => p.length > 8 },
]

// ---- Shared Components ----
function PasswordInput({ label, value, onChange, placeholder = 'Enter password' }: {
	label: string; value: string; onChange: (v: string) => void; placeholder?: string
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
					className="text-[14px] p-3 outline-1 outline-gray-300 rounded-sm w-full pr-10"
				/>
				<button type="button" onClick={() => setShow(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
					{show ? (
						<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
					) : (
						<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
					)}
				</button>
			</div>
		</div>
	)
}

function PasswordRules({ password, colored }: { password: string; colored?: boolean }) {
	return (
		<div className="mt-1">
			<p className={`text-[11px] ${colored ? 'text-yellow-600' : 'text-gray-400'}`}>Password must align with the following;</p>
			{PASSWORD_RULES.map(rule => (
				<p key={rule.label} className={`text-[11px] ${colored ? (rule.test(password) ? 'text-green-600' : 'text-yellow-600') : 'text-gray-400'}`}>
					{rule.label}
				</p>
			))}
		</div>
	)
}

function Field({ label, placeholder, hint, type = 'text', value, onChange }: {
	label: string; placeholder: string; hint?: string; type?: string;
	value?: string; onChange?: (v: string) => void
}) {
	return (
		<div className="flex flex-col">
			<label className="text-[13px] text-gray-500 mb-2">{label}</label>
			<input
				type={type}
				value={value ?? ''}
				onChange={e => onChange?.(e.target.value)}
				placeholder={placeholder}
				className="text-[14px] p-3 outline-1 outline-gray-300 rounded-sm w-full"
			/>
			{hint && <span className="text-[11px] text-gray-400 mt-1">{hint}</span>}
		</div>
	)
}

function SelectField({ label, placeholder, hint, options }: {
	label: string; placeholder: string; hint?: string; options?: string[]
}) {
	return (
		<div className="flex flex-col">
			<label className="text-[13px] text-gray-500 mb-2">{label}</label>
			<div className="relative">
				<select className="w-full appearance-none text-[14px] p-3 outline-1 outline-gray-300 rounded-sm bg-white pr-8 text-gray-500">
					<option>{placeholder}</option>
					{options?.map(o => <option key={o}>{o}</option>)}
				</select>
				<svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
			</div>
			{hint && <span className="text-[11px] text-gray-400 mt-1">{hint}</span>}
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

function ProgressBar({ step }: { step: 1 | 2 }) {
	return (
		<div className="w-full h-2 bg-yellow-100 rounded-full mt-4 mb-8">
			<div className={`h-2 rounded-full transition-all duration-500 ${step === 2 ? 'bg-green-500 w-full' : 'bg-yellow-500 w-2/5'}`} />
		</div>
	)
}

function RegisterTabs({ step }: { step: 1 | 2 }) {
	return (
		<div className="flex justify-center mt-6">
			{['Personal Information', 'Shop/Business Information'].map((label, i) => (
				<button key={label} className={`py-2 px-10 text-[15px] border-b transition-colors ${i + 1 === step ? 'border-b-yellow-500 text-yellow-600' : 'border-b-gray-200 text-gray-400'}`}>
					{label}
				</button>
			))}
		</div>
	)
}

// ── Card wrapper ──
function Card({ children, wide }: { children: React.ReactNode; wide?: boolean }) {
	return (
		<section className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-16">
			<div className={`bg-white border border-gray-200 rounded-xl py-14 px-10 ${wide ? 'w-full max-w-3xl' : 'w-full max-w-xl'}`}>
				{children}
			</div>
		</section>
	);
}

// ---- Main Page ----
export default function OnboardingPage() {
	const router = useRouter()
	const [view, setView] = useState<View>('login')
	const [activeTab, setActiveTab] = useState<AccountTab>('seller')

	// Login state
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loginError, setLoginError] = useState('')
	const [loginSuccess, setLoginSuccess] = useState(false)

	// Reset state
	const [otpValues, setOtpValues] = useState(['', '', '', '', '', ''])
	const [otpError, setOtpError] = useState(false)
	const otpRefs = useRef<(HTMLInputElement | null)[]>([])

	// New password state
	const [newPassword, setNewPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	// Register personal state
	const [regPassword, setRegPassword] = useState('')

	// ── Login ──
	const handleLogin = () => {
		setLoginError('')
		if (!email || !password) return
		// Simulate wrong password
		if (password === 'wrongpass') {
			setLoginError('The password inputted is incorrect')
			return
		}
		setLoginSuccess(true)
		setTimeout(() => router.push('/dashboard'), 1500)
	}

	// ── OTP input handling ──
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
		const code = otpValues.join('')
		if (code !== '123456') { setOtpError(true); return }
		setView('reset-password')
	}

	// ══════════════════════════════════════════
	// VIEW: LOGIN
	// ══════════════════════════════════════════
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

				<Field label="Email Address" placeholder="Enter email" type="email" hint="Enter a valid email address" value={email} onChange={setEmail} />

				<div>
					<PasswordInput label="Password" value={password} onChange={p => { setPassword(p); setLoginError('') }} />
					{loginError
						? <p className="text-[12px] text-red-500 mt-1">{loginError}</p>
						: <p className="text-[11px] text-gray-400 mt-1">Enter valid password</p>
					}
				</div>

				<div className="flex justify-end">
					<button onClick={() => setView('reset-code')} className="text-[13px] font-bold text-[#6A1B9A]">Forgot Password?</button>
				</div>

				<button
					onClick={handleLogin}
					disabled={!email || !password || loginSuccess}
					className="w-full bg-[#6A1B9A] hover:bg-[#8646ad] disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-sm text-[14px] transition-colors mt-4"
				>
					Login
				</button>

				<p className="text-center text-[13px] mt-2">
					Don't have an account?{' '}
					<button onClick={() => setView('register-personal')} className="font-bold text-[#6A1B9A]">Create Yours Here</button>
				</p>
			</div>
		</Card>
	)

	// ══════════════════════════════════════════
	// VIEW: RESET CODE (OTP)
	// ══════════════════════════════════════════
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
				<button onClick={() => setOtpValues(['', '', '', '', '', ''])} className="font-bold text-[#6A1B9A]">Resend Code</button>
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

	// ══════════════════════════════════════════
	// VIEW: CREATE NEW PASSWORD
	// ══════════════════════════════════════════
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

	// ══════════════════════════════════════════
	// VIEW: REGISTER — PERSONAL INFO
	// ══════════════════════════════════════════
	if (view === 'register-personal') return (
		<Card wide>
			<h1 className="text-3xl font-extrabold text-center text-[#1a1040]">Create Your Seller's Account</h1>
			<p className="mt-2 text-center text-gray-500 text-[14px]">Let us get to know you better.</p>

			<RegisterTabs step={1} />
			<ProgressBar step={1} />

			<div className="grid grid-cols-2 gap-x-8 gap-y-5">
				<Field label="First Name" placeholder="Eg; John" hint="Enter your legal first name" />
				<Field label="Last Name" placeholder="Eg; Martins" hint="Enter your legal last name" />
				<Field label="Email address" placeholder="Eg; john@gmail.com" type="email" hint="Enter your valid email address" />
				<div className="flex flex-col">
					<label className="text-[13px] text-gray-500 mb-2">Phone Number</label>
					<div className="flex items-center outline-1 outline-gray-300 rounded-sm bg-white overflow-hidden">
						<div className="flex items-center gap-1 px-3 border-r border-gray-300 py-3">
							<span className="text-lg">🇬🇭</span>
							<span className="text-[13px] text-gray-500">+233</span>
							<svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
						</div>
						<input type="text" placeholder="Enter number" className="flex-1 text-[14px] p-3 bg-white outline-none" />
					</div>
					<span className="text-[11px] text-gray-400 mt-1">Enter a valid phone number</span>
				</div>
				<div>
					<PasswordInput label="Create Password" value={regPassword} onChange={setRegPassword} />
					<PasswordRules password={regPassword} colored={regPassword.length > 0} />
				</div>
				<SelectField label="Nationality" placeholder="Select country" hint="Select your nationality" options={['Ghana', 'Nigeria', 'Kenya', 'South Africa']} />
			</div>

			<div className="flex justify-center mt-10">
				<button onClick={() => setView('register-business')} className="bg-[#6A1B9A] hover:bg-[#8646ad] text-white py-3 px-16 rounded-sm text-[14px] transition-colors">
					Save and Continue
				</button>
			</div>
			<p className="text-center text-[13px] mt-4">
				Already have an account?{' '}
				<button onClick={() => setView('login')} className="font-bold text-[#6A1B9A]">Login Here</button>
			</p>
		</Card>
	)

	// ══════════════════════════════════════════
	// VIEW: REGISTER — BUSINESS INFO
	// ══════════════════════════════════════════
	if (view === 'register-business') return (
		<Card wide>
			<h1 className="text-3xl font-extrabold text-center text-[#1a1040]">Create Your Seller's Account</h1>
			<p className="mt-2 text-center text-gray-500 text-[14px]">
				Let's help you personalize your shop<br />You can always edit and add more information later.
			</p>

			<RegisterTabs step={2} />
			<ProgressBar step={2} />

			<div className="grid grid-cols-2 gap-x-8 gap-y-5">
				<Field label="Shop Name" placeholder="" hint="Enter a valid name" />
				<SelectField label="Shop Category" placeholder="Fashion" hint="Select your most suitable category" options={['Fashion', 'Electronics', 'Home & Living', 'Sports']} />
				<SelectField label="Sub Category" placeholder="Shoes" hint="Select your most suitable sub category" options={['Shoes', 'Bags', 'Clothing']} />
				<Field label="Business Email Address" placeholder="johnmartins@gmail.com" type="email" hint="Enter a valid email address" />
				<Field label="State/Province" placeholder="Lagos" hint="Enter a valid state/province" />
				<Field label="City" placeholder="Eti-Osa" hint="Enter a valid city" />
				<div className="col-span-2">
					<Field label="Address Line 1" placeholder="28 Deigo street" hint="Enter a valid address" />
				</div>
				<div className="col-span-2">
					<Field label="Address Line 2 (Optional)" placeholder="28 Deigo street" hint="Enter a valid address" />
				</div>
				<Field label="Zip/Postal Code" placeholder="7588993" hint="Enter a valid zip/postal code" />
				<Field label="Tax ID (optional)" placeholder="N-774892" hint="Enter a valid tax ID" />
			</div>

			<div className="flex gap-4 mt-10">
				<button onClick={() => setView('register-personal')} className="flex-1 border border-purple-700 text-purple-700 hover:bg-purple-50 py-3 rounded-sm text-[14px] transition-colors">
					Go to Previous Page
				</button>
				<button onClick={() => setView('register-success')} className="flex-1 bg-[#6A1B9A] hover:bg-[#8646ad] text-white py-3 rounded-sm text-[14px] transition-colors">
					Save and Continue
				</button>
			</div>
		</Card>
	)

	// ══════════════════════════════════════════
	// VIEW: REGISTER SUCCESS
	// ══════════════════════════════════════════
	if (view === 'register-success') return (
		<section className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="flex flex-col items-center text-center max-w-md px-6">
				<div className="text-8xl mb-6">🤝</div>
				<h2 className="text-[26px] font-extrabold text-[#6A1B9A] mb-3">
					Seller Account<br />Created Successfully!
				</h2>
				<p className="text-[14px] text-gray-500 mb-8 leading-relaxed">
					Your seller account has been successfully created.<br />You can start selling now.
				</p>
				<button onClick={() => router.push('/dashboard')} className="bg-[#6A1B9A] hover:bg-[#8646ad] text-white text-[14px] px-10 py-3 rounded-md transition-colors">
					Go back to dashboard
				</button>
			</div>
		</section>
	)

	return null
}