import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
],
	theme: {
		extend: {
			colors:{
				primeColor: "#262626",
				lightText: "#6D6D6D"
			},
			boxShadow: {
				textShadow: "0px 0px 54px -13px rgba(0,0,0,0.7)"
			}
		}
	},
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	plugins: [require("tailwindcss-animate")],
};
export default config;
