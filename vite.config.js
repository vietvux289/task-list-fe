import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dns from 'dns'
// https://vitejs.dev/config/server-options.html#server-options
dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    hmr: {
      overlay: false, // 👈 Tắt overlay lỗi
    },
  },
  build: {
    minify: false,
  },
  name: "passive-event-fix",
  configureServer(server) {
  },
});
