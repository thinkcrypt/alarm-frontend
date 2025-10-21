import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
	theme: {
		breakpoints: {
			base: '0em', // default mobile
			xs: '20em', // 320px
			sm: '30em', // 480px
			md: '48em', // 768px
			lg: '64em', // 1024px - large laptops / MacBook
			xl: '80em', // 1280px+
			'2xl': '96em', // 1536px
		},
	},
});

export const system = createSystem(defaultConfig, config);
