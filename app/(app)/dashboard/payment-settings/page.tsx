import DashboardHeader from "@/app/components/DashboardHeader";
import { IconArrowDown } from "@/app/components/IconArrowDown";

export default function PaymentSettingsPage() {
	return (
		<div>
			<DashboardHeader />

			<section className="mt-10 py-12 max-w-7xl border-t border-t-gray-300">
				<h1 className="font-bold text-2xl">Payment Settings</h1>
				<p className="text-gray-400 mt-8 text-[17px]">Provide your payment details to receive payouts.</p>
				<div className='mt-14'>
					<div className='flex justify-between gap-x-12 mt-8'>
						<div className='flex-1'>
							<div className='flex flex-col mb-8'>
								<label className='text-[13px] text-gray-500 mb-2'>Payment Method</label>
								<div className='relative'>
									<select className="w-full text-[14px] p-3 outline-1 outline-gray-300 rounded-sm appearance-none">
										<option value="Mobile Money">Mobile Money</option>
										<option value="Visa">Visa</option>
										<option value="Master Card">Master Card</option>
										<option value="Cypto">Cypto</option>
									</select>
									<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
										<IconArrowDown />
									</div>
								</div>
							</div>
							<div className='flex flex-col mb-8'>
								<label className='text-[13px] text-gray-500 mb-2'>Provider</label>
								<div className='relative'>
									<select className="w-full text-[14px] p-3 outline-1 outline-gray-300 rounded-sm appearance-none">
										<option value="MTN">MTN</option>
										<option value="Absa Bank">Absa Bank</option>
										<option value="ADB">ADB</option>
										<option value="Ecobank">Ecobank</option>
									</select>
									<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
										<IconArrowDown />
									</div>
								</div>
							</div>
						</div>

						<div className='flex-1'>
							<div className='flex flex-col mb-8'>
								<label className='text-[13px] text-gray-500 mb-2'>Account Name</label>
								<input type="text" className="text-[14px] p-3 outline-1 outline-gray-300 rounded-sm"
									placeholder="Eg. Milton" />
							</div>
							<div className='flex flex-col'>
								<label className='text-[13px] text-gray-500 mb-2'>Mobile Money</label>
								<input type="text" className="text-[14px] p-3 outline-1 outline-gray-300 rounded-sm"
									placeholder="Enter your mobile number" />
							</div>
						</div>
					</div>
				</div>
			</section>

			<button className="bg-[#6A1B9A] hover:bg-[#8646ad] text-white py-3 px-6 rounded-sm cursor-pointer">
				<span className='text-[13px]'>Save Payment Details</span>
			</button>
		</div>
	)
}