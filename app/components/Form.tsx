import { IconAdd } from "./IconAdd"
import { IconArrowDown } from "./IconArrowDown"

export const Form = () => {
	return (
		<section className='w-full h-auto mx-auto max-w-7xl pb-40 px-16'>
			<div className="w-full mt-40 flex flex-col gap-y-8">
				<div className="mb-12">
					<h1 className="text-4xl font-extrabold">
						Save and Ship
					</h1>
					<p className='text-gray-400 mt-4'>Cheaper, Faster, and Simply Better</p>
				</div>

				<div className='w-full p-8 border border-gray-300 rounded-lg'>
					<div>
						<h3 className='text-base font-bold'>Departure Destination</h3>
						<div className='flex justify-between gap-x-12 mt-8'>
							<div className='flex-1'>
								<div className='flex flex-col mb-8'>
									<label className='text-[13px] text-gray-500 mb-2'>Country</label>
									<div className='relative'>
										<select className="w-full text-[14px] p-3 outline-1 outline-gray-300 rounded-sm appearance-none">
											<option value="Ghana">Ghana</option>
											<option value="Togo">Togo</option>
											<option value="Benin">Benin</option>
											<option value="Nigeria">Nigeria</option>
											<option value="South Africa">South Africa</option>
											<option value="USA">USA</option>
											<option value="UK">UK</option>
											<option value="Canada">Canada</option>
											<option value="UAE">UAE</option>
											<option value="Italy">Italy</option>
										</select>
										<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
											<IconArrowDown />
										</div>
									</div>
								</div>
								<div className='flex flex-col'>
									<label className='text-[13px] text-gray-500 mb-2'>Street Address</label>
									<input type="text" className="text-[14px] p-3 outline-1 outline-gray-300 rounded-sm"
										placeholder="Enter Address" />
								</div>
							</div>

							<div className='flex-1'>
								<div className='flex flex-col mb-8'>
									<label className='text-[13px] text-gray-500 mb-2'>City</label>
									<input type="text" className="text-[14px] p-3 outline-1 outline-gray-300 rounded-sm"
										placeholder="Enter City" />
								</div>
								<div className='flex flex-col'>
									<label className='text-[13px] text-gray-500 mb-2'>Postal Code</label>
									<input type="text" className="text-[14px] p-3 outline-1 outline-gray-300 rounded-sm"
										placeholder="Enter postal code" />
								</div>
							</div>
						</div>
					</div>
					{/* ------------------------------------------------------------------------------------------------ */}
					<div className='mt-14'>
						<h3 className='text-base font-bold'>Departure Destination</h3>
						<div className='flex justify-between gap-x-12 mt-8'>
							<div className='flex-1'>
								<div className='flex flex-col mb-8'>
									<label className='text-[13px] text-gray-500 mb-2'>Country</label>
									<div className='relative'>
										<select className="w-full text-[14px] p-3 outline-1 outline-gray-300 rounded-sm appearance-none">
											<option value="Ghana">Ghana</option>
											<option value="Togo">Togo</option>
											<option value="Benin">Benin</option>
											<option value="Nigeria">Nigeria</option>
											<option value="South Africa">South Africa</option>
											<option value="USA">USA</option>
											<option value="UK">UK</option>
											<option value="Canada">Canada</option>
											<option value="UAE">UAE</option>
											<option value="Italy">Italy</option>
										</select>
										<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
											<IconArrowDown />
										</div>
									</div>
								</div>
								<div className='flex flex-col'>
									<label className='text-[13px] text-gray-500 mb-2'>Street Address</label>
									<input type="text" className="text-[14px] p-3 outline-1 outline-gray-300 rounded-sm"
										placeholder="Enter Address" />
								</div>
							</div>

							<div className='flex-1'>
								<div className='flex flex-col mb-8'>
									<label className='text-[13px] text-gray-500 mb-2'>City</label>
									<input type="text" className="text-[14px] p-3 outline-1 outline-gray-300 rounded-sm"
										placeholder="Enter City" />
								</div>
								<div className='flex flex-col'>
									<label className='text-[13px] text-gray-500 mb-2'>Postal Code</label>
									<input type="text" className="text-[14px] p-3 outline-1 outline-gray-300 rounded-sm"
										placeholder="Enter postal code" />
								</div>
							</div>
						</div>
					</div>
					{/* ------------------------------------------------------------------------------------------------ */}
					<div className='mt-14'>
						<h3 className='text-base font-bold'>Package 1 Dimensions</h3>
						<div className='flex justify-between gap-x-12 mt-8'>
							<div className='flex-1'>
								<div className='flex flex-col mb-8'>
									<label className='text-[13px] text-gray-500 mb-2'>Street Address</label>
									<input type="text" className="text-[14px] p-3 outline-1 outline-gray-300 rounded-sm"
										placeholder="Enter Length" />
								</div>
								<div className='flex flex-col'>
									<label className='text-[13px] text-gray-500 mb-2'>Height (cm)</label>
									<input type="text" className="text-[14px] p-3 outline-1 outline-gray-300 rounded-sm"
										placeholder="Enter height" />
								</div>
							</div>

							<div className='flex-1'>
								<div className='flex flex-col mb-8'>
									<label className='text-[13px] text-gray-500 mb-2'>Width (cm)</label>
									<input type="text" className="text-[14px] p-3 outline-1 outline-gray-300 rounded-sm"
										placeholder="Enter width" />
								</div>
								<div className='flex flex-col'>
									<label className='text-[13px] text-gray-500 mb-2'>Weight (kg)</label>
									<input type="text" className="text-[14px] p-3 outline-1 outline-gray-300 rounded-sm"
										placeholder="Enter weight" />
								</div>
							</div>
						</div>
					</div>
					{/* ------------------------------------------------------------------------------------------------ */}
					<div className='w-full mt-16 flex justify-between gap-x-12'>
						<div className='flex-1'>
							<div className='flex justify-between gap-x-4'>
								<button className="bg-[#6A1B9A] hover:bg-[#8646ad] text-white py-3 rounded-sm cursor-pointer flex-1">
									<span className='text-[13px]'>See Shipping Rate</span>
								</button>
								<button className="bg-white hover:bg-gray-200 text-[#6A1B9A] border border-[#6A1B9A] py-3 rounded-sm cursor-pointer flex-1">
									<div className='flex items-center gap-x-4 justify-self-center'>
										<span className='text-[13px]'>Add Another Package</span>
										<IconAdd />
									</div>
								</button>
							</div>
						</div>
						<div className='flex-1'>
							{/* empty div */}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}