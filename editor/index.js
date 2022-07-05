const { createServer } = require('vite');
const path = require('path');

(async () => {
  const server = await createServer({
    configFile: path.resolve(__dirname, '../vite.config.ts'),
    publicDir: path.resolve(__dirname, '../public'),
    root: __dirname,
    server: {
      port: 3000,
      force: true
    }
  });

  await server.listen();

  server.printUrls();
})();
