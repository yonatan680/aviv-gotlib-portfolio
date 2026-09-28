import { createContext, useContext, type ReactNode } from "react";

interface PortfolioContextValue {
	openGallery: (index?: number) => void;
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export function PortfolioProvider({
	children,
	openGallery,
}: {
	children: ReactNode;
	openGallery: (index?: number) => void;
}) {
	return (
		<PortfolioContext.Provider value={{ openGallery }}>
			{children}
		</PortfolioContext.Provider>
	);
}

export function usePortfolio() {
	const ctx = useContext(PortfolioContext);
	if (!ctx) {
		throw new Error("usePortfolio must be used within PortfolioProvider");
	}
	return ctx;
}
