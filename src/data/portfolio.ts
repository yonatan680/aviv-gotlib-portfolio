export const FULL_PORTFOLIO_URL =
	"https://photos.google.com/share/AF1QipPhQjxGgVVChd0OEvfRFGCKClt5R8faWgdnTuUruLkAaxg2UpcpkQ6krK-Bja0BvA?key=YkdDdkpzMFM4V3RURVZfdGdqNzBCejlNYS04TGN3";

export const PHONE_DISPLAY = "054-254-3737";
export const PHONE_TEL = "tel:0542543737";

export const INSTAGRAM_URL = "https://www.instagram.com/aviv_vip/";
export const INSTAGRAM_HANDLE = "@aviv_vip";

/** POST JSON `{ name, phone, message }` here when a lead endpoint exists. */
export const CONTACT_ENDPOINT: string | null = null;

export const workSrc = (n: number) =>
	`./work/${String(n).padStart(3, "0")}.jpg`;

export const ALL_WORK = Array.from({ length: 230 }, (_, i) => workSrc(i + 1));

export const HERO_IMAGE = "./camera.png";

export const MARQUEE_IMAGES = [
	workSrc(1),
	workSrc(18),
	workSrc(2),
	workSrc(15),
	workSrc(130),
	workSrc(3),
	workSrc(20),
	workSrc(90),
	workSrc(6),
	workSrc(50),
	workSrc(65),
	workSrc(222),
	workSrc(226),
	workSrc(225),
	workSrc(228),
	workSrc(220),
	workSrc(100),
	workSrc(35),
	workSrc(70),
	workSrc(210),
	workSrc(22),
];

export const ABOUT_STILLS = [
	{
		src: workSrc(18),
		position: "top-[4%] left-[1%] sm:left-[2%] md:left-[4%]",
		width: "w-[112px] sm:w-[150px] md:w-[200px]",
		delay: 0.1,
		x: -80,
	},
	{
		src: workSrc(225),
		position: "bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]",
		width: "w-[100px] sm:w-[138px] md:w-[176px]",
		delay: 0.25,
		x: -80,
	},
	{
		src: workSrc(226),
		position: "top-[4%] right-[1%] sm:right-[2%] md:right-[4%]",
		width: "w-[112px] sm:w-[150px] md:w-[200px]",
		delay: 0.15,
		x: 80,
	},
	{
		src: workSrc(90),
		position: "bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]",
		width: "w-[120px] sm:w-[160px] md:w-[210px]",
		delay: 0.3,
		x: 80,
	},
];

export const SELECTED_WORK = [
	{
		number: "01",
		name: "סושיאל",
		category: "תוכן",
		col1: [workSrc(2), workSrc(3)] as [string, string],
		col2: workSrc(22),
	},
	{
		number: "02",
		name: "וידאו",
		category: "במה",
		col1: [workSrc(18), workSrc(15)] as [string, string],
		col2: workSrc(130),
	},
	{
		number: "03",
		name: "סטילס",
		category: "צילום",
		col1: [workSrc(225), workSrc(228)] as [string, string],
		col2: workSrc(226),
	},
];
