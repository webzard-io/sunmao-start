const { toFirstLetterUppercase } = require('./string');
const {
  createSourceFile,
  createPrinter,
  transform,
  visitEachChild,
  visitNode,
  factory,
  SyntaxKind,
  ScriptTarget,
  ScriptKind,
} = require('typescript');

exports.changeLibFile = function changeLibFile(codes, type, name) {
  const varMap = {};
  const printer = createPrinter();
  const source = createSourceFile(
    'lib.ts',
    codes,
    ScriptTarget.ES2015,
    true,
    ScriptKind.TS
  );
  const realName = type === 'components' ? toFirstLetterUppercase(name) : name;

  source.statements = [
    factory.createImportDeclaration(
      undefined,
      undefined,
      factory.createImportClause(false, factory.createIdentifier(realName)),
      factory.createStringLiteral(`./${type}/${realName}`)
    ),
    ...source.statements,
  ];

  const result = transform(source, [
    function (context) {
      return function (rootNode) {
        function visit(node) {
          if (node.kind === SyntaxKind.VariableDeclarationList) {
            node.declarations.forEach(declaration => {
              varMap[declaration.name.escapedText] = declaration;
            });
          } else if (
            (node.kind === SyntaxKind.ShorthandPropertyAssignment ||
              (node.kind === SyntaxKind.PropertyAssignment &&
                node.initializer.kind === SyntaxKind.Identifier)) &&
            node.name.escapedText === type
          ) {
            // the property's value is a variable, such as `{ components }`, `{ components: components }`
            // it should update the variable's value
            const target = varMap[node.name.escapedText];

            target.parent.declarations = target.parent.declarations.map(declaration => {
              if (declaration.name.escapedText === type) {
                declaration.initializer = factory.createArrayLiteralExpression([
                  ...declaration.initializer.elements,
                  factory.createIdentifier(realName),
                ]);

                return declaration;
              }

              return declaration;
            });
          } else if (
            node.kind === SyntaxKind.PropertyAssignment &&
            node.name.escapedText === type
          ) {
            // the property's value is an array, such as `{ components: [Font] }`
            // then update the array's value directly
            if (node.initializer.kind === SyntaxKind.ArrayLiteralExpression) {
              return factory.createPropertyAssignment(
                node.name,
                factory.createArrayLiteralExpression([
                  ...node.initializer.elements,
                  factory.createIdentifier(realName),
                ])
              );
            }
          }

          return visitEachChild(node, visit, context);
        }

        return visitNode(rootNode, visit);
      };
    },
  ]);

  return printer.printFile(result.transformed[0]).replace(/"/g, "'");
};

exports.changeRoutesFile = function changeRoutesFile(codes, { name, path }) {
  const source = createSourceFile(
    'routes.ts',
    codes,
    ScriptTarget.ES2015,
    true,
    ScriptKind.TS
  );
  const printer = createPrinter();

  const result = transform(source, [
    function (context) {
      return function (rootNode) {
        function visit(node) {
          if (
            node.kind === SyntaxKind.VariableDeclaration &&
            node.name.escapedText === 'routes'
          ) {
            // insert the new route config into the `routes`
            return factory.createVariableDeclaration(
              node.name,
              node.exclamationToken,
              node.type,
              factory.createArrayLiteralExpression([
                ...node.initializer.elements,
                factory.createObjectLiteralExpression([
                  factory.createPropertyAssignment(
                    factory.createIdentifier('name'),
                    factory.createStringLiteral(name)
                  ),
                  factory.createPropertyAssignment(
                    factory.createIdentifier('path'),
                    factory.createStringLiteral(path)
                  ),
                ]),
              ])
            );
          }

          return visitEachChild(node, visit, context);
        }

        return visitNode(rootNode, visit);
      };
    },
  ]);

  return printer.printFile(result.transformed[0]);
};
