import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
	ALL_WORK,
	FULL_PORTFOLIO_URL,
} from "../data/portfolio";

interface PortfolioGalleryProps {
	open: boolean;
	onClose: () => void;
	initialIndex?: number | null;
}

export default function PortfolioGallery({
	open,
	onClose,
	initialIndex = null,
}: PortfolioGalleryProps) {
	const [lightbox, setLightbox] = useState<number | null>(null);

	useEffect(() => {
		if (open && initialIndex != null) {
			setLightbox(initialIndex);
		}
		if (!open) setLightbox(null);
	}, [open, initialIndex]);

	useEffect(() => {
		if (!open) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		document.documentElement.classList.add("gallery-open");
		return () => {
			document.body.style.overflow = prev;
			document.documentElement.classList.remove("gallery-open");
		};
	}, [open]);

	const closeLightbox = useCallback(() => setLightbox(null), []);

	const step = useCallback((dir: number) => {
		setLightbox((current) => {
			if (current == null) return current;
			const next = current + dir;
			if (next < 0) return ALL_WORK.length - 1;
			if (next >= ALL_WORK.length) return 0;
			return next;
		});
	}, []);

	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				if (lightbox != null) closeLightbox();
				else onClose();
			}
			if (lightbox == null) return;
			if (e.key === "ArrowLeft") step(1);
			if (e.key === "ArrowRight") step(-1);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, lightbox, onClose, closeLightbox, step]);

	return (
		<AnimatePresence>
			{open && (
				<motion.div
					className="fixed inset-0 z-[80] bg-[#0C0C0C]"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
				>
					<div className="flex h-full flex-col">
						<header className={`flex items-center justify-between px-5 py-5 sm:px-8 md:px-10 ${lightbox != null ? "pointer-events-none opacity-0" : ""}`}>
							<div>
								<p className="text-xs text-[#D7E2EA]/50">אביב גוטליב</p>
								<h2
									className="hero-heading font-black leading-none tracking-tight"
									style={{ fontSize: "clamp(1.4rem, 4vw, 2.6rem)" }}
								>
									כל העבודות
								</h2>
							</div>
							<button
								type="button"
								onClick={onClose}
								aria-label="סגירת הגלריה"
								className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] transition-colors hover:bg-[#D7E2EA]/10"
							>
								<X size={20} />
							</button>
						</header>

						<div className="min-h-0 flex-1 overflow-y-auto px-4 pb-16 sm:px-6 md:px-10">
							<div className="columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4">
								{ALL_WORK.map((src, index) => (
									<button
										key={src}
										type="button"
										onClick={() => setLightbox(index)}
										className="mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl sm:mb-4"
									>
										<img
											src={src}
											alt={`עבודה ${index + 1} של אביב גוטליב`}
											loading="lazy"
											className="w-full transition-transform duration-500 hover:scale-[1.035]"
										/>
									</button>
								))}
							</div>

							<div className="mt-12 flex justify-center pb-6">
								<a
									href={FULL_PORTFOLIO_URL}
									target="_blank"
									rel="noreferrer"
									className="inline-block rounded-full px-8 py-3 text-center text-xs font-medium text-white transition-[filter,transform] duration-200 hover:scale-[1.03] hover:brightness-110 active:scale-[0.98] sm:px-10 sm:py-3.5 sm:text-sm"
									style={{
										background:
											"linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
										boxShadow:
											"0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset",
										outline: "2px solid #FFFFFF",
										outlineOffset: "-3px",
									}}
								>
									לתיק העבודות המלא
								</a>
							</div>
						</div>
					</div>

					<AnimatePresence>
						{lightbox != null && (
							<motion.div
								className="absolute inset-0 z-10 flex items-center justify-center bg-black/90 px-4"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								onClick={closeLightbox}
							>
								<button
									type="button"
									aria-label="סגירת התמונה"
									onClick={closeLightbox}
									className="absolute end-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] hover:bg-[#D7E2EA]/10"
								>
									<X size={20} />
								</button>
								<button
									type="button"
									aria-label="תמונה קודמת"
									onClick={(e) => {
										e.stopPropagation();
										step(-1);
									}}
									className="absolute start-3 z-20 flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] hover:bg-[#D7E2EA]/10 sm:start-6"
								>
									<ChevronRight size={22} />
								</button>
								<button
									type="button"
									aria-label="תמונה הבאה"
									onClick={(e) => {
										e.stopPropagation();
										step(1);
									}}
									className="absolute end-3 z-20 flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] hover:bg-[#D7E2EA]/10 sm:end-6"
								>
									<ChevronLeft size={22} />
								</button>
								<motion.img
									key={lightbox}
									src={ALL_WORK[lightbox]}
									alt={`עבודה ${lightbox + 1} של אביב גוטליב`}
									className="max-h-[88vh] max-w-[min(92vw,1200px)] object-contain"
									initial={{ opacity: 0, scale: 0.97 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.97 }}
									transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
									onClick={(e) => e.stopPropagation()}
								/>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
