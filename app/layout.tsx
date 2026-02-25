import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";

const AvenirLT = localFont({
	src: [
		{
			path: '../public/fonts/AvenirNextLTPro-Regular.otf',
			style: 'normal',
			weight: '400'
		},
		{
			path: '../public/fonts/AvenirNextLTPro-It.otf',
			style: 'italic',
			weight: '400'
		},
		{
			path: '../public/fonts/AvenirNextLTPro-Demi.otf',
			style: 'normal',
			weight: '600'
		},
		{
			path: '../public/fonts/AvenirNextLTPro-Bold.otf',
			style: 'bold',
			weight: '700'
		}
	],
	display: 'swap',
});

export const metadata: Metadata = {
	title: "Sellers Webpage",
	description: "Ecommerce for Sellers",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={AvenirLT.className}
			>
				{children}
			</body>
		</html>
	);
}
