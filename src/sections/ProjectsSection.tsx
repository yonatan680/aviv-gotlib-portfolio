import type { MotionValue } from "framer-motion";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef, type CSSProperties } from "react";
import FadeIn from "../components/FadeIn";
import LiveProjectButton from "../components/LiveProjectButton";
import { usePortfolio } from "../context/PortfolioContext";
import { SELECTED_WORK } from "../data/portfolio";

interface Project {
	number: string;
	name: string;
	category: string;
	col1: [string, string];
	col2: string;
}

const CARD_RADIUS = "rounded-[40px] sm:rounded-[50px] md:rounded-[60px]";
const STACK_SCALE_STEP = 0.03;
/** Trailing hold after the last card, as a fraction of one card slot (30vh / 100vh). */
const STACK_HOLD = 0.3;

function stackScaleRange(index: number, total: number) {
	const units = total + STACK_HOLD;
	const depth = total - 1 - index;
	const input = [index / units];
	const output = [1];

	for (let step = 1; step <= depth; step += 1) {
		input.push((index + step) / units);
		output.push(1 - step * STACK_SCALE_STEP);
	}

	input.push(1);
	output.push(output[output.length - 1] ?? 1);

	return { input, output };
}

function ProjectCard({
	project,
	index,
	total,
	progress,
}: {
	project: Project;
	index: number;
	total: number;
	progress: MotionValue<number>;
}) {
	const { input, output } = useMemo(
		() => stackScaleRange(index, total),
		[index, total],
	);
	const scale = useTransform(progress, input, output);

	return (
		<div
			className="work-stack-item sticky min-h-[85vh] md:min-h-[100vh]"
			style={
				{
					zIndex: index + 1,
					"--stack-i": index,
				} as CSSProperties
			}
		>
			<motion.div
				className={`${CARD_RADIUS} pointer-events-auto border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8`}
				style={{
					scale,
					transformOrigin: "top center",
				}}
			>
					<div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 px-2 pb-4 sm:px-4 sm:pb-6 md:px-6 md:pb-8">
						<div className="flex items-center gap-4 sm:gap-6 md:gap-8">
							<span
								className="hero-heading font-black leading-none"
								style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
							>
								{project.number}
							</span>
							<div className="flex flex-col gap-1">
								<span
									className="font-light text-[#D7E2EA]"
									style={{
										fontSize: "clamp(0.7rem, 1.2vw, 1rem)",
										opacity: 0.6,
									}}
								>
									{project.category}
								</span>
								<h3
									className="font-medium leading-tight text-[#D7E2EA]"
									style={{ fontSize: "clamp(1.1rem, 2.4vw, 2.2rem)" }}
								>
									{project.name}
								</h3>
							</div>
						</div>
						<LiveProjectButton />
					</div>

					<div className="flex items-stretch gap-3 sm:gap-4" dir="ltr">
						<div className="flex w-[40%] flex-col gap-3 sm:gap-4">
							<img
								src={project.col1[0]}
								alt={`${project.name} — פריים 1`}
								loading="lazy"
								className={`${CARD_RADIUS} w-full object-cover`}
								style={{ height: "clamp(130px, 16vw, 230px)" }}
							/>
							<img
								src={project.col1[1]}
								alt={`${project.name} — פריים 2`}
								loading="lazy"
								className={`${CARD_RADIUS} w-full object-cover`}
								style={{ height: "clamp(160px, 22vw, 340px)" }}
							/>
						</div>
						<div className="relative w-[60%]">
							<img
								src={project.col2}
								alt={`${project.name} — פריים 3`}
								loading="lazy"
								className={`${CARD_RADIUS} absolute inset-0 h-full w-full object-cover`}
							/>
						</div>
					</div>
			</motion.div>
		</div>
	);
}

export default function ProjectsSection() {
	const containerRef = useRef<HTMLDivElement>(null);
	const { openGallery } = usePortfolio();
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end start"],
	});

	return (
		<section
			id="work"
			className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 pb-28 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pb-32 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pb-36"
		>
			<FadeIn delay={0} y={40}>
				<h2
					className="hero-heading mb-16 text-center font-black leading-none tracking-tight sm:mb-20 md:mb-28"
					style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
				>
					עבודות
				</h2>
			</FadeIn>

			<div ref={containerRef} className="mx-auto max-w-7xl">
				{SELECTED_WORK.map((project, i) => (
					<ProjectCard
						key={project.number}
						project={project}
						index={i}
						total={SELECTED_WORK.length}
						progress={scrollYProgress}
					/>
				))}
				<div className="h-[30vh]" aria-hidden="true" />
			</div>

			<FadeIn
				delay={0.1}
				y={20}
				className="relative z-30 -mt-32 mb-14 flex justify-center sm:mb-16 md:-mt-44 md:mb-20"
			>
				<button
					type="button"
					onClick={() => openGallery()}
					className="rounded-full border-2 border-[#D7E2EA] px-10 py-3.5 text-sm font-medium text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10 sm:px-12 sm:py-4 sm:text-base"
				>
					לכל העבודות
				</button>
			</FadeIn>
		</section>
	);
}
