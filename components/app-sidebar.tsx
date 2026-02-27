"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

import { HugeiconsIcon } from '@hugeicons/react';
import type { IconSvgElement } from "@hugeicons/react";
import {
	DashboardSquare03Icon,
	Invoice01Icon,
	DeliveryTruck01Icon,
	PackageOpenIcon,
	StarIcon,
	CreditCardIcon,
	Package03Icon,
	UserIcon,
	Logout01Icon
} from "@hugeicons/core-free-icons";

// Remove isActive from the links array entirely — it's derived from the URL now
const links: { title: string; icon: IconSvgElement; url: string }[] = [
	{ title: "Dashboard", icon: DashboardSquare03Icon, url: "/dashboard" },
	{ title: "Orders", icon: Invoice01Icon, url: "/dashboard/orders" },
	{ title: "Product Listings", icon: PackageOpenIcon, url: "/dashboard/product-listings" },
	{ title: "My Shipments", icon: DeliveryTruck01Icon, url: "/dashboard/my-shipments" },
	{ title: "Payment Settings", icon: CreditCardIcon, url: "/dashboard/payment-settings" },
	{ title: "Reviews", icon: StarIcon, url: "/dashboard/reviews" },
	{ title: "My Purchases", icon: Package03Icon, url: "/dashboard/my-purchases" },
	{ title: "My Profile", icon: UserIcon, url: "/dashboard/my-profile" },
];

export function AppSidebar() {
	const pathname = usePathname();

	return (
		<Sidebar>
			<SidebarHeader>
				<SidebarMenuItem className="pl-12 mt-12 text-3xl font-bold">
					<Link href="/" >LOGO</Link>
				</SidebarMenuItem>
			</SidebarHeader>
			<SidebarContent className="mt-15">
				<SidebarMenu className="gap-0">
					{links.map((link) => (
						<Link href={link.url} key={link.title}>
							<SidebarMenuItem className="py-3">
								<SidebarMenuButton asChild isActive={pathname === link.url}>
									<div className="pl-12 py-6">
										<HugeiconsIcon icon={link.icon} size={24} color="currentColor" strokeWidth={1.5} />
										<span className="text-[18px]">{link.title}</span>
									</div>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</Link>
					))}
				</SidebarMenu>
			</SidebarContent>
			<SidebarFooter className="mb-25">
				<SidebarMenuItem>
					<SidebarMenuButton asChild>
						<div className="text-red-400 pl-10 py-7 flex items-center">
							<HugeiconsIcon icon={Logout01Icon} size={28} color="currentColor" strokeWidth={1.5} />
							<Link href="#" className="text-[18px]">Logout</Link>
						</div>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarFooter>
		</Sidebar>
	);
}