// ../frontend/vite.config.ts
import { defineConfig } from "file:///Users/graig/Documents/projet-perso/biume/node_modules/.pnpm/vite@5.4.14_@types+node@20.17.17_terser@5.38.1/node_modules/vite/dist/node/index.js";
import { vitePlugin as remix } from "file:///Users/graig/Documents/projet-perso/biume/node_modules/.pnpm/@remix-run+dev@2.15.3_@remix-run+react@2.15.3_react-dom@18.3.1_react@18.3.1__react@18.3_42ce5da553d2bc113858beb37135fedd/node_modules/@remix-run/dev/dist/index.js";
import { installGlobals } from "file:///Users/graig/Documents/projet-perso/biume/node_modules/.pnpm/@remix-run+node@2.15.3_typescript@5.7.3/node_modules/@remix-run/node/dist/index.js";
import tsconfigPaths from "file:///Users/graig/Documents/projet-perso/biume/node_modules/.pnpm/vite-tsconfig-paths@4.3.2_typescript@5.7.3_vite@5.4.14_@types+node@20.17.17_terser@5.38.1_/node_modules/vite-tsconfig-paths/dist/index.mjs";
import tailwindcss from "file:///Users/graig/Documents/projet-perso/biume/node_modules/.pnpm/tailwindcss@3.4.17_ts-node@10.9.2_@types+node@20.17.17_typescript@5.7.3_/node_modules/tailwindcss/lib/index.js";
import autoprefixer from "file:///Users/graig/Documents/projet-perso/biume/node_modules/.pnpm/autoprefixer@10.4.20_postcss@8.5.1/node_modules/autoprefixer/lib/autoprefixer.js";

// ../frontend/tailwind.config.ts
import { resolve } from "path";
var __vite_injected_original_dirname = "/Users/graig/Documents/projet-perso/biume/apps/frontend";
var config = {
  darkMode: ["class"],
  content: [
    resolve(__vite_injected_original_dirname, "app/**/*.{js,jsx,ts,tsx}"),
    resolve(__vite_injected_original_dirname, "app/routes/**/*.{js,jsx,ts,tsx}")
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))"
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))"
        }
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0"
          },
          to: {
            height: "var(--radix-accordion-content-height)"
          }
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)"
          },
          to: {
            height: "0"
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      }
    }
  },
  plugins: []
};
var tailwind_config_default = config;

