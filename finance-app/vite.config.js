import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // This fixes the uncaught reference error from framer-motion dev-profiling modules
    __BUNDLED_DEV__: false,
  },
});