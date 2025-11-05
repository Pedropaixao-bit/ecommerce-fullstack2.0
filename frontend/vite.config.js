import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Em Vercel, o app é servido na raiz do domínio, então o base deve ser '/'
  // ou simplesmente omitido. Manter explícito para evitar confusão.
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});
