const path = require('path');
const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));
const { changeLibFile } = require('./utils/code');
const { isNotEmpty, assert } = require('./utils/assert');

const libPath = path.resolve(__dirname, '../src/sunmao/lib.ts');

function createFile(version, name) {
  const targetPath = path.resolve(__dirname, `../src/sunmao/traits/${name}.ts`);
  let template = fs.readFileSync(path.resolve(__dirname, './templates/trait.ts'), {
    encoding: 'utf-8',
  });

  template = template.replace('custom/v1', version);
  template = template.replace('traitName', name);

  return fs.writeFileSync(targetPath, template, { encoding: 'utf-8' });
}

function changeLibTraits(name) {
  const codes = fs.readFileSync(libPath, { encoding: 'utf-8' });

  const newCodes = changeLibFile(codes, 'traits', name);

  fs.writeFileSync(libPath, newCodes);
}

async function createTrait(version, name) {
  const { default: chalk } = await import('chalk');

  try {
    assert('version', version, isNotEmpty);
    assert('name', name, isNotEmpty);

    createFile(version, name);
    changeLibTraits(name);

    console.log(chalk.green('Create trait success!'));
  } catch (error) {
    console.log(chalk.red(error.message));
    console.log(
      chalk.red('Example: npm run add:trait -- --version custom/v1 --name validation')
    );
  }
}

createTrait(argv.version, argv.name);

module.exports = createTrait;
