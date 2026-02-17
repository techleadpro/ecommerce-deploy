import './styles/main.css'

import Header from "./components/Header";
import { Hero } from "./components/Hero";
import { HomeContent } from "./components/HomeContent";

export default function Home() {
	return (
		<section className="h-auto py-16">
			<Header />
			<Hero />
			<HomeContent />
		</section>
	);
}
