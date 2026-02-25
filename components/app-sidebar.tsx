import Link from "next/link"

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

import PlendifyLogo from "@/public/plendify-logo.png";


const links: { title: string; icon: IconSvgElement; url: string; isActive: boolean }[] = [
	{
		title: "Dashboard",
		icon: DashboardSquare03Icon,
		url: "/dashboard",
		isActive: true
	},
	{
		title: "Orders",
		icon: Invoice01Icon,
		url: "/dashboard/orders",
		isActive: false
	},
	{
		title: "Product Listings",
		icon: PackageOpenIcon,
		url: "#",
		isActive: false
	},
	{
		title: "My Shipments",
		icon: DeliveryTruck01Icon,
		url: "#",
		isActive: false
	},
	{
		title: "Payment Settings",
		icon: CreditCardIcon,
		url: "/dashboard/payment-settings",
		isActive: false
	},
	{
		title: "Reviews",
		icon: StarIcon,
		url: "#",
		isActive: false
	},
	{
		title: "My Purchases",
		icon: Package03Icon,
		url: "#",
		isActive: false
	},
	{
		title: "My Profile",
		icon: UserIcon,
		url: "/dashboard/profile",
		isActive: false
	}
]

export function AppSidebar() {
	return (
		<Sidebar>

			<SidebarHeader />

			<SidebarContent className="mt-35">

				<SidebarMenu className="gap-0">
					{links.map((link) => (
						<Link href={link.url}>
							<SidebarMenuItem key={link.title} className="py-3">
								<SidebarMenuButton asChild isActive={link.isActive}>
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
							<Link href="#" className="text-[18px] ">Logout</Link>
						</div>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarFooter>
		</Sidebar>
	)
}
