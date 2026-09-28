import { useCallback, useState } from "react";
import PortfolioGallery from "./components/PortfolioGallery";
import { PortfolioProvider } from "./context/PortfolioContext";
import AboutSection from "./sections/AboutSection";
import ContactSection from "./sections/ContactSection";
import Footer from "./sections/Footer";
import HeroSection from "./sections/HeroSection";
import MarqueeSection from "./sections/MarqueeSection";
import ProjectsSection from "./sections/ProjectsSection";
import ServicesSection from "./sections/ServicesSection";

export default function App() {
	const [galleryOpen, setGalleryOpen] = useState(false);
	const [galleryIndex, setGalleryIndex] = useState<number | null>(null);

	const openGallery = useCallback((index?: number) => {
		setGalleryIndex(index ?? null);
		setGalleryOpen(true);
	}, []);

	return (
		<PortfolioProvider openGallery={openGallery}>
			<main
				className="min-h-screen bg-[#0C0C0C] font-heebo"
				style={{ overflowX: "clip" }}
			>
				<HeroSection />
				<MarqueeSection />
				<AboutSection />
				<ServicesSection />
				<ProjectsSection />
				<ContactSection />
				<Footer />
			</main>
			<PortfolioGallery
				open={galleryOpen}
				initialIndex={galleryIndex}
				onClose={() => setGalleryOpen(false)}
			/>
		</PortfolioProvider>
	);
}
