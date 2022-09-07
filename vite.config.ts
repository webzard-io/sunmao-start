import * as path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sunmaoFsVitePlugin from '@sunmao-ui/vite-plugin-fs';
import routes, { type RouteConfig } from './src/routes';

const routeConfigs = routes.filter(route => 'name' in route) as RouteConfig[];

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8000,
  },
  plugins: [
    sunmaoFsVitePlugin({
      schemas: routeConfigs.map(route => ({
        name: route.name,
        path: path.resolve(__dirname, `./src/applications/${route.name}.json`),
      })),
      modulesDir: path.resolve(__dirname, './src/modules'),
    }),
    react(),
  ],
});
