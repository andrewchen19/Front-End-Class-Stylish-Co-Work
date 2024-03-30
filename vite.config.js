import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
// import mkcert from "vite-plugin-mkcert";

export default defineConfig(() => {
  return {
    plugins: [react()],
  };
});

// return {
//   plugins: [react(), mkcert()],
//   server: {
//     https: true,
//   },
// };
