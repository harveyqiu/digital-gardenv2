/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontSize: {
			'base': '1.25rem',
			'lg': '1.50rem',
			'xl': '1.75rem',
			'2xl': '2rem',
		},
		extend: {},
	},
	plugins: [],
}
