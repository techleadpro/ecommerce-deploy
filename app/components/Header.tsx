import Link from "next/link";
import { IconArrowDown } from "./IconArrowDown";
import PlendifyLogo from "@/public/plendify-logo.png";

export default function Header() {
	return (
		<section className="w-full font-normal text-sm mx-auto max-w-7xl px-16">
			<nav className="flex justify-end items-center gap-x-30">
			<div className="flex items-center gap-1">
			 <Link href="/">

					<img src="/plendify-logo.png" alt="Plendify Logo" width="120" />

				</Link>
	            </div>
				<ul className="flex gap-x-10 [&>li]:cursor-pointer [&>li]:border-b-2 [&>li]:border-b-white [&>li:hover]:border-b-2 [&>li:hover]:border-b-[#8646ad]">
					<li>Sellers</li>
					<li>Shoppers</li>
					<li>Ship</li>
				</ul>
				<ul className="flex items-center gap-x-10 [&>li]:cursor-pointer [&>li]:border-b-2 [&>li]:border-b-white [&>li:hover]:border-b-2 [&>li:hover]:border-b-[#8646ad]">
					<li className="flex gap-x-2 items-center">
						<span>Resources</span>
						<span>
							<IconArrowDown />
						</span>
					</li>
					<li>Our Story</li>
					<li>Blog</li>
					<li><Link href="/login">Login</Link></li>
					<li><Link href="/dashboard">Dashboard</Link></li>
					<Link href="/create-profile">
						<button className="bg-[#6A1B9A] hover:bg-[#8646ad] text-white flex items-center gap-x-2 py-3 px-6 rounded-sm cursor-pointer">
							<span>Get Started</span>
							<span>
								<IconArrowDown />
							</span>
						</button>
					</Link>
				</ul>
			</nav>
		</section>
	);
}
