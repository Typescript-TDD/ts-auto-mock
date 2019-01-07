import * as ts from 'typescript';
import * as path from 'path';
import { createFactoryExport, createImport, ExportWithIdentifier } from './helpers';
import { GetDescriptor } from '../src/transformer/descriptor/descriptor';
import { stringify } from 'querystring';

interface ImportDefinition {
    filepath: string;
    name: string;
}

const cache = new Map<ts.Node, ImportDefinition>();
const exportList = new Map<string, ExportWithIdentifier[]>();
const exportMap = new Map<string, Map<string, number>>();
const importList = new Map<string, ts.ImportDeclaration[]>();

export default function transformer(program: ts.Program): ts.TransformerFactory<ts.SourceFile> {
    return (context: ts.TransformationContext) => (file: ts.SourceFile) => {
        let sourceFile = visitNodeAndChildren(file, program, context);
        const importsToAdd = importList.get(sourceFile.fileName);
        const exportsToAdd = exportList.get(sourceFile.fileName);

        // console.log('File:', sourceFile.fileName);
        // console.log('Imports', (importsToAdd||[]).map(x => x.getText()));
        // console.log('Exports', (exportsToAdd||[]).map(x => x.identifier.text));

        sourceFile = ts.updateSourceFileNode(sourceFile, [
            ...importsToAdd||[],
            ...(exportsToAdd||[]).map(x => x.exportDeclaration),
            ...sourceFile.statements
        ]);

        return sourceFile;
    };
}

function visitNodeAndChildren(node: ts.SourceFile, program: ts.Program, context: ts.TransformationContext): ts.SourceFile;
function visitNodeAndChildren(node: ts.Node, program: ts.Program, context: ts.TransformationContext): ts.Node;
function visitNodeAndChildren(node: ts.Node, program: ts.Program, context: ts.TransformationContext): ts.Node {
    return ts.visitEachChild(visitNode(node, program), childNode => visitNodeAndChildren(childNode, program, context), context);
}

function visitNode(node: ts.Node, program: ts.Program): ts.Node {
    const typeChecker = program.getTypeChecker();
    if (!isKeysCallExpression(node, typeChecker)) {
        return node;
    }
    if (!node.typeArguments) {
        return ts.createArrayLiteral([]);
    }

    return ts.createCall(generateFactoryIfNeeded(node.typeArguments[0] as ts.TypeReferenceNode, typeChecker), [], []);
}

function generateFactoryIfNeeded(type: ts.TypeReferenceNode, typeChecker: ts.TypeChecker): ts.Expression {
    const symbol = typeChecker.getSymbolAtLocation(type.typeName);
	const declaredType = typeChecker.getDeclaredTypeOfSymbol(symbol);
    const declaration = declaredType.symbol.declarations[0];
    const thisFileName = type.getSourceFile().fileName;
    const key: ts.Declaration = declaration;

    if (!cache.has(key)) {
        const baseFactoryName: string = "create__" + typeChecker.typeToString(typeChecker.getTypeFromTypeNode(type)) + "__mock"; // generateFactoryName(type);
        const count = exportMap.has(thisFileName) && exportMap.get(thisFileName).get(baseFactoryName) || 1;
        const factoryName = `${baseFactoryName}_${count}`;
        console.log('Declaration EXPORT', factoryName);

        const newFactory = createFactoryExport(factoryName, GetDescriptor(type, typeChecker));
        if (exportList.has(thisFileName)) {
            exportMap.get(thisFileName).set(baseFactoryName, count + 1);
            exportList.get(thisFileName).push(newFactory);
        } else {
            const thisFileExports = new Map<string, number>();
            thisFileExports.set(baseFactoryName, count + 1);
            exportMap.set(thisFileName, thisFileExports);
            exportList.set(thisFileName, [newFactory]);
        }
        cache.set(key, { name: factoryName, filepath: type.getSourceFile().fileName });

        return newFactory.identifier;
    } else {
        console.log('Declaration IMPORT', key);
        const factoryImport = createImport(cache.get(key).filepath);
        if (importList.has(thisFileName)) {
            importList.get(thisFileName).push(factoryImport.importDeclaration);
        } else {
            importList.set(thisFileName, [factoryImport.importDeclaration]);
        }

        return ts.createPropertyAccess(factoryImport.identifier, cache.get(key).name);
    }
}

const indexTs = path.join(__dirname, 'create-mock.ts');
function isKeysCallExpression(node: ts.Node, typeChecker: ts.TypeChecker): node is ts.CallExpression {
    if (node.kind !== ts.SyntaxKind.CallExpression) {
        return false;
    }
    const signature = typeChecker.getResolvedSignature(node as ts.CallExpression);
    if (typeof signature === 'undefined') {
        return false;
    }


    const { declaration } = signature;
    return !!declaration
        && (path.join(declaration.getSourceFile().fileName) === indexTs)
        && !!declaration['name']
        && (declaration['name'].getText() === 'createMock');
}
