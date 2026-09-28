import AnimatedText from "../components/AnimatedText";
import ContactButton from "../components/ContactButton";
import FadeIn from "../components/FadeIn";
import { ABOUT_STILLS } from "../data/portfolio";

const ABOUT_TEXT =
	"היי אני אביב גוטליב, צלם ויוצר תוכן שחי את העולם הוויזואלי ומחפש בכל צילום את הרגע שאי אפשר להתעלם ממנו. מסושיאל ורילסים ועד קליפים, אירועים וסטילס — אני לא מגיע רק כדי לצלם, אלא כדי ליצור תוכן שמרגיש אחרת ונשאר בראש.";

const ABOUT_TAGLINE =
	"יש לכם רעיון? בואו נהפוך אותו למשהו שאנשים יעצרו בשבילו.";

export default function AboutSection() {
	return (
		<section
			id="about"
			className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-20 sm:px-8 md:px-10"
		>
			{ABOUT_STILLS.map(({ src, position, width, delay, x }) => (
				<div key={src} className={`pointer-events-none absolute ${position}`}>
					<FadeIn delay={delay} x={x} y={0} duration={0.9}>
						<img
							src={src}
							alt=""
							loading="lazy"
							className={`${width} rounded-[22px] object-cover sm:rounded-[28px]`}
							style={{
								aspectRatio: "4 / 5",
								filter: "drop-shadow(0 18px 30px rgba(0,0,0,0.45))",
							}}
							draggable={false}
						/>
					</FadeIn>
				</div>
			))}

			<div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
				<div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
					<FadeIn delay={0} y={40}>
						<h2
							className="hero-heading text-center font-black leading-none tracking-tight"
							style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
						>
							אודות
						</h2>
					</FadeIn>
					<AnimatedText
						className="max-w-[560px] text-center leading-relaxed text-[#D7E2EA]"
						style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)" }}
						segments={[
							{ text: ABOUT_TEXT, className: "font-medium" },
							{
								text: ABOUT_TAGLINE,
								className: "font-bold",
								block: true,
							},
						]}
					/>
				</div>
				<FadeIn delay={0.15} y={20}>
					<ContactButton glowRing>בואו נדבר</ContactButton>
				</FadeIn>
			</div>
		</section>
	);
}
