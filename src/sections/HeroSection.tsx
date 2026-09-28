import ContactButton from "../components/ContactButton";
import FadeIn from "../components/FadeIn";
import Magnet from "../components/Magnet";
import { HERO_IMAGE, INSTAGRAM_URL } from "../data/portfolio";

const NAV_LINKS = [
	{ label: "אודות", href: "#about" },
	{ label: "שירותים", href: "#services" },
	{ label: "עבודות", href: "#work" },
	{ label: "יצירת קשר", href: "#contact" },
];

function InstagramMark({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 48 48" className={className} aria-hidden>
			<defs>
				<radialGradient id="aviv-ig" cx="32%" cy="108%" r="145%">
					<stop offset="0%" stopColor="#feda75" />
					<stop offset="18%" stopColor="#fa7e1e" />
					<stop offset="48%" stopColor="#d62976" />
					<stop offset="72%" stopColor="#962fbf" />
					<stop offset="100%" stopColor="#4f5bd5" />
				</radialGradient>
			</defs>
			<rect width="48" height="48" rx="12" fill="url(#aviv-ig)" />
			<rect
				x="12.5"
				y="12.5"
				width="23"
				height="23"
				rx="7"
				fill="none"
				stroke="#fff"
				strokeWidth="2.6"
			/>
			<circle cx="24" cy="24" r="5.6" fill="none" stroke="#fff" strokeWidth="2.6" />
			<circle cx="32.4" cy="15.7" r="1.7" fill="#fff" />
		</svg>
	);
}

const navLinkClass =
	"whitespace-nowrap text-[0.8rem] font-medium text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 sm:text-sm md:text-lg lg:text-[1.35rem]";

export default function HeroSection() {
	return (
		<section
			className="relative flex h-screen flex-col"
			style={{ overflowX: "clip" }}
		>
			<FadeIn
				as="nav"
				delay={0}
				y={-20}
				className="relative z-30 flex items-center justify-between px-6 pt-6 md:px-10 md:pt-8"
			>
				{NAV_LINKS.map(({ label, href }) => (
					<a key={label} href={href} className={navLinkClass}>
						{label}
					</a>
				))}
				<a
					href={INSTAGRAM_URL}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="אינסטגרם של אביב"
					className="shrink-0 transition-opacity duration-200 hover:opacity-70"
				>
					<InstagramMark className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9" />
				</a>
			</FadeIn>

			<div className="hero-heading-wrapper px-4 md:px-6">
				<FadeIn delay={0.15} y={40}>
					<h1
						dir="ltr"
						className="hero-heading hero-title mt-14 w-full whitespace-nowrap text-center font-black uppercase leading-none tracking-tight sm:mt-12 md:mt-14"
					>
						Aviv Gotlib
					</h1>
				</FadeIn>
				<FadeIn delay={0.28} y={16} className="relative z-20">
					<p className="hero-slogan" dir="rtl">
						<span className="hero-slogan-kicker">זה הזמן ליצור רגע</span>
						<span className="hero-slogan-focus">בלתי נשכח</span>
					</p>
				</FadeIn>
			</div>

			<div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:translate-y-0">
				<FadeIn delay={0.6} y={30}>
					<Magnet
						padding={150}
						strength={3}
						activeTransition="transform 0.3s ease-out"
						inactiveTransition="transform 0.6s ease-in-out"
					>
						<img
							src={HERO_IMAGE}
							alt="מצלמת קולנוע מקצועית"
							className="hero-float pointer-events-none w-[250px] select-none object-contain sm:w-[330px] md:w-[420px] lg:w-[500px]"
							style={{
								filter: "drop-shadow(0 28px 50px rgba(0,0,0,0.55))",
							}}
							draggable={false}
							fetchPriority="high"
						/>
					</Magnet>
				</FadeIn>
			</div>

			<div className="mt-auto flex items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
				<FadeIn delay={0.35} y={20}>
					<p
						className="max-w-[190px] font-light leading-snug text-[#D7E2EA] sm:max-w-[260px] md:max-w-[320px]"
						style={{ fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)" }}
					>
						סושיאל · וידאו · רילס · סטילס
					</p>
				</FadeIn>
				<FadeIn delay={0.5} y={20} className="relative z-20">
					<ContactButton glowRing>בואו ניצור</ContactButton>
				</FadeIn>
			</div>
		</section>
	);
}
