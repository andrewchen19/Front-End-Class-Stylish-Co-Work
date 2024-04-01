import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";

export default defineConfig(() => {
  return {
    plugins: [react(), mkcert()],
    server: {
      port: 8080,
      https: true,
    },
  };
});
