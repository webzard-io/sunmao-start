const path = require('path');
const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));
const { changeRoutesFile } = require('./utils/code');
const { assert, isNotEmpty } = require('./utils/assert');

const routesPath = path.resolve(__dirname, '../src/routes.ts');

function createFile(name) {
  let json = fs.readFileSync(path.resolve(__dirname, './templates/application.json'), {
    encoding: 'utf-8',
  });

  if (json) {
    const targetPath = path.resolve(__dirname, `../src/applications/${name}.json`);

    if (fs.existsSync(targetPath)) {
      throw new Error('The application schema file is exist.');
    } else {
      json = json.replace('appName', name);
      fs.writeFileSync(targetPath, json, { encoding: 'utf-8' });
    }
  }
}

function changeRoutes(name, routePath) {
  const codes = fs.readFileSync(routesPath, { encoding: 'utf-8' });
  const newCodes = changeRoutesFile(codes, { name, path: routePath });

  return fs.writeFileSync(routesPath, newCodes, { encoding: 'utf-8' });
}

async function createApplication(name, routePath) {
  const { default: chalk } = await import('chalk');

  try {
    assert('name', name, isNotEmpty);
    assert('path', routePath, isNotEmpty);

    createFile(name);
    changeRoutes(name, routePath);

    console.log(chalk.green('Create application success.'));
  } catch (error) {
    console.log(chalk.red(error.message));
    console.log(chalk.red('Example: npm run add:app -- --name home --path /home'));
  }
}

createApplication(argv.name, argv.path);

module.exports = createApplication;
