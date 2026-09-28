/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				kanit: ["Kanit", "sans-serif"],
				heebo: ["Heebo", "Kanit", "sans-serif"],
			},
		},
	},
	plugins: [],
};
