import { tailwindSafeColors } from "./src/utils/";
import type { Config } from "tailwindcss";

export default {
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			'z-background': {
  				DEFAULT: 'hsl(var(--z-background-primary))',
  				secondary: 'hsl(var(--z-background-secondary))'
  			},
  			'z-foreground': {
  				DEFAULT: 'var(--z-foreground-primary)',
  				secondary: 'var(--z-foreground-secondary)'
  			},
  			'z-component': 'var(--z-component)',
			'z-component-border': 'hsl(var(--z-component-border))',
			'z-destructive': 'hsl(var(--z-destructive))',
			'z-destructive-hover': 'hsl(var(--z-destructive-hover))',
			'z-destructive-warm': 'hsl(var(--z-destructive-warm))',
			'z-destructive-warm-hover': 'hsl(var(--z-destructive-warm-hover))',
  			button: 'hsl(var(--z-button))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			component: 'var(--component)',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		fontFamily: {
  			gambarino: [
  				'Gambarino-Regular',
  				'Helvetica',
  				'sans-serif'
  			],
  			switzer: [
  				'Switzer-Regular',
  				'Helvetica',
  				'sans-serif'
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  safelist: tailwindSafeColors,
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
