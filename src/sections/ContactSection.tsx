import { AnimatePresence, motion } from "framer-motion";
import { type FormEvent, useState } from "react";
import FadeIn from "../components/FadeIn";
import { CONTACT_ENDPOINT } from "../data/portfolio";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const FIELD_CLASS =
	"w-full border-b border-[rgba(12,12,12,0.22)] bg-transparent py-3 font-medium text-[#0C0C0C] outline-none transition-colors duration-200 placeholder:font-light placeholder:text-[#0C0C0C]/35 focus:border-[#B600A8]";

interface FormValues {
	name: string;
	phone: string;
	message: string;
}

interface FormErrors {
	name?: string;
	phone?: string;
	message?: string;
	form?: string;
}

const EMPTY: FormValues = { name: "", phone: "", message: "" };

function validate(values: FormValues): FormErrors {
	const errors: FormErrors = {};
	if (!values.name.trim()) errors.name = "נא להזין שם";
	if (!values.phone.trim()) errors.phone = "נא להזין מספר טלפון";
	if (!values.message.trim()) errors.message = "ספרו לי בקצרה מה תרצו לצלם";
	return errors;
}

export default function ContactSection() {
	const [values, setValues] = useState<FormValues>(EMPTY);
	const [errors, setErrors] = useState<FormErrors>({});
	const [sending, setSending] = useState(false);
	const [sent, setSent] = useState(false);

	const setField = (key: keyof FormValues, value: string) => {
		setValues((current) => ({ ...current, [key]: value }));
		setErrors((current) => ({ ...current, [key]: undefined, form: undefined }));
		setSent(false);
	};

	const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const nextErrors = validate(values);
		setErrors(nextErrors);
		if (Object.keys(nextErrors).length > 0) return;
		if (!CONTACT_ENDPOINT) return;

		setSending(true);
		try {
			const response = await fetch(CONTACT_ENDPOINT, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: values.name.trim(),
					phone: values.phone.trim(),
					message: values.message.trim(),
				}),
			});
			if (!response.ok) throw new Error("request failed");
			setSent(true);
			setValues(EMPTY);
		} catch {
			setErrors({
				form: "לא הצלחנו לשלוח כרגע. אפשר להתקשר ישירות.",
			});
		} finally {
			setSending(false);
		}
	};

	return (
		<section
			id="contact"
			className="relative z-20 -mt-4 overflow-hidden rounded-t-[40px] bg-white px-5 py-20 sm:-mt-6 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:-mt-8 md:rounded-t-[60px] md:px-10 md:py-32"
		>
			<FadeIn delay={0} y={40}>
				<h2
					className="mx-auto mb-6 max-w-5xl text-center font-black leading-[0.95] tracking-tight text-[#0C0C0C] sm:mb-8"
					style={{ fontSize: "clamp(2.2rem, 7vw, 96px)" }}
				>
					יש לכם משהו בראש?
					<br />
					בואו נצלם אותו.
				</h2>
			</FadeIn>

			<FadeIn delay={0.1} y={24}>
				<p
					className="mx-auto mb-12 max-w-xl text-center font-medium leading-relaxed text-[#0C0C0C]/70 sm:mb-16"
					style={{ fontSize: "clamp(1.05rem, 2vw, 1.45rem)" }}
				>
					ספרו לי בקצרה מה אתם רוצים ליצור ואחזור אליכם.
				</p>
			</FadeIn>

			<form
				onSubmit={onSubmit}
				noValidate
				className="mx-auto flex w-full max-w-2xl flex-col gap-8"
			>
				<FadeIn delay={0.16} y={28}>
					<label className="block">
						<span className="mb-1 block text-sm font-medium text-[#0C0C0C]/55">
							שם מלא
						</span>
						<input
							type="text"
							name="name"
							autoComplete="name"
							value={values.name}
							onChange={(event) => setField("name", event.target.value)}
							aria-invalid={errors.name ? true : undefined}
							className={FIELD_CLASS}
							style={{ fontSize: "clamp(1.15rem, 2vw, 1.7rem)" }}
						/>
						<FieldError message={errors.name} />
					</label>
				</FadeIn>

				<FadeIn delay={0.24} y={28}>
					<label className="block">
						<span className="mb-1 block text-sm font-medium text-[#0C0C0C]/55">
							טלפון
						</span>
						<input
							type="tel"
							name="phone"
							dir="ltr"
							inputMode="tel"
							autoComplete="tel"
							value={values.phone}
							onChange={(event) => setField("phone", event.target.value)}
							aria-invalid={errors.phone ? true : undefined}
							className={`${FIELD_CLASS} text-end`}
							style={{ fontSize: "clamp(1.15rem, 2vw, 1.7rem)" }}
						/>
						<FieldError message={errors.phone} />
					</label>
				</FadeIn>

				<FadeIn delay={0.32} y={28}>
					<label className="block">
						<span className="mb-1 block text-sm font-medium text-[#0C0C0C]/55">
							מה תרצו לצלם?
						</span>
						<textarea
							name="message"
							rows={4}
							value={values.message}
							placeholder="ספרו לי קצת על הצילום שאתם מחפשים..."
							onChange={(event) => setField("message", event.target.value)}
							aria-invalid={errors.message ? true : undefined}
							className={`${FIELD_CLASS} resize-none leading-relaxed`}
							style={{ fontSize: "clamp(1.05rem, 1.8vw, 1.35rem)" }}
						/>
						<FieldError message={errors.message} />
					</label>
				</FadeIn>

				<FadeIn delay={0.4} y={20}>
					<div className="flex flex-col items-center gap-6 pt-2">
						<button
							type="submit"
							disabled={sending}
							className="inline-block rounded-full px-10 py-3.5 text-center text-sm font-medium text-white transition-[filter,transform] duration-200 hover:scale-[1.03] hover:brightness-110 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 sm:px-12 sm:py-4 sm:text-base"
							style={{
								background:
									"linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
								boxShadow:
									"0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset",
								outline: "2px solid #FFFFFF",
								outlineOffset: "-3px",
							}}
						>
							{sending ? "שולח..." : "שלחו לי"}
						</button>
						<FieldError message={errors.form} />
						{sent ? (
							<p className="text-center text-sm font-medium text-[#0C0C0C]">
								הפנייה נשלחה. אביב יחזור אליכם.
							</p>
						) : null}
					</div>
				</FadeIn>
			</form>
		</section>
	);
}

function FieldError({ message }: { message?: string }) {
	return (
		<AnimatePresence initial={false}>
			{message ? (
				<motion.p
					key={message}
					role="alert"
					initial={{ opacity: 0, y: 8 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 4 }}
					transition={{ duration: 0.28, ease: EASE }}
					className="mt-2 text-sm font-medium text-[#B600A8]"
				>
					{message}
				</motion.p>
			) : null}
		</AnimatePresence>
	);
}
