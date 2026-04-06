import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
		"./1775480207092306355.html"
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				display: ['Cormorant Garamond', 'serif'],
				sans: ['IBM Plex Sans', 'sans-serif'],
			},
			colors: {
				gold: {
					50: '#fdf9ed',
					100: '#f9edcb',
					200: '#f2d98a',
					300: '#e9c04a',
					400: '#d4a827',
					500: '#b8891a',
					600: '#9a6e14',
					700: '#7a5310',
					800: '#5e3f0d',
					900: '#4a300a',
				},
				dark: {
					50: '#f5f4f2',
					100: '#e0ddd8',
					200: '#c4bfb8',
					300: '#a09890',
					400: '#7a7068',
					500: '#5a5248',
					600: '#3d3830',
					700: '#2a2520',
					800: '#1a1612',
					900: '#0e0c09',
					950: '#07060400',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
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
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					from: { opacity: '0', transform: 'translateY(20px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in-slow': {
					from: { opacity: '0' },
					to: { opacity: '1' }
				},
				'slide-up': {
					from: { opacity: '0', transform: 'translateY(40px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'33%': { transform: 'translateY(-18px) rotate(1deg)' },
					'66%': { transform: 'translateY(-8px) rotate(-1deg)' },
				},
				'float-slow': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-24px)' },
				},
				'spin-slow': {
					from: { transform: 'rotate(0deg)' },
					to: { transform: 'rotate(360deg)' },
				},
				'spin-reverse': {
					from: { transform: 'rotate(360deg)' },
					to: { transform: 'rotate(0deg)' },
				},
				'pulse-gold': {
					'0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
					'50%': { opacity: '0.7', transform: 'scale(1.05)' },
				},
				'marquee': {
					from: { transform: 'translateX(0)' },
					to: { transform: 'translateX(-50%)' },
				},
				'draw-line': {
					from: { strokeDashoffset: '1000' },
					to: { strokeDashoffset: '0' },
				},
				'morph': {
					'0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
					'50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
				},
				'glow-pulse': {
					'0%, 100%': { boxShadow: '0 0 20px rgba(201,168,76,0.1)' },
					'50%': { boxShadow: '0 0 60px rgba(201,168,76,0.3), 0 0 100px rgba(201,168,76,0.1)' },
				},
				'text-shimmer': {
					'0%': { backgroundPosition: '-200% center' },
					'100%': { backgroundPosition: '200% center' },
				},
				'orbit': {
					from: { transform: 'rotate(0deg) translateX(120px) rotate(0deg)' },
					to: { transform: 'rotate(360deg) translateX(120px) rotate(-360deg)' },
				},
				'orbit-reverse': {
					from: { transform: 'rotate(0deg) translateX(80px) rotate(0deg)' },
					to: { transform: 'rotate(-360deg) translateX(80px) rotate(360deg)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.8s ease-out forwards',
				'fade-in-slow': 'fade-in-slow 1.2s ease-out forwards',
				'slide-up': 'slide-up 0.7s ease-out forwards',
				'float': 'float 6s ease-in-out infinite',
				'float-slow': 'float-slow 9s ease-in-out infinite',
				'spin-slow': 'spin-slow 20s linear infinite',
				'spin-reverse': 'spin-reverse 15s linear infinite',
				'pulse-gold': 'pulse-gold 3s ease-in-out infinite',
				'marquee': 'marquee 30s linear infinite',
				'morph': 'morph 8s ease-in-out infinite',
				'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
				'text-shimmer': 'text-shimmer 3s linear infinite',
				'orbit': 'orbit 12s linear infinite',
				'orbit-reverse': 'orbit-reverse 8s linear infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;