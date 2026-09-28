import type { CSSProperties, ReactNode } from "react";
import { PHONE_TEL } from "../data/portfolio";

interface ContactButtonProps {
	children?: ReactNode;
	href?: string;
	/** Animated glowing ring — used for primary CTAs (e.g. About). */
	glowRing?: boolean;
}

const LINK_CLASS =
	"inline-block rounded-full px-8 py-3 text-center text-xs text-white transition-[filter,transform,box-shadow] duration-200 hover:scale-[1.03] hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9D5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c0c0c] sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base";

const GRADIENT_BG =
	"linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)";

export default function ContactButton({
	children = "Contact Me",
	href = PHONE_TEL,
	glowRing = false,
}: ContactButtonProps) {
	const linkStyle: CSSProperties = {
		background: GRADIENT_BG,
		boxShadow: glowRing
			? "0px 6px 20px rgba(181, 1, 167, 0.45), 4px 4px 14px #7721B1 inset"
			: "0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset",
		...(glowRing
			? {}
			: { outline: "2px solid #FFFFFF", outlineOffset: "-3px" }),
	};

	const link = (
		<a
			href={href}
			className={`${LINK_CLASS} ${glowRing ? "relative font-semibold" : "font-medium"}`}
			style={linkStyle}
		>
			{children}
		</a>
	);

	if (!glowRing) {
		return link;
	}

	return (
		<span className="contact-button-glow-wrap relative inline-flex rounded-full">
			{link}
			<span
				className="contact-button-glow-trail pointer-events-none absolute inset-0 z-20 rounded-full"
				aria-hidden
			/>
		</span>
	);
}
