import { useEffect, useRef, type MutableRefObject } from "react";
import { MARQUEE_IMAGES } from "../data/portfolio";

const ROW_ONE = MARQUEE_IMAGES.slice(0, 11);
const ROW_TWO = MARQUEE_IMAGES.slice(11);

const rowTransform = (offsetPx: number) =>
	`translateX(calc(-33.3333% + ${offsetPx}px))`;

function MarqueeRow({
	images,
	rowRef,
	initialOffset,
}: {
	images: string[];
	rowRef: MutableRefObject<HTMLDivElement | null>;
	initialOffset: number;
}) {
	const tripled = [...images, ...images, ...images];
	return (
		<div
			ref={rowRef}
			className="flex w-max gap-3"
			style={{
				transform: rowTransform(initialOffset),
				willChange: "transform",
			}}
		>
			{tripled.map((src, i) => (
				<img
					key={`${i}-${src}`}
					src={src}
					alt=""
					loading="lazy"
					className="h-[270px] w-[420px] shrink-0 rounded-2xl object-cover"
				/>
			))}
		</div>
	);
}

export default function MarqueeSection() {
	const sectionRef = useRef<HTMLElement>(null);
	const rowOneRef = useRef<HTMLDivElement>(null);
	const rowTwoRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		let frame = 0;
		const update = () => {
			const section = sectionRef.current;
			const rowOne = rowOneRef.current;
			const rowTwo = rowTwoRef.current;
			if (!section || !rowOne || !rowTwo) return;

			const offset =
				(window.scrollY - section.offsetTop + window.innerHeight) * 0.3;
			rowOne.style.transform = rowTransform(offset - 200);
			rowTwo.style.transform = rowTransform(-(offset - 200));
		};

		const onScroll = () => {
			if (frame) return;
			frame = requestAnimationFrame(() => {
				update();
				frame = 0;
			});
		};

		update();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", update);
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", update);
			if (frame) cancelAnimationFrame(frame);
		};
	}, []);

	return (
		<section
			ref={sectionRef}
			dir="ltr"
			className="flex flex-col gap-3 overflow-hidden bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40"
		>
			<MarqueeRow images={ROW_ONE} rowRef={rowOneRef} initialOffset={-200} />
			<MarqueeRow images={ROW_TWO} rowRef={rowTwoRef} initialOffset={200} />
		</section>
	);
}
