// app/dashboard/page.tsx

import { Suspense } from "react";
import DashboardContent from "./DashboardContent";

// This outer page is a Server Component — no "use client"
export default function DashboardPage() {
	return (
		<Suspense fallback={<DashboardSkeleton />}>
			<DashboardContent />
		</Suspense>
	);
}

function DashboardSkeleton() {
	return (
		<div className="animate-pulse p-10 space-y-6">
			<div className="h-8 bg-gray-200 rounded w-1/3" />
			<div className="flex gap-4">
				{[...Array(4)].map((_, i) => (
					<div key={i} className="flex-1 h-28 bg-gray-200 rounded-md" />
				))}
			</div>
			<div className="h-64 bg-gray-200 rounded-md" />
		</div>
	);
}