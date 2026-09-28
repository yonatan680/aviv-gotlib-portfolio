import type { MotionValue } from "framer-motion";
import { motion, useScroll, useTransform } from "framer-motion";
import type { CSSProperties } from "react";
import { useRef } from "react";

export interface TextSegment {
	text: string;
	className?: string;
	block?: boolean;
}

interface AnimatedTextProps {
	text?: string;
	segments?: TextSegment[];
	className?: string;
	style?: CSSProperties;
}

interface CharProps {
	char: string;
	progress: MotionValue<number>;
	range: [number, number];
}

function Char({ char, progress, range }: CharProps) {
	const opacity = useTransform(progress, range, [0.2, 1]);

	return (
		<motion.span className="inline-block" style={{ opacity }}>
			{char}
		</motion.span>
	);
}

function renderWords(
	text: string,
	progress: MotionValue<number>,
	charOffset: number,
	totalChars: number,
) {
	const words = text.split(" ");
	let localCursor = 0;

	return words.map((word, wordIndex) => {
		const wordStart = charOffset + localCursor;
		localCursor += word.length + (wordIndex < words.length - 1 ? 1 : 0);
		return (
			<span key={wordIndex}>
				<span className="inline-block">
					{word.split("").map((char, charIndex) => {
						const globalIndex = wordStart + charIndex;
						return (
							<Char
								key={charIndex}
								char={char}
								progress={progress}
								range={[
									globalIndex / totalChars,
									Math.min((globalIndex + 1) / totalChars, 1),
								]}
							/>
						);
					})}
				</span>
				{wordIndex < words.length - 1 ? " " : null}
			</span>
		);
	});
}

/**
 * Character-by-character scroll reveal: each character fades from 0.2 to
 * full opacity as the paragraph moves through the viewport. Characters are
 * grouped per word (inline-block) so line wrapping only happens at spaces.
 */
export default function AnimatedText({
	text,
	segments,
	className,
	style,
}: AnimatedTextProps) {
	const ref = useRef<HTMLParagraphElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start 0.8", "end 0.2"],
	});

	const resolvedSegments: TextSegment[] =
		segments ?? (text ? [{ text }] : []);
	const totalChars = resolvedSegments.reduce(
		(sum, segment) => sum + segment.text.length,
		0,
	);

	let charOffset = 0;

	return (
		<p ref={ref} className={className} style={style} dir="rtl">
			{resolvedSegments.map((segment, segmentIndex) => {
				const segmentStart = charOffset;
				charOffset += segment.text.length;
				const blockClass = segment.block ? "mt-6 block" : "";
				const segmentClass = [segment.className, blockClass]
					.filter(Boolean)
					.join(" ");

				return (
					<span key={segmentIndex} className={segmentClass || undefined}>
						{renderWords(
							segment.text,
							scrollYProgress,
							segmentStart,
							totalChars,
						)}
					</span>
				);
			})}
		</p>
	);
}
