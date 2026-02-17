import "../globals.css";


export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (

		<section className="grid place-items-center min-h-screen">
			{children}
		</section>

	);
}
