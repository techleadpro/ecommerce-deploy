import Image from 'next/image';

import { Button } from './Button';

export const Hero = () => {
	return (
		<section className='w-full mx-auto max-w-7xl px-16'>
			<div className="min-h-auto max-w-4xl mx-auto mt-40 flex flex-col items-center text-center gap-y-8">
				<div>
					<p className="text-7xl font-extrabold">Sell To The World.</p>
					<p className="text-7xl font-extrabold mt-4">We'll Handle The Rest.</p>
				</div>
				<div>
					<p className='text-lg max-w-3xl'>
						Plendify helps African businesses, entrepreneurs, producers and makers reach buyers in
						Europe, the USA, and the rest of the world--from sourcing customers to shipping products
						from Africa to the world.
					</p>
				</div>
				<div className="flex justify-center">
					<Button label="Get started for free" />
				</div>
			</div>
			<div className='mt-16'>
				<Image src="/hero-image.jpg" alt='hero' width={1280} height={548} />
			</div>
		</section>
	)
}
