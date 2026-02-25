import type { Metadata } from "next";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"


export const metadata: Metadata = {
	title: "Sellers Dashboard",
	description: "Ecommerce for Sellers",
};

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<SidebarProvider>
					<AppSidebar />
					<main className="w-full">
						<SidebarTrigger />
						<section className="w-full py-5 px-25">
							{children}
						</section>
					</main>
				</SidebarProvider>
			</body>
		</html>
	);
}
