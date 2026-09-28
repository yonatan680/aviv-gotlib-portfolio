import { AnimatePresence, motion } from "framer-motion";
import { Instagram, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
	FULL_PORTFOLIO_URL,
	INSTAGRAM_HANDLE,
	INSTAGRAM_URL,
	PHONE_DISPLAY,
	PHONE_TEL,
} from "../data/portfolio";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const NAV = [
	{ label: "אודות", href: "#about" },
	{ label: "שירותים", href: "#services" },
	{ label: "עבודות", href: "#work" },
	{ label: "יצירת קשר", href: "#contact" },
];

const SERVICES = [
	"סושיאל",
	"וידאו",
	"קליפים",
	"רילס וסיכומי אירועים",
	"סטילס",
];

const linkClass =
	"text-sm font-light text-[#D7E2EA]/75 transition-opacity duration-200 hover:text-[#D7E2EA] hover:opacity-100 sm:text-base";

export default function Footer() {
	const [policyOpen, setPolicyOpen] = useState(false);

	useEffect(() => {
		if (!policyOpen) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const onKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") setPolicyOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = prev;
			window.removeEventListener("keydown", onKey);
		};
	}, [policyOpen]);

	return (
		<footer className="bg-[#0C0C0C] px-6 pb-10 pt-16 text-right sm:px-8 sm:pb-12 sm:pt-20 md:px-10">
			<div className="mx-auto max-w-6xl border-t border-[#D7E2EA]/15 pt-12 sm:pt-14">
				<div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
					<div>
						<p
							className="font-black leading-none text-[#D7E2EA]"
							style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
						>
							אביב גוטליב
						</p>
						<p className="mt-3 text-sm font-medium text-[#D7E2EA]/80 sm:text-base">
							צלם ויוצר תוכן
						</p>
						<p className="mt-3 max-w-xs text-sm font-light leading-relaxed text-[#D7E2EA]/60">
							סושיאל, וידאו, קליפים, רילס, סיכומי אירועים וסטילס.
						</p>
					</div>

					<nav aria-label="ניווט בפוטר">
						<p className="mb-4 text-xs font-medium tracking-wide text-[#D7E2EA]/45">
							ניווט
						</p>
						<ul className="flex flex-col gap-2.5">
							{NAV.map((item) => (
								<li key={item.href}>
									<a href={item.href} className={linkClass}>
										{item.label}
									</a>
								</li>
							))}
						</ul>
					</nav>

					<div>
						<p className="mb-4 text-xs font-medium tracking-wide text-[#D7E2EA]/45">
							שירותים
						</p>
						<ul className="flex flex-col gap-2.5">
							{SERVICES.map((service) => (
								<li key={service}>
									<a href="#services" className={linkClass}>
										{service}
									</a>
								</li>
							))}
						</ul>
					</div>

					<div>
						<p className="mb-4 text-xs font-medium tracking-wide text-[#D7E2EA]/45">
							יצירת קשר
						</p>
						<div className="flex flex-col items-start gap-4">
							<a
								href={PHONE_TEL}
								dir="ltr"
								className="font-light tracking-wide text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70"
								style={{ fontSize: "clamp(1.15rem, 2vw, 1.6rem)" }}
							>
								{PHONE_DISPLAY}
							</a>
							<a
								href={INSTAGRAM_URL}
								target="_blank"
								rel="noopener noreferrer"
								dir="ltr"
								className="inline-flex items-center gap-2 font-light text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70"
							>
								<Instagram size={18} strokeWidth={1.75} aria-hidden />
								{INSTAGRAM_HANDLE}
							</a>
							<a
								href={FULL_PORTFOLIO_URL}
								target="_blank"
								rel="noopener noreferrer"
								className={linkClass}
							>
								לתיק העבודות המלא
							</a>
						</div>
					</div>
				</div>

				<div className="mt-12 flex flex-col gap-4 border-t border-[#D7E2EA]/15 pt-6 sm:mt-14 sm:flex-row sm:items-end sm:justify-between">
					<p className="max-w-xl text-xs font-light leading-relaxed text-[#D7E2EA]/50 sm:text-sm">
						כל הזכויות על הצילומים והסרטונים שמורות לאביב גוטליב. אין להעתיק
						או להשתמש בעבודות בלי אישור.
					</p>
					<div className="flex flex-col items-start gap-2 sm:items-end">
						<button
							type="button"
							onClick={() => setPolicyOpen(true)}
							className="text-sm font-medium text-[#D7E2EA]/70 underline-offset-4 transition-colors duration-200 hover:text-[#D7E2EA] hover:underline"
						>
							מדיניות פרטיות
						</button>
						<p className="text-xs font-light text-[#D7E2EA]/45">
							© 2026 אביב גוטליב
						</p>
					</div>
				</div>
			</div>

			<AnimatePresence>
				{policyOpen && (
					<motion.div
						className="fixed inset-0 z-[70] flex items-end justify-center bg-black/70 p-3 sm:items-center sm:p-8"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3, ease: EASE }}
						onClick={() => setPolicyOpen(false)}
					>
						<motion.div
							role="dialog"
							aria-modal="true"
							aria-labelledby="privacy-title"
							className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-[28px] bg-[#0C0C0C] px-6 py-7 text-right text-[#D7E2EA] sm:rounded-[36px] sm:px-10 sm:py-9"
							style={{ border: "2px solid rgba(215,226,234,0.35)" }}
							initial={{ opacity: 0, y: 24 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 16 }}
							transition={{ duration: 0.35, ease: EASE }}
							onClick={(event) => event.stopPropagation()}
						>
							<div className="mb-6 flex items-start justify-between gap-4">
								<h2
									id="privacy-title"
									className="font-black leading-none"
									style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)" }}
								>
									מדיניות פרטיות
								</h2>
								<button
									type="button"
									onClick={() => setPolicyOpen(false)}
									aria-label="סגירת מדיניות הפרטיות"
									className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] transition-colors hover:bg-[#D7E2EA]/10"
								>
									<X size={20} />
								</button>
							</div>
							<div className="space-y-5 text-sm font-light leading-relaxed text-[#D7E2EA]/85 sm:text-base">
								<p>
									האתר הזה הוא אתר העבודות של אביב גוטליב, צלם ויוצר תוכן.
								</p>
								<p>
									בטופס יצירת הקשר אפשר למסור שם, מספר טלפון ותיאור של
									הצילום שאתם מחפשים. הפרטים נועדו רק כדי שאביב יוכל לחזור
									אליכם בנוגע לפנייה. אין חובה למלא את הטופס, ואפשר להתקשר
									ישירות.
								</p>
								<p>
									הפרטים לא נמכרים ולא מועברים לאחרים לצורכי פרסום. האתר לא
									משתמש בעוגיות פרסום ולא בכלי סטטיסטיקה של צד שלישי.
								</p>
								<p>
									האתר טוען גופנים מגוגל. בטעינה הזו גוגל עשויה לקבל את כתובת
									הרשת של המכשיר.
								</p>
								<p>
									לבקשה בנושא הפרטים שלכם, או למחיקה של פנייה, אפשר להתקשר
									ל־
									<a
										href={PHONE_TEL}
										dir="ltr"
										className="underline underline-offset-4 transition-opacity hover:opacity-70"
									>
										{PHONE_DISPLAY}
									</a>
									.
								</p>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</footer>
	);
}
