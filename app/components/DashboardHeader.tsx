"use client"

import { useState } from "react";

import { NotificationsPanel } from "./NotificationsPanel";
import { CartPanel } from "./CartPanel";
import { WishlistPanel } from "./WishlistPanel";

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

export default function DashboardHeader() {
	const [showNotifications, setShowNotifications] = useState(false);
	const [showCart, setShowCart] = useState(false);
	const [showWishlist, setShowWishlist] = useState(false);

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
				<button onClick={() => setShowNotifications(true)} className="justify-items-center text-xs">
					<HugeiconsIcon icon={Notification01Icon} size={22} color="currentColor" strokeWidth={1.5} />
					<span>Notifications</span>
				</button>
				<button onClick={() => setShowCart(true)} className="justify-items-center text-xs">
					<HugeiconsIcon icon={ShoppingCart02Icon} size={22} color="currentColor" strokeWidth={1.5} />
					<span>Cart</span>
				</button>
				<button onClick={() => setShowWishlist(true)} className="justify-items-center text-xs">
					<HugeiconsIcon icon={ShoppingBasketFavorite01Icon} size={22} color="currentColor" strokeWidth={1.5} />
					<span>Wishlist</span>
				</button>
			</div>

			{showNotifications && (
				<NotificationsPanel onClose={() => setShowNotifications(false)} />
			)}
			{showCart && <CartPanel onClose={() => setShowCart(false)} />}
			{showWishlist && <WishlistPanel onClose={() => setShowWishlist(false)} />}
		</header>
	);
}