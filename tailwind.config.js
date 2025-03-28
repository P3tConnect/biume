import { default as flattenColorPalette } from 'tailwindcss/lib/util/flattenColorPalette';
import { withUt } from 'uploadthing/tw'

const darkMode = ["class"]
const content = [
    "./node_modules/@uploadthing/react/dist**",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./emails/**/*.{ts,tsx}",
];
const prefix = "";
const theme = {
    container: {
        center: true,
        padding: "2rem",
        screens: {
            "2xl": "1400px",
        },
    },
    extend: {
        backgroundImage: {
            'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            'gradient-radial-br': 'radial-gradient(circle at bottom right, var(--tw-gradient-stops))',
        },
        colors: {
            border: "hsl(var(--border))",
            input: "hsl(var(--input))",
            ring: "hsl(var(--ring))",
            background: "hsl(var(--background))",
            foreground: "hsl(var(--foreground))",
            primary: {
                DEFAULT: "hsl(var(--primary))",
                foreground: "hsl(var(--primary-foreground))",
            },
            secondary: {
                DEFAULT: "hsl(var(--secondary))",
                foreground: "hsl(var(--secondary-foreground))",
            },
            gray: {
                DEFAULT: "hsl(var(--gray))",
                foreground: "hsl(var(--gray-foreground))",
            },
            destructive: {
                DEFAULT: "hsl(var(--destructive))",
                foreground: "hsl(var(--destructive-foreground))",
            },
            muted: {
                DEFAULT: "hsl(var(--muted))",
                foreground: "hsl(var(--muted-foreground))",
            },
            accent: {
                DEFAULT: "hsl(var(--accent))",
                foreground: "hsl(var(--accent-foreground))",
            },
            popover: {
                DEFAULT: "hsl(var(--popover))",
                foreground: "hsl(var(--popover-foreground))",
            },
            card: {
                DEFAULT: "hsl(var(--card))",
                foreground: "hsl(var(--card-foreground))",
            },
            sidebar: {
                DEFAULT: 'hsl(var(--sidebar-background))',
                foreground: 'hsl(var(--sidebar-foreground))',
                primary: 'hsl(var(--sidebar-primary))',
                'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
                accent: 'hsl(var(--sidebar-accent))',
                'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
                border: 'hsl(var(--sidebar-border))',
                ring: 'hsl(var(--sidebar-ring))',
            },
        },
        borderRadius: {
            lg: "var(--radius)",
            md: "calc(var(--radius) - 2px)",
            sm: "calc(var(--radius) - 4px)",
        },
        keyframes: {
            marquee: {
                from: { transform: "translateX(0)" },
                to: { transform: "translateX(calc(-100% - var(--gap)))" },
            },
            "marquee-vertical": {
                from: { transform: "translateY(0)" },
                to: { transform: "translateY(calc(-100% - var(--gap)))" },
            },
            "border-beam": {
                "100%": {
                    "offset-distance": "100%",
                },
            },
            "accordion-down": {
                from: { height: "0" },
                to: { height: "var(--radix-accordion-content-height)" },
            },
            "accordion-up": {
                from: { height: "var(--radix-accordion-content-height)" },
                to: { height: "0" },
            },
            ripple: {
                "0%, 100%": {
                    transform: "translate(-50%, -50%) scale(1)",
                },
                "50%": {
                    transform: "translate(-50%, -50%) scale(0.9)",
                },
            },
            gradient: {
                "0%, 100%": {
                    "background-position": "0% 50%"
                },
                "50%": {
                    "background-position": "100% 50%"
                }
            }
        },
        animation: {
            marquee: "marquee var(--duration) linear infinite",
            "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
            "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
            "accordion-down": "accordion-down 0.2s ease-out",
            "accordion-up": "accordion-up 0.2s ease-out",
            ripple: "ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite",
        },
    },
};
const plugins = [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    addVariablesForColors
];

function addVariablesForColors({ addBase, theme }) {
    let allColors = flattenColorPalette(theme("colors"));
    let newVars = Object.fromEntries(
        Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
    );

    addBase({
        ":root": newVars,
    });
}

export default withUt({
    content,
    plugins,
    prefix,
    theme,
    darkMode,
});