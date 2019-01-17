import * as ts from 'typescript';
import * as path from 'path';
import { TypeChecker, SetTypeChecker } from './typeChecker/typeChecker';
import { MockDefiner } from './mockDefiner/mockDefiner';
import { GetNullDescriptor } from "./descriptor/null/null";
import { GetType } from "./descriptor/type/type";
import { IsValidTypeToMock } from "./typeValidator/typeValidator";
import { TypeReferenceCache } from "./descriptor/typeReference/cache";
import { GetMockFactoryCall } from "./mockFactoryCall/mockFactoryCall";

export default function transformer(program: ts.Program): ts.TransformerFactory<ts.SourceFile> {
    SetTypeChecker(program.getTypeChecker());

    return (context: ts.TransformationContext) => (file: ts.SourceFile) => {
        MockDefiner.instance.initFile(file);
        let sourceFile = visitNodeAndChildren(file, context);

        sourceFile = ts.updateSourceFileNode(sourceFile, [
            ...MockDefiner.instance.getTopStatementsForFile(sourceFile),
            ...sourceFile.statements
        ]);

        return sourceFile;
    };
}

function visitNodeAndChildren(node: ts.SourceFile, context: ts.TransformationContext): ts.SourceFile;
function visitNodeAndChildren(node: ts.Node, context: ts.TransformationContext): ts.Node;
function visitNodeAndChildren(node: ts.Node, context: ts.TransformationContext): ts.Node {
    return ts.visitEachChild(visitNode(node), childNode => visitNodeAndChildren(childNode, context), context);
}

function visitNode(node: ts.Node): ts.Node {
    if (!isKeysCallExpression(node)) {
        return node;
    }
    if (!node.typeArguments) {
        return ts.createArrayLiteral([]);
    }

    const nodeToMock = node.typeArguments[0];
    const nodeResolved = GetType(nodeToMock);

    if (IsValidTypeToMock(nodeResolved)) {
        TypeReferenceCache.instance.clear();
        MockDefiner.instance.setFileNameFromNode(nodeToMock);
        return GetMockFactoryCall(nodeToMock);
    }

    return GetWrongTypeError(nodeResolved);
}

function isKeysCallExpression(node: ts.Node): node is ts.CallExpression {
	const indexTs = path.join(__dirname, 'src/transformer/create-mock.ts');

	if (node.kind !== ts.SyntaxKind.CallExpression) {
        return false;
    }

    const typeChecker = TypeChecker();
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
function GetWrongTypeError(node: ts.Node): ts.Expression {
    const message: string = "Cannot convert type "+ ts.SyntaxKind[node.kind] + " to a mock";
    let { line, character } = node.getSourceFile().getLineAndCharacterOfPosition(
        node.getStart()
    );
    console.error(
        `${node.getSourceFile().fileName} (${line + 1},${character + 1}): ${message}`
    );

    return GetNullDescriptor();
}