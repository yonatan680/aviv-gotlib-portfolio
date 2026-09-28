import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import FadeIn from "../components/FadeIn";

const SERVICES = [
	{
		number: "01",
		name: "סושיאל",
		description:
			"צילום ותוכן ויזואלי שנבנה לרשתות — חד, קצבי, ועוצר את הגלילה.",
	},
	{
		number: "02",
		name: "וידאו",
		description: "צילום וידאו עם דגש על נראות, קצב וסיפור ויזואלי.",
	},
	{
		number: "03",
		name: "קליפים",
		description: "קליפים ותוכן ויזואלי לאמנים וליוצרים.",
	},
	{
		number: "04",
		name: "רילס וסיכומי אירועים",
		description:
			"רילסים וסרטוני סיכום שמרכזים את הרגעים החשובים בתנועה.",
	},
	{
		number: "05",
		name: "סטילס",
		description: "צילום סטילס לתוכן, לאנשים, למותגים ולאירועים.",
	},
];

const EASE = [0.22, 1, 0.36, 1] as const;

function useEntranceDistance() {
	const reduceMotion = useReducedMotion();
	const [isMobile, setIsMobile] = useState(() =>
		window.matchMedia("(max-width: 767px)").matches,
	);

	useEffect(() => {
		const mq = window.matchMedia("(max-width: 767px)");
		const update = () => setIsMobile(mq.matches);
		update();
		mq.addEventListener("change", update);
		return () => mq.removeEventListener("change", update);
	}, []);

	if (reduceMotion) return 0;
	return isMobile ? 64 : 160;
}

function ServiceRow({
	service,
	fromRight,
	distance,
	isLast,
}: {
	service: (typeof SERVICES)[number];
	fromRight: boolean;
	distance: number;
	isLast: boolean;
}) {
	const blockRef = useRef<HTMLDivElement>(null);
	const inView = useInView(blockRef, {
		once: true,
		amount: 0.35,
		margin: "-32% 0px -50% 0px",
	});
	const [passed, setPassed] = useState(false);
	const passedOnMount = useRef(false);

	useLayoutEffect(() => {
		const el = blockRef.current;
		if (!el) return;
		const rect = el.getBoundingClientRect();
		if (
			rect.height > 0 &&
			rect.bottom < window.innerHeight * 0.32
		) {
			passedOnMount.current = true;
			setPassed(true);
		}
	}, []);

	useEffect(() => {
		const el = blockRef.current;
		if (!el) return;
		const onScroll = () => {
			const rect = el.getBoundingClientRect();
			if (rect.height > 0 && rect.bottom < window.innerHeight * 0.32) {
				setPassed(true);
			}
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	const shown = inView || passed;
	const text = (
		<div
			dir="rtl"
			className={`min-w-0 max-w-2xl ${fromRight ? "text-right" : "text-left"}`}
		>
			<h3
				className="font-medium text-[#0C0C0C]"
				style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}
			>
				{service.name}
			</h3>
			<p
				className="mt-2 font-light leading-relaxed text-[#0C0C0C] sm:mt-3"
				style={{
					fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)",
					opacity: 0.6,
				}}
			>
				{service.description}
			</p>
		</div>
	);

	const number = (
		<span
			className="shrink-0 whitespace-nowrap font-black leading-none text-[#0C0C0C]"
			style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
		>
			{service.number}
		</span>
	);

	return (
		<div
			className={
				isLast ? undefined : "border-b border-[rgba(12,12,12,0.15)]"
			}
		>
			<motion.div
				ref={blockRef}
				key={distance}
				dir="ltr"
				className={`grid w-full min-w-0 items-start gap-6 py-8 sm:gap-10 sm:py-10 md:w-max md:max-w-full md:gap-14 md:py-12 ${
					fromRight
						? "grid-cols-[minmax(0,1fr)_auto] md:ml-auto md:grid-cols-[minmax(0,max-content)_auto]"
						: "grid-cols-[auto_minmax(0,1fr)] md:mr-auto md:grid-cols-[auto_minmax(0,max-content)]"
				}`}
				initial={{ opacity: 0, x: fromRight ? distance : -distance }}
				whileInView={{ opacity: 1, x: 0 }}
				animate={shown ? { opacity: 1, x: 0 } : undefined}
				viewport={{ once: true, amount: 0.35, margin: "-32% 0px -50% 0px" }}
				transition={{
					duration: passedOnMount.current ? 0 : 0.8,
					ease: EASE,
				}}
			>
				{fromRight ? (
					<>
						{text}
						{number}
					</>
				) : (
					<>
						{number}
						{text}
					</>
				)}
			</motion.div>
		</div>
	);
}

export default function ServicesSection() {
	const distance = useEntranceDistance();

	return (
		<section
			id="services"
			className="relative overflow-x-clip rounded-t-[40px] bg-white px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
		>
			<FadeIn delay={0} y={40}>
				<h2
					className="mb-16 text-center font-black leading-none tracking-tight text-[#0C0C0C] sm:mb-20 md:mb-28"
					style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
				>
					שירותים
				</h2>
			</FadeIn>

			<div>
				{SERVICES.map((service, index) => (
					<ServiceRow
						key={service.number}
						service={service}
						fromRight={index % 2 === 0}
						distance={distance}
						isLast={index === SERVICES.length - 1}
					/>
				))}
			</div>
		</section>
	);
}
