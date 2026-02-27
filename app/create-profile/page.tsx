'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type View = 'personal' | 'business' | 'success'

const PASSWORD_RULES = [
	{ label: 'Capital Letter', test: (p: string) => /[A-Z]/.test(p) },
	{ label: 'Small Letter', test: (p: string) => /[a-z]/.test(p) },
	{ label: 'Number', test: (p: string) => /[0-9]/.test(p) },
	{ label: 'Symbol', test: (p: string) => /[^A-Za-z0-9]/.test(p) },
	{ label: 'More than 8 characters', test: (p: string) => p.length > 8 },
]

// ---- Shared UI ----
function Card({ children }: { children: React.ReactNode }) {
	return (
		<section className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-16">
			<div className="bg-white border border-gray-200 rounded-xl py-14 px-10 w-full max-w-3xl">
				{children}
			</div>
		</section>
	)
}

function Field({ label, placeholder, hint, type = 'text', value, onChange }: {
	label: string; placeholder: string; hint?: string; type?: string;
	value?: string; onChange?: (v: string) => void;
}) {
	return (
		<div className="flex flex-col">
			<label className="text-[13px] text-gray-500 mb-2">{label}</label>
			<input
				type={type}
				value={value ?? ''}
				onChange={e => onChange?.(e.target.value)}
				placeholder={placeholder}
				className="text-[14px] p-3 outline outline-1 outline-gray-300 rounded-sm w-full"
			/>
			{hint && <span className="text-[11px] text-gray-400 mt-1">{hint}</span>}
		</div>
	)
}

function SelectField({ label, placeholder, hint, options }: {
	label: string; placeholder: string; hint?: string; options?: string[];
}) {
	return (
		<div className="flex flex-col">
			<label className="text-[13px] text-gray-500 mb-2">{label}</label>
			<div className="relative">
				<select className="w-full appearance-none text-[14px] p-3 outline outline-1 outline-gray-300 rounded-sm bg-white pr-8 text-gray-500">
					<option>{placeholder}</option>
					{options?.map(o => <option key={o}>{o}</option>)}
				</select>
				<svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
				</svg>
			</div>
			{hint && <span className="text-[11px] text-gray-400 mt-1">{hint}</span>}
		</div>
	)
}

function PasswordInput({ label, value, onChange }: {
	label: string; value: string; onChange: (v: string) => void;
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
					placeholder="Enter password"
					className="text-[14px] p-3 outline outline-1 outline-gray-300 rounded-sm w-full pr-10"
				/>
				<button type="button" onClick={() => setShow(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
					<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
						<path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
						<path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
					</svg>
				</button>
			</div>
		</div>
	)
}

function PasswordRules({ password }: { password: string }) {
	return (
		<div className="mt-1">
			<p className="text-[11px] text-gray-400">Password must align with the following;</p>
			{PASSWORD_RULES.map(rule => (
				<p key={rule.label} className={`text-[11px] ${password.length > 0 ? (rule.test(password) ? 'text-green-600' : 'text-yellow-600') : 'text-gray-400'}`}>
					{rule.label}
				</p>
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

function StepTabs({ step }: { step: 1 | 2 }) {
	return (
		<div className="flex justify-center mt-6">
			{(['Personal Information', 'Shop/Business Information'] as const).map((label, i) => (
				<button key={label} className={`py-2 px-10 text-[15px] border-b transition-colors ${i + 1 === step ? 'border-b-yellow-500 text-yellow-600' : 'border-b-gray-200 text-gray-400'}`}>
					{label}
				</button>
			))}
		</div>
	)
}

// ---- Main Page ----
export default function CreateProfilePage() {
	const router = useRouter()
	const [view, setView] = useState<View>('personal')
	const [password, setPassword] = useState('')

	// ── Personal info view ──
	if (view === 'personal') return (
		<Card>
			<h1 className="text-3xl font-extrabold text-center text-[#1a1040]">Create Your Seller's Account</h1>
			<p className="mt-2 text-center text-gray-500 text-[14px]">Let us get to know you better.</p>

			<StepTabs step={1} />
			<ProgressBar step={1} />

			<div className="grid grid-cols-2 gap-x-8 gap-y-5">
				<Field label="First Name" placeholder="Eg; John" hint="Enter your legal first name" />
				<Field label="Last Name" placeholder="Eg; Martins" hint="Enter your legal last name" />
				<Field label="Email address" placeholder="Eg; john@gmail.com" type="email" hint="Enter your valid email address" />
				<div className="flex flex-col">
					<label className="text-[13px] text-gray-500 mb-2">Phone Number</label>
					<div className="flex items-center outline outline-1 outline-gray-300 rounded-sm bg-white overflow-hidden">
						<div className="flex items-center gap-1 px-3 border-r border-gray-300 py-3">
							<span className="text-lg">🇬🇭</span>
							<span className="text-[13px] text-gray-500">+233</span>
							<svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
							</svg>
						</div>
						<input type="text" placeholder="Enter number" className="flex-1 text-[14px] p-3 bg-white outline-none" />
					</div>
					<span className="text-[11px] text-gray-400 mt-1">Enter a valid phone number</span>
				</div>
				<div>
					<PasswordInput label="Create Password" value={password} onChange={setPassword} />
					<PasswordRules password={password} />
				</div>
				<SelectField label="Nationality" placeholder="Select country" hint="Select your nationality" options={['Ghana', 'Nigeria', 'Kenya', 'South Africa']} />
			</div>

			<div className="flex justify-center mt-10">
				<button
					onClick={() => setView('business')}
					className="bg-[#6A1B9A] hover:bg-[#8646ad] text-white py-3 px-16 rounded-sm text-[14px] transition-colors"
				>
					Save and Continue
				</button>
			</div>

			<p className="text-center text-[13px] mt-4">
				Already have an account?{' '}
				<Link href="/login" className="font-bold text-[#6A1B9A]">
					Login Here
				</Link>
			</p>
		</Card>
	)

	// ── Business info view ──
	if (view === 'business') return (
		<Card>
			<h1 className="text-3xl font-extrabold text-center text-[#1a1040]">Create Your Seller's Account</h1>
			<p className="mt-2 text-center text-gray-500 text-[14px]">
				Let's help you personalize your shop<br />You can always edit and add more information later.
			</p>

			<StepTabs step={2} />
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
				<button
					onClick={() => setView('personal')}
					className="flex-1 border border-purple-700 text-purple-700 hover:bg-purple-50 py-3 rounded-sm text-[14px] transition-colors"
				>
					Go to Previous Page
				</button>
				<button
					onClick={() => setView('success')}
					className="flex-1 bg-[#6A1B9A] hover:bg-[#8646ad] text-white py-3 rounded-sm text-[14px] transition-colors"
				>
					Save and Continue
				</button>
			</div>
		</Card>
	)

	// ── Success view ──
	if (view === 'success') return (
		<section className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="flex flex-col items-center text-center max-w-md px-6">
				<div className="text-8xl mb-6">🤝</div>
				<h2 className="text-[26px] font-extrabold text-[#6A1B9A] mb-3">
					Seller Account<br />Created Successfully!
				</h2>
				<p className="text-[14px] text-gray-500 mb-8 leading-relaxed">
					Your seller account has been successfully created.<br />You can start selling now.
				</p>
				<button
					onClick={() => router.push('/dashboard')}
					className="bg-[#6A1B9A] hover:bg-[#8646ad] text-white text-[14px] px-10 py-3 rounded-md transition-colors"
				>
					Go back to dashboard
				</button>
			</div>
		</section>
	)

	return null
}