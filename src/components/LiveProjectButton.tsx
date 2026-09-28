import { usePortfolio } from "../context/PortfolioContext";

interface LiveProjectButtonProps {
	children?: string;
}

export default function LiveProjectButton({
	children = "לצפייה בעבודות",
}: LiveProjectButtonProps) {
	const { openGallery } = usePortfolio();

	return (
		<button
			type="button"
			onClick={() => openGallery()}
			className="rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10 sm:px-10 sm:py-3.5 sm:text-base"
		>
			{children}
		</button>
	);
}
