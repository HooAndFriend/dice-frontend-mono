// vite.config.ts
import react from 'file:///D:/study/dicefront/dice-frontend-mono/node_modules/.pnpm/@vitejs+plugin-react-swc@3.5.0_@swc+helpers@0.5.2_vite@4.5.2_@types+node@20.5.2_terser@5.26.0_/node_modules/@vitejs/plugin-react-swc/index.mjs'
import { defineConfig } from 'file:///D:/study/dicefront/dice-frontend-mono/node_modules/.pnpm/vite@4.5.2_@types+node@20.5.2_terser@5.26.0/node_modules/vite/dist/node/index.js'
import { resolve } from 'path'
import tailwindcss from 'file:///D:/study/dicefront/dice-frontend-mono/node_modules/.pnpm/tailwindcss@3.4.1_ts-node@10.9.1_@swc+core@1.3.100_@swc+helpers@0.5.2__@types+node@20.5.2_typescript@5.2.2_/node_modules/tailwindcss/lib/index.js'
import autoprefixer from 'file:///D:/study/dicefront/dice-frontend-mono/node_modules/.pnpm/autoprefixer@10.4.17_postcss@8.4.33/node_modules/autoprefixer/lib/autoprefixer.js'
var __dirname = process.cwd()
var vite_config_default = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, ''),
    },
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss(resolve(__dirname, './tailwind.config.js')),
        autoprefixer,
      ],
    },
  },
})
export { vite_config_default as default }
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxzdHVkeVxcXFxkaWNlZnJvbnRcXFxcZGljZS1mcm9udGVuZC1tb25vXFxcXGFwcHNcXFxcYWRtaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHN0dWR5XFxcXGRpY2Vmcm9udFxcXFxkaWNlLWZyb250ZW5kLW1vbm9cXFxcYXBwc1xcXFxhZG1pblxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovc3R1ZHkvZGljZWZyb250L2RpY2UtZnJvbnRlbmQtbW9uby9hcHBzL2FkbWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXN3YydcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXHJcbmltcG9ydCB0YWlsd2luZGNzcyBmcm9tICd0YWlsd2luZGNzcydcclxuaW1wb3J0IGF1dG9wcmVmaXhlciBmcm9tICdhdXRvcHJlZml4ZXInXHJcblxyXG5jb25zdCBfX2Rpcm5hbWUgPSBwcm9jZXNzLmN3ZCgpXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnQCc6IHJlc29sdmUoX19kaXJuYW1lLCAnJyksXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgY3NzOiB7XHJcbiAgICBwb3N0Y3NzOiB7XHJcbiAgICAgIHBsdWdpbnM6IFtcclxuICAgICAgICB0YWlsd2luZGNzcyhyZXNvbHZlKF9fZGlybmFtZSwgJy4vdGFpbHdpbmQuY29uZmlnLmpzJykpLFxyXG4gICAgICAgIGF1dG9wcmVmaXhlcixcclxuICAgICAgXSxcclxuICAgIH0sXHJcbiAgfSxcclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE4VSxPQUFPLFdBQVc7QUFDaFcsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxlQUFlO0FBQ3hCLE9BQU8saUJBQWlCO0FBQ3hCLE9BQU8sa0JBQWtCO0FBRXpCLElBQU0sWUFBWSxRQUFRLElBQUk7QUFFOUIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssUUFBUSxXQUFXLEVBQUU7QUFBQSxJQUM1QjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNILFNBQVM7QUFBQSxNQUNQLFNBQVM7QUFBQSxRQUNQLFlBQVksUUFBUSxXQUFXLHNCQUFzQixDQUFDO0FBQUEsUUFDdEQ7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