// ../frontend/vite.config.ts
installGlobals();
var vite_config_default = defineConfig({
  plugins: [
    remix({
      serverModuleFormat: "esm",
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true
      }
    }),
    tsconfigPaths()
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss(tailwind_config_default),
        autoprefixer()
      ]
    }
  },
  build: {
    cssMinify: true,
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name][extname]"
      }
    }
  },
  server: {
    port: 3e3
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vZnJvbnRlbmQvdml0ZS5jb25maWcudHMiLCAiLi4vZnJvbnRlbmQvdGFpbHdpbmQuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2dyYWlnL0RvY3VtZW50cy9wcm9qZXQtcGVyc28vYml1bWUvYXBwcy9mcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2dyYWlnL0RvY3VtZW50cy9wcm9qZXQtcGVyc28vYml1bWUvYXBwcy9mcm9udGVuZC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvZ3JhaWcvRG9jdW1lbnRzL3Byb2pldC1wZXJzby9iaXVtZS9hcHBzL2Zyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB7IHZpdGVQbHVnaW4gYXMgcmVtaXggfSBmcm9tIFwiQHJlbWl4LXJ1bi9kZXZcIjtcbmltcG9ydCB7IGluc3RhbGxHbG9iYWxzIH0gZnJvbSBcIkByZW1peC1ydW4vbm9kZVwiO1xuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSBcInZpdGUtdHNjb25maWctcGF0aHNcIjtcbmltcG9ydCB0YWlsd2luZGNzcyBmcm9tIFwidGFpbHdpbmRjc3NcIjtcbmltcG9ydCBhdXRvcHJlZml4ZXIgZnJvbSBcImF1dG9wcmVmaXhlclwiO1xuaW1wb3J0IHRhaWx3aW5kQ29uZmlnIGZyb20gXCIuL3RhaWx3aW5kLmNvbmZpZ1wiO1xuXG5pbnN0YWxsR2xvYmFscygpO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVtaXgoe1xuICAgICAgc2VydmVyTW9kdWxlRm9ybWF0OiBcImVzbVwiLFxuICAgICAgZnV0dXJlOiB7XG4gICAgICAgIHYzX2ZldGNoZXJQZXJzaXN0OiB0cnVlLFxuICAgICAgICB2M19yZWxhdGl2ZVNwbGF0UGF0aDogdHJ1ZSxcbiAgICAgICAgdjNfdGhyb3dBYm9ydFJlYXNvbjogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSksXG4gICAgdHNjb25maWdQYXRocygpLFxuICBdLFxuICBjc3M6IHtcbiAgICBwb3N0Y3NzOiB7XG4gICAgICBwbHVnaW5zOiBbXG4gICAgICAgIHRhaWx3aW5kY3NzKHRhaWx3aW5kQ29uZmlnKSxcbiAgICAgICAgYXV0b3ByZWZpeGVyKCksXG4gICAgICBdLFxuICAgIH0sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgY3NzTWluaWZ5OiB0cnVlLFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBhc3NldEZpbGVOYW1lczogXCJhc3NldHMvW25hbWVdW2V4dG5hbWVdXCIsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDMwMDAsXG4gIH0sXG59KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2dyYWlnL0RvY3VtZW50cy9wcm9qZXQtcGVyc28vYml1bWUvYXBwcy9mcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2dyYWlnL0RvY3VtZW50cy9wcm9qZXQtcGVyc28vYml1bWUvYXBwcy9mcm9udGVuZC90YWlsd2luZC5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2dyYWlnL0RvY3VtZW50cy9wcm9qZXQtcGVyc28vYml1bWUvYXBwcy9mcm9udGVuZC90YWlsd2luZC5jb25maWcudHNcIjtpbXBvcnQgdHlwZSB7IENvbmZpZyB9IGZyb20gXCJ0YWlsd2luZGNzc1wiO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XG5cbmNvbnN0IGNvbmZpZyA9IHtcbiAgICBkYXJrTW9kZTogW1wiY2xhc3NcIl0sXG4gICAgY29udGVudDogW1xuICAgIHJlc29sdmUoX19kaXJuYW1lLCBcImFwcC8qKi8qLntqcyxqc3gsdHMsdHN4fVwiKSxcbiAgICByZXNvbHZlKF9fZGlybmFtZSwgXCJhcHAvcm91dGVzLyoqLyoue2pzLGpzeCx0cyx0c3h9XCIpLFxuICBdLFxuICB0aGVtZToge1xuICBcdGV4dGVuZDoge1xuICBcdFx0Ym9yZGVyUmFkaXVzOiB7XG4gIFx0XHRcdGxnOiAndmFyKC0tcmFkaXVzKScsXG4gIFx0XHRcdG1kOiAnY2FsYyh2YXIoLS1yYWRpdXMpIC0gMnB4KScsXG4gIFx0XHRcdHNtOiAnY2FsYyh2YXIoLS1yYWRpdXMpIC0gNHB4KSdcbiAgXHRcdH0sXG4gIFx0XHRjb2xvcnM6IHtcbiAgXHRcdFx0YmFja2dyb3VuZDogJ2hzbCh2YXIoLS1iYWNrZ3JvdW5kKSknLFxuICBcdFx0XHRmb3JlZ3JvdW5kOiAnaHNsKHZhcigtLWZvcmVncm91bmQpKScsXG4gIFx0XHRcdGNhcmQ6IHtcbiAgXHRcdFx0XHRERUZBVUxUOiAnaHNsKHZhcigtLWNhcmQpKScsXG4gIFx0XHRcdFx0Zm9yZWdyb3VuZDogJ2hzbCh2YXIoLS1jYXJkLWZvcmVncm91bmQpKSdcbiAgXHRcdFx0fSxcbiAgXHRcdFx0cG9wb3Zlcjoge1xuICBcdFx0XHRcdERFRkFVTFQ6ICdoc2wodmFyKC0tcG9wb3ZlcikpJyxcbiAgXHRcdFx0XHRmb3JlZ3JvdW5kOiAnaHNsKHZhcigtLXBvcG92ZXItZm9yZWdyb3VuZCkpJ1xuICBcdFx0XHR9LFxuICBcdFx0XHRwcmltYXJ5OiB7XG4gIFx0XHRcdFx0REVGQVVMVDogJ2hzbCh2YXIoLS1wcmltYXJ5KSknLFxuICBcdFx0XHRcdGZvcmVncm91bmQ6ICdoc2wodmFyKC0tcHJpbWFyeS1mb3JlZ3JvdW5kKSknXG4gIFx0XHRcdH0sXG4gIFx0XHRcdHNlY29uZGFyeToge1xuICBcdFx0XHRcdERFRkFVTFQ6ICdoc2wodmFyKC0tc2Vjb25kYXJ5KSknLFxuICBcdFx0XHRcdGZvcmVncm91bmQ6ICdoc2wodmFyKC0tc2Vjb25kYXJ5LWZvcmVncm91bmQpKSdcbiAgXHRcdFx0fSxcbiAgXHRcdFx0bXV0ZWQ6IHtcbiAgXHRcdFx0XHRERUZBVUxUOiAnaHNsKHZhcigtLW11dGVkKSknLFxuICBcdFx0XHRcdGZvcmVncm91bmQ6ICdoc2wodmFyKC0tbXV0ZWQtZm9yZWdyb3VuZCkpJ1xuICBcdFx0XHR9LFxuICBcdFx0XHRhY2NlbnQ6IHtcbiAgXHRcdFx0XHRERUZBVUxUOiAnaHNsKHZhcigtLWFjY2VudCkpJyxcbiAgXHRcdFx0XHRmb3JlZ3JvdW5kOiAnaHNsKHZhcigtLWFjY2VudC1mb3JlZ3JvdW5kKSknXG4gIFx0XHRcdH0sXG4gIFx0XHRcdGRlc3RydWN0aXZlOiB7XG4gIFx0XHRcdFx0REVGQVVMVDogJ2hzbCh2YXIoLS1kZXN0cnVjdGl2ZSkpJyxcbiAgXHRcdFx0XHRmb3JlZ3JvdW5kOiAnaHNsKHZhcigtLWRlc3RydWN0aXZlLWZvcmVncm91bmQpKSdcbiAgXHRcdFx0fSxcbiAgXHRcdFx0Ym9yZGVyOiAnaHNsKHZhcigtLWJvcmRlcikpJyxcbiAgXHRcdFx0aW5wdXQ6ICdoc2wodmFyKC0taW5wdXQpKScsXG4gIFx0XHRcdHJpbmc6ICdoc2wodmFyKC0tcmluZykpJyxcbiAgXHRcdFx0Y2hhcnQ6IHtcbiAgXHRcdFx0XHQnMSc6ICdoc2wodmFyKC0tY2hhcnQtMSkpJyxcbiAgXHRcdFx0XHQnMic6ICdoc2wodmFyKC0tY2hhcnQtMikpJyxcbiAgXHRcdFx0XHQnMyc6ICdoc2wodmFyKC0tY2hhcnQtMykpJyxcbiAgXHRcdFx0XHQnNCc6ICdoc2wodmFyKC0tY2hhcnQtNCkpJyxcbiAgXHRcdFx0XHQnNSc6ICdoc2wodmFyKC0tY2hhcnQtNSkpJ1xuICBcdFx0XHR9LFxuICBcdFx0XHRzaWRlYmFyOiB7XG4gIFx0XHRcdFx0REVGQVVMVDogJ2hzbCh2YXIoLS1zaWRlYmFyLWJhY2tncm91bmQpKScsXG4gIFx0XHRcdFx0Zm9yZWdyb3VuZDogJ2hzbCh2YXIoLS1zaWRlYmFyLWZvcmVncm91bmQpKScsXG4gIFx0XHRcdFx0cHJpbWFyeTogJ2hzbCh2YXIoLS1zaWRlYmFyLXByaW1hcnkpKScsXG4gIFx0XHRcdFx0J3ByaW1hcnktZm9yZWdyb3VuZCc6ICdoc2wodmFyKC0tc2lkZWJhci1wcmltYXJ5LWZvcmVncm91bmQpKScsXG4gIFx0XHRcdFx0YWNjZW50OiAnaHNsKHZhcigtLXNpZGViYXItYWNjZW50KSknLFxuICBcdFx0XHRcdCdhY2NlbnQtZm9yZWdyb3VuZCc6ICdoc2wodmFyKC0tc2lkZWJhci1hY2NlbnQtZm9yZWdyb3VuZCkpJyxcbiAgXHRcdFx0XHRib3JkZXI6ICdoc2wodmFyKC0tc2lkZWJhci1ib3JkZXIpKScsXG4gIFx0XHRcdFx0cmluZzogJ2hzbCh2YXIoLS1zaWRlYmFyLXJpbmcpKSdcbiAgXHRcdFx0fVxuICBcdFx0fSxcbiAgXHRcdGtleWZyYW1lczoge1xuICBcdFx0XHQnYWNjb3JkaW9uLWRvd24nOiB7XG4gIFx0XHRcdFx0ZnJvbToge1xuICBcdFx0XHRcdFx0aGVpZ2h0OiAnMCdcbiAgXHRcdFx0XHR9LFxuICBcdFx0XHRcdHRvOiB7XG4gIFx0XHRcdFx0XHRoZWlnaHQ6ICd2YXIoLS1yYWRpeC1hY2NvcmRpb24tY29udGVudC1oZWlnaHQpJ1xuICBcdFx0XHRcdH1cbiAgXHRcdFx0fSxcbiAgXHRcdFx0J2FjY29yZGlvbi11cCc6IHtcbiAgXHRcdFx0XHRmcm9tOiB7XG4gIFx0XHRcdFx0XHRoZWlnaHQ6ICd2YXIoLS1yYWRpeC1hY2NvcmRpb24tY29udGVudC1oZWlnaHQpJ1xuICBcdFx0XHRcdH0sXG4gIFx0XHRcdFx0dG86IHtcbiAgXHRcdFx0XHRcdGhlaWdodDogJzAnXG4gIFx0XHRcdFx0fVxuICBcdFx0XHR9XG4gIFx0XHR9LFxuICBcdFx0YW5pbWF0aW9uOiB7XG4gIFx0XHRcdCdhY2NvcmRpb24tZG93bic6ICdhY2NvcmRpb24tZG93biAwLjJzIGVhc2Utb3V0JyxcbiAgXHRcdFx0J2FjY29yZGlvbi11cCc6ICdhY2NvcmRpb24tdXAgMC4ycyBlYXNlLW91dCdcbiAgXHRcdH1cbiAgXHR9XG4gIH0sXG4gIHBsdWdpbnM6IFtdLFxufSBzYXRpc2ZpZXMgQ29uZmlnO1xuXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXVWLFNBQVMsb0JBQW9CO0FBQ3BYLFNBQVMsY0FBYyxhQUFhO0FBQ3BDLFNBQVMsc0JBQXNCO0FBQy9CLE9BQU8sbUJBQW1CO0FBQzFCLE9BQU8saUJBQWlCO0FBQ3hCLE9BQU8sa0JBQWtCOzs7QUNKekIsU0FBUyxlQUFlO0FBRHhCLElBQU0sbUNBQW1DO0FBR3pDLElBQU0sU0FBUztBQUFBLEVBQ1gsVUFBVSxDQUFDLE9BQU87QUFBQSxFQUNsQixTQUFTO0FBQUEsSUFDVCxRQUFRLGtDQUFXLDBCQUEwQjtBQUFBLElBQzdDLFFBQVEsa0NBQVcsaUNBQWlDO0FBQUEsRUFDdEQ7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNOLFFBQVE7QUFBQSxNQUNQLGNBQWM7QUFBQSxRQUNiLElBQUk7QUFBQSxRQUNKLElBQUk7QUFBQSxRQUNKLElBQUk7QUFBQSxNQUNMO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDUCxZQUFZO0FBQUEsUUFDWixZQUFZO0FBQUEsUUFDWixNQUFNO0FBQUEsVUFDTCxTQUFTO0FBQUEsVUFDVCxZQUFZO0FBQUEsUUFDYjtBQUFBLFFBQ0EsU0FBUztBQUFBLFVBQ1IsU0FBUztBQUFBLFVBQ1QsWUFBWTtBQUFBLFFBQ2I7QUFBQSxRQUNBLFNBQVM7QUFBQSxVQUNSLFNBQVM7QUFBQSxVQUNULFlBQVk7QUFBQSxRQUNiO0FBQUEsUUFDQSxXQUFXO0FBQUEsVUFDVixTQUFTO0FBQUEsVUFDVCxZQUFZO0FBQUEsUUFDYjtBQUFBLFFBQ0EsT0FBTztBQUFBLFVBQ04sU0FBUztBQUFBLFVBQ1QsWUFBWTtBQUFBLFFBQ2I7QUFBQSxRQUNBLFFBQVE7QUFBQSxVQUNQLFNBQVM7QUFBQSxVQUNULFlBQVk7QUFBQSxRQUNiO0FBQUEsUUFDQSxhQUFhO0FBQUEsVUFDWixTQUFTO0FBQUEsVUFDVCxZQUFZO0FBQUEsUUFDYjtBQUFBLFFBQ0EsUUFBUTtBQUFBLFFBQ1IsT0FBTztBQUFBLFFBQ1AsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFVBQ04sS0FBSztBQUFBLFVBQ0wsS0FBSztBQUFBLFVBQ0wsS0FBSztBQUFBLFVBQ0wsS0FBSztBQUFBLFVBQ0wsS0FBSztBQUFBLFFBQ047QUFBQSxRQUNBLFNBQVM7QUFBQSxVQUNSLFNBQVM7QUFBQSxVQUNULFlBQVk7QUFBQSxVQUNaLFNBQVM7QUFBQSxVQUNULHNCQUFzQjtBQUFBLFVBQ3RCLFFBQVE7QUFBQSxVQUNSLHFCQUFxQjtBQUFBLFVBQ3JCLFFBQVE7QUFBQSxVQUNSLE1BQU07QUFBQSxRQUNQO0FBQUEsTUFDRDtBQUFBLE1BQ0EsV0FBVztBQUFBLFFBQ1Ysa0JBQWtCO0FBQUEsVUFDakIsTUFBTTtBQUFBLFlBQ0wsUUFBUTtBQUFBLFVBQ1Q7QUFBQSxVQUNBLElBQUk7QUFBQSxZQUNILFFBQVE7QUFBQSxVQUNUO0FBQUEsUUFDRDtBQUFBLFFBQ0EsZ0JBQWdCO0FBQUEsVUFDZixNQUFNO0FBQUEsWUFDTCxRQUFRO0FBQUEsVUFDVDtBQUFBLFVBQ0EsSUFBSTtBQUFBLFlBQ0gsUUFBUTtBQUFBLFVBQ1Q7QUFBQSxRQUNEO0FBQUEsTUFDRDtBQUFBLE1BQ0EsV0FBVztBQUFBLFFBQ1Ysa0JBQWtCO0FBQUEsUUFDbEIsZ0JBQWdCO0FBQUEsTUFDakI7QUFBQSxJQUNEO0FBQUEsRUFDRDtBQUFBLEVBQ0EsU0FBUyxDQUFDO0FBQ1o7QUFFQSxJQUFPLDBCQUFROzs7QUR2RmYsZUFBZTtBQUVmLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxNQUNKLG9CQUFvQjtBQUFBLE1BQ3BCLFFBQVE7QUFBQSxRQUNOLG1CQUFtQjtBQUFBLFFBQ25CLHNCQUFzQjtBQUFBLFFBQ3RCLHFCQUFxQjtBQUFBLE1BQ3ZCO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxjQUFjO0FBQUEsRUFDaEI7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNILFNBQVM7QUFBQSxNQUNQLFNBQVM7QUFBQSxRQUNQLFlBQVksdUJBQWM7QUFBQSxRQUMxQixhQUFhO0FBQUEsTUFDZjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxXQUFXO0FBQUEsSUFDWCxlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixnQkFBZ0I7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
