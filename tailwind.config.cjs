const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	plugins: [require('flowbite/plugin')],
	darkMode: 'false',
	theme: {
		fontFamily: {
			sans: ['Inter', 'system-ui']
		},
		extend: {
			colors: {
				primary: {
					900: '#061033',
					800: '#0D2066',
					700: '#133099',
					600: '#1A40CC',
					500: '#2050FF',
					400: '#4D73FF',
					300: '#7996FF',
					200: '#A6B9FF',
					100: '#D2DCFF',
					50: '#E9EEFF'
				},
				blue: {
					100: '#061033',
					90: '#0D2066',
					80: '#133099',
					70: '#1A40CC',
					60: '#2050FF',
					50: '#4D73FF',
					40: '#7996FF',
					30: '#A6B9FF',
					20: '#D2DCFF',
					10: '#E9EEFF'
				},
				yellow: {
					100: '#921B01',
					90: '#C14D00',
					80: '#DD7E15',
					70: '#F5A720',
					60: '#FFC329',
					50: '#FFCF54',
					40: '#FFDB7F',
					30: '#FFE7A9',
					20: '#FFF3D4',
					10: '#FFF9EA'
				},
				dark: {
					60: '#666979',
					30: '#B3B4BC',
					10: '#E6E6E9',
					100: 'rgba(0, 4, 31, 1)',
					a60: 'rgba(0, 4, 31, 0.6)',
					a30: 'rgba(0, 4, 31, 0.3)',
					a10: 'rgba(0, 4, 31, 0.1)'
				},
				light: {
					60: '#999BA5',
					30: '#4C4F62',
					10: '#191D35',
					100: 'rgba(255, 255,255, 1)',
					a60: 'rgba(255, 255,255, 0.6)',
					a30: 'rgba(255, 255,255, 0.3)',
					a10: 'rgba(255, 255,255, 0.1)',
					a02: 'rgba(255, 255,255, 0.02)'
				}
			},
		}
	}
};

module.exports = config;
