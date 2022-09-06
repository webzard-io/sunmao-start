import * as path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sunmaoFsVitePlugin from '@sunmao-ui/vite-plugin-fs';
import routes, { type RouteConfig } from './src/routes';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8000,
  },
  plugins: [
    sunmaoFsVitePlugin({
      schemas: routes
        .filter(route => 'name' in route)
        .map((route: RouteConfig) => ({
          name: route.name,
          path: path.resolve(__dirname, `./src/applications/${route.name}.json`),
        })),
      modulesDir: path.resolve(__dirname, './src/modules'),
    }),
    react({
      // https://github.com/vitejs/vite/issues/6215
      jsxRuntime: 'classic',
    }),
  ],
  define: {
    // react-codemirror2 need this
    // https://github.com/scniro/react-codemirror2/issues/66
    global: 'globalThis',
  },
});
