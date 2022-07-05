const path = require('path');
const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));
const { changeLibFile } = require('./utils/code');
const { toFirstLetterUppercase } = require('./utils/string');
const { isNotEmpty, assert } = require('./utils/assert');

const libPath = path.resolve(__dirname, '../src/sunmao/lib.ts');

function createFile(version, name) {
  const targetPath = path.resolve(
    __dirname,
    `../src/sunmao/components/${toFirstLetterUppercase(name)}.tsx`
  );
  let template = fs.readFileSync(path.resolve(__dirname, './templates/component.tsx'), {
    encoding: 'utf-8',
  });

  template = template.replace('custom/v1', version);
  template = template.replace('componentName', name);
  template = template.replace('componentDisplayName', toFirstLetterUppercase(name));

  return fs.writeFileSync(targetPath, template, { encoding: 'utf-8' });
}

function changeLibComponents(name) {
  const codes = fs.readFileSync(libPath, { encoding: 'utf-8' });

  const newCodes = changeLibFile(codes, 'components', name);

  fs.writeFileSync(libPath, newCodes);
}

async function createComponent(version, name) {
  const { default: chalk } = await import('chalk');

  try {
    assert('version', version, isNotEmpty);
    assert('name', name, isNotEmpty);

    createFile(version, name);
    changeLibComponents(name);

    console.log(chalk.green('Create component success!'));
  } catch (error) {
    console.log(chalk.red(error.message));
    console.log(
      chalk.red('Example: npm run add:component -- --version custom/v1 --name button')
    );
  }
}

createComponent(argv.version, argv.name);

module.exports = createComponent;
