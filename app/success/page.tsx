import Link from 'next/link'
import Image from 'next/image'

export default function SuccessPage() {
	return (
		<section className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
			<div className='w-full mx-auto max-w-2xl px-8'>
				<div className='bg-white py-16 px-12 rounded-xl text-center'>
					{/* Success Image */}
					<div className='mb-8'>
						<Image
							src="/success.jpg"
							alt="Success"
							width={600}
							height={400}
							className='mx-auto'
						/>
					</div>

					{/* Success Message */}
					<h1 className="text-4xl font-extrabold text-[#6A1B9A] mb-4">
						Seller Account<br />Created Successfully!
					</h1>
					<p className='text-gray-600 mb-3'>
						Your seller account has been successfully created.
					</p>
					<p className='text-gray-600 mb-12'>
						You can start selling now.
					</p>

					{/* Button */}
					<Link
						href="/"
						className='inline-block bg-[#6A1B9A] hover:bg-[#8646ad] text-white py-3 px-16 rounded-sm'>
						Go to Dashboard
					</Link>
				</div>
			</div>
		</section>
	)
}