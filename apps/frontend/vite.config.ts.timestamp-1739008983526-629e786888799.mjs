// ../frontend/vite.config.ts
import { defineConfig } from "file:///Users/mathieuchambaud/Documents/Perso-Projects/monorepo-biume/node_modules/.pnpm/vite@5.4.14_@types+node@20.17.17_terser@5.38.1/node_modules/vite/dist/node/index.js";
import { vitePlugin as remix } from "file:///Users/mathieuchambaud/Documents/Perso-Projects/monorepo-biume/node_modules/.pnpm/@remix-run+dev@2.15.3_@remix-run+react@2.15.3_react-dom@18.3.1_react@18.3.1__react@18.3.1_typ_xen7fplvixnswvesgpld4ernbu/node_modules/@remix-run/dev/dist/index.js";
import { installGlobals } from "file:///Users/mathieuchambaud/Documents/Perso-Projects/monorepo-biume/node_modules/.pnpm/@remix-run+node@2.15.3_typescript@5.7.3/node_modules/@remix-run/node/dist/index.js";
import tsconfigPaths from "file:///Users/mathieuchambaud/Documents/Perso-Projects/monorepo-biume/node_modules/.pnpm/vite-tsconfig-paths@4.3.2_typescript@5.7.3_vite@5.4.14_@types+node@20.17.17_terser@5.38.1_/node_modules/vite-tsconfig-paths/dist/index.mjs";
import tailwindcss from "file:///Users/mathieuchambaud/Documents/Perso-Projects/monorepo-biume/node_modules/.pnpm/tailwindcss@3.4.17_ts-node@10.9.2_@types+node@20.17.17_typescript@5.7.3_/node_modules/tailwindcss/lib/index.js";
import autoprefixer from "file:///Users/mathieuchambaud/Documents/Perso-Projects/monorepo-biume/node_modules/.pnpm/autoprefixer@10.4.20_postcss@8.5.1/node_modules/autoprefixer/lib/autoprefixer.js";

// ../frontend/tailwind.config.ts
import { resolve } from "path";
var __vite_injected_original_dirname = "/Users/mathieuchambaud/Documents/Perso-Projects/monorepo-biume/apps/frontend";
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
        }
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vZnJvbnRlbmQvdml0ZS5jb25maWcudHMiLCAiLi4vZnJvbnRlbmQvdGFpbHdpbmQuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL21hdGhpZXVjaGFtYmF1ZC9Eb2N1bWVudHMvUGVyc28tUHJvamVjdHMvbW9ub3JlcG8tYml1bWUvYXBwcy9mcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL21hdGhpZXVjaGFtYmF1ZC9Eb2N1bWVudHMvUGVyc28tUHJvamVjdHMvbW9ub3JlcG8tYml1bWUvYXBwcy9mcm9udGVuZC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvbWF0aGlldWNoYW1iYXVkL0RvY3VtZW50cy9QZXJzby1Qcm9qZWN0cy9tb25vcmVwby1iaXVtZS9hcHBzL2Zyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB7IHZpdGVQbHVnaW4gYXMgcmVtaXggfSBmcm9tIFwiQHJlbWl4LXJ1bi9kZXZcIjtcbmltcG9ydCB7IGluc3RhbGxHbG9iYWxzIH0gZnJvbSBcIkByZW1peC1ydW4vbm9kZVwiO1xuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSBcInZpdGUtdHNjb25maWctcGF0aHNcIjtcbmltcG9ydCB0YWlsd2luZGNzcyBmcm9tIFwidGFpbHdpbmRjc3NcIjtcbmltcG9ydCBhdXRvcHJlZml4ZXIgZnJvbSBcImF1dG9wcmVmaXhlclwiO1xuaW1wb3J0IHRhaWx3aW5kQ29uZmlnIGZyb20gXCIuL3RhaWx3aW5kLmNvbmZpZ1wiO1xuXG5pbnN0YWxsR2xvYmFscygpO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVtaXgoe1xuICAgICAgc2VydmVyTW9kdWxlRm9ybWF0OiBcImVzbVwiLFxuICAgICAgZnV0dXJlOiB7XG4gICAgICAgIHYzX2ZldGNoZXJQZXJzaXN0OiB0cnVlLFxuICAgICAgICB2M19yZWxhdGl2ZVNwbGF0UGF0aDogdHJ1ZSxcbiAgICAgICAgdjNfdGhyb3dBYm9ydFJlYXNvbjogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSksXG4gICAgdHNjb25maWdQYXRocygpLFxuICBdLFxuICBjc3M6IHtcbiAgICBwb3N0Y3NzOiB7XG4gICAgICBwbHVnaW5zOiBbXG4gICAgICAgIHRhaWx3aW5kY3NzKHRhaWx3aW5kQ29uZmlnKSxcbiAgICAgICAgYXV0b3ByZWZpeGVyKCksXG4gICAgICBdLFxuICAgIH0sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgY3NzTWluaWZ5OiB0cnVlLFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBhc3NldEZpbGVOYW1lczogXCJhc3NldHMvW25hbWVdW2V4dG5hbWVdXCIsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDMwMDAsXG4gIH0sXG59KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL21hdGhpZXVjaGFtYmF1ZC9Eb2N1bWVudHMvUGVyc28tUHJvamVjdHMvbW9ub3JlcG8tYml1bWUvYXBwcy9mcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL21hdGhpZXVjaGFtYmF1ZC9Eb2N1bWVudHMvUGVyc28tUHJvamVjdHMvbW9ub3JlcG8tYml1bWUvYXBwcy9mcm9udGVuZC90YWlsd2luZC5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL21hdGhpZXVjaGFtYmF1ZC9Eb2N1bWVudHMvUGVyc28tUHJvamVjdHMvbW9ub3JlcG8tYml1bWUvYXBwcy9mcm9udGVuZC90YWlsd2luZC5jb25maWcudHNcIjtpbXBvcnQgdHlwZSB7IENvbmZpZyB9IGZyb20gXCJ0YWlsd2luZGNzc1wiO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XG5cbmNvbnN0IGNvbmZpZyA9IHtcbiAgICBkYXJrTW9kZTogW1wiY2xhc3NcIl0sXG4gICAgY29udGVudDogW1xuICAgIHJlc29sdmUoX19kaXJuYW1lLCBcImFwcC8qKi8qLntqcyxqc3gsdHMsdHN4fVwiKSxcbiAgICByZXNvbHZlKF9fZGlybmFtZSwgXCJhcHAvcm91dGVzLyoqLyoue2pzLGpzeCx0cyx0c3h9XCIpLFxuICBdLFxuICB0aGVtZToge1xuICBcdGV4dGVuZDoge1xuICBcdFx0Ym9yZGVyUmFkaXVzOiB7XG4gIFx0XHRcdGxnOiAndmFyKC0tcmFkaXVzKScsXG4gIFx0XHRcdG1kOiAnY2FsYyh2YXIoLS1yYWRpdXMpIC0gMnB4KScsXG4gIFx0XHRcdHNtOiAnY2FsYyh2YXIoLS1yYWRpdXMpIC0gNHB4KSdcbiAgXHRcdH0sXG4gIFx0XHRjb2xvcnM6IHtcbiAgXHRcdFx0YmFja2dyb3VuZDogJ2hzbCh2YXIoLS1iYWNrZ3JvdW5kKSknLFxuICBcdFx0XHRmb3JlZ3JvdW5kOiAnaHNsKHZhcigtLWZvcmVncm91bmQpKScsXG4gIFx0XHRcdGNhcmQ6IHtcbiAgXHRcdFx0XHRERUZBVUxUOiAnaHNsKHZhcigtLWNhcmQpKScsXG4gIFx0XHRcdFx0Zm9yZWdyb3VuZDogJ2hzbCh2YXIoLS1jYXJkLWZvcmVncm91bmQpKSdcbiAgXHRcdFx0fSxcbiAgXHRcdFx0cG9wb3Zlcjoge1xuICBcdFx0XHRcdERFRkFVTFQ6ICdoc2wodmFyKC0tcG9wb3ZlcikpJyxcbiAgXHRcdFx0XHRmb3JlZ3JvdW5kOiAnaHNsKHZhcigtLXBvcG92ZXItZm9yZWdyb3VuZCkpJ1xuICBcdFx0XHR9LFxuICBcdFx0XHRwcmltYXJ5OiB7XG4gIFx0XHRcdFx0REVGQVVMVDogJ2hzbCh2YXIoLS1wcmltYXJ5KSknLFxuICBcdFx0XHRcdGZvcmVncm91bmQ6ICdoc2wodmFyKC0tcHJpbWFyeS1mb3JlZ3JvdW5kKSknXG4gIFx0XHRcdH0sXG4gIFx0XHRcdHNlY29uZGFyeToge1xuICBcdFx0XHRcdERFRkFVTFQ6ICdoc2wodmFyKC0tc2Vjb25kYXJ5KSknLFxuICBcdFx0XHRcdGZvcmVncm91bmQ6ICdoc2wodmFyKC0tc2Vjb25kYXJ5LWZvcmVncm91bmQpKSdcbiAgXHRcdFx0fSxcbiAgXHRcdFx0bXV0ZWQ6IHtcbiAgXHRcdFx0XHRERUZBVUxUOiAnaHNsKHZhcigtLW11dGVkKSknLFxuICBcdFx0XHRcdGZvcmVncm91bmQ6ICdoc2wodmFyKC0tbXV0ZWQtZm9yZWdyb3VuZCkpJ1xuICBcdFx0XHR9LFxuICBcdFx0XHRhY2NlbnQ6IHtcbiAgXHRcdFx0XHRERUZBVUxUOiAnaHNsKHZhcigtLWFjY2VudCkpJyxcbiAgXHRcdFx0XHRmb3JlZ3JvdW5kOiAnaHNsKHZhcigtLWFjY2VudC1mb3JlZ3JvdW5kKSknXG4gIFx0XHRcdH0sXG4gIFx0XHRcdGRlc3RydWN0aXZlOiB7XG4gIFx0XHRcdFx0REVGQVVMVDogJ2hzbCh2YXIoLS1kZXN0cnVjdGl2ZSkpJyxcbiAgXHRcdFx0XHRmb3JlZ3JvdW5kOiAnaHNsKHZhcigtLWRlc3RydWN0aXZlLWZvcmVncm91bmQpKSdcbiAgXHRcdFx0fSxcbiAgXHRcdFx0Ym9yZGVyOiAnaHNsKHZhcigtLWJvcmRlcikpJyxcbiAgXHRcdFx0aW5wdXQ6ICdoc2wodmFyKC0taW5wdXQpKScsXG4gIFx0XHRcdHJpbmc6ICdoc2wodmFyKC0tcmluZykpJyxcbiAgXHRcdFx0Y2hhcnQ6IHtcbiAgXHRcdFx0XHQnMSc6ICdoc2wodmFyKC0tY2hhcnQtMSkpJyxcbiAgXHRcdFx0XHQnMic6ICdoc2wodmFyKC0tY2hhcnQtMikpJyxcbiAgXHRcdFx0XHQnMyc6ICdoc2wodmFyKC0tY2hhcnQtMykpJyxcbiAgXHRcdFx0XHQnNCc6ICdoc2wodmFyKC0tY2hhcnQtNCkpJyxcbiAgXHRcdFx0XHQnNSc6ICdoc2wodmFyKC0tY2hhcnQtNSkpJ1xuICBcdFx0XHR9XG4gIFx0XHR9XG4gIFx0fVxuICB9LFxuICBwbHVnaW5zOiBbXSxcbn0gc2F0aXNmaWVzIENvbmZpZztcblxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFzWixTQUFTLG9CQUFvQjtBQUNuYixTQUFTLGNBQWMsYUFBYTtBQUNwQyxTQUFTLHNCQUFzQjtBQUMvQixPQUFPLG1CQUFtQjtBQUMxQixPQUFPLGlCQUFpQjtBQUN4QixPQUFPLGtCQUFrQjs7O0FDSnpCLFNBQVMsZUFBZTtBQUR4QixJQUFNLG1DQUFtQztBQUd6QyxJQUFNLFNBQVM7QUFBQSxFQUNYLFVBQVUsQ0FBQyxPQUFPO0FBQUEsRUFDbEIsU0FBUztBQUFBLElBQ1QsUUFBUSxrQ0FBVywwQkFBMEI7QUFBQSxJQUM3QyxRQUFRLGtDQUFXLGlDQUFpQztBQUFBLEVBQ3REO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTixRQUFRO0FBQUEsTUFDUCxjQUFjO0FBQUEsUUFDYixJQUFJO0FBQUEsUUFDSixJQUFJO0FBQUEsUUFDSixJQUFJO0FBQUEsTUFDTDtBQUFBLE1BQ0EsUUFBUTtBQUFBLFFBQ1AsWUFBWTtBQUFBLFFBQ1osWUFBWTtBQUFBLFFBQ1osTUFBTTtBQUFBLFVBQ0wsU0FBUztBQUFBLFVBQ1QsWUFBWTtBQUFBLFFBQ2I7QUFBQSxRQUNBLFNBQVM7QUFBQSxVQUNSLFNBQVM7QUFBQSxVQUNULFlBQVk7QUFBQSxRQUNiO0FBQUEsUUFDQSxTQUFTO0FBQUEsVUFDUixTQUFTO0FBQUEsVUFDVCxZQUFZO0FBQUEsUUFDYjtBQUFBLFFBQ0EsV0FBVztBQUFBLFVBQ1YsU0FBUztBQUFBLFVBQ1QsWUFBWTtBQUFBLFFBQ2I7QUFBQSxRQUNBLE9BQU87QUFBQSxVQUNOLFNBQVM7QUFBQSxVQUNULFlBQVk7QUFBQSxRQUNiO0FBQUEsUUFDQSxRQUFRO0FBQUEsVUFDUCxTQUFTO0FBQUEsVUFDVCxZQUFZO0FBQUEsUUFDYjtBQUFBLFFBQ0EsYUFBYTtBQUFBLFVBQ1osU0FBUztBQUFBLFVBQ1QsWUFBWTtBQUFBLFFBQ2I7QUFBQSxRQUNBLFFBQVE7QUFBQSxRQUNSLE9BQU87QUFBQSxRQUNQLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxVQUNOLEtBQUs7QUFBQSxVQUNMLEtBQUs7QUFBQSxVQUNMLEtBQUs7QUFBQSxVQUNMLEtBQUs7QUFBQSxVQUNMLEtBQUs7QUFBQSxRQUNOO0FBQUEsTUFDRDtBQUFBLElBQ0Q7QUFBQSxFQUNEO0FBQUEsRUFDQSxTQUFTLENBQUM7QUFDWjtBQUVBLElBQU8sMEJBQVE7OztBRHZEZixlQUFlO0FBRWYsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLE1BQ0osb0JBQW9CO0FBQUEsTUFDcEIsUUFBUTtBQUFBLFFBQ04sbUJBQW1CO0FBQUEsUUFDbkIsc0JBQXNCO0FBQUEsUUFDdEIscUJBQXFCO0FBQUEsTUFDdkI7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELGNBQWM7QUFBQSxFQUNoQjtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gsU0FBUztBQUFBLE1BQ1AsU0FBUztBQUFBLFFBQ1AsWUFBWSx1QkFBYztBQUFBLFFBQzFCLGFBQWE7QUFBQSxNQUNmO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFdBQVc7QUFBQSxJQUNYLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGdCQUFnQjtBQUFBLE1BQ2xCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
