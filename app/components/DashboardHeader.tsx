import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

import { HugeiconsIcon } from '@hugeicons/react';
import {
	Search01Icon,
	ShoppingCart02Icon,
	Notification01Icon,
	ShoppingBasketFavorite01Icon
} from '@hugeicons/core-free-icons';
import Link from "next/link";

export default function DashboardHeader() {
	return (
		<header className="max-w-7xl flex justify-between">
			<InputGroup className="max-w-xl h-12">
				<InputGroupInput
					id="inline-start-input"
					placeholder="Search..."
				/>
				<InputGroupAddon align="inline-end">
					<HugeiconsIcon icon={Search01Icon} size={24} color="currentColor" strokeWidth={1.5} />
				</InputGroupAddon>
			</InputGroup>

			<div className="flex gap-x-10 items-center text-gray-600">
				<Select>
					<SelectTrigger className="w-45">
						<SelectValue placeholder="Currency" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem value="GHC">GHC</SelectItem>
							<SelectItem value="USD">USD</SelectItem>
							<SelectItem value="GBP">GBP</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
				<Link href="#" className="justify-items-center text-xs">
					<HugeiconsIcon icon={Notification01Icon} size={22} color="currentColor" strokeWidth={1.5} />
					<span>Notifications</span>
				</Link>
				<Link href="#" className="justify-items-center text-xs">
					<HugeiconsIcon icon={ShoppingCart02Icon} size={22} color="currentColor" strokeWidth={1.5} />
					<span>Cart</span>
				</Link>
				<Link href="#" className="justify-items-center text-xs">
					<HugeiconsIcon icon={ShoppingBasketFavorite01Icon} size={22} color="currentColor" strokeWidth={1.5} />
					<span>Wishlist</span>
				</Link>
			</div>
		</header>
	);
}