import * as ts from 'typescript';
import { TypescriptCreator } from '../../helper/creator';
import { Scope } from '../../scope/scope';
import { TypeChecker } from '../../typeChecker/typeChecker';
import { GetMockPropertiesFromDeclarations } from '../mock/mockProperties';
import { GetTypes } from '../type/type';

export function GetMappedDescriptor(node: ts.MappedTypeNode, scope: Scope): ts.Expression {
    const typeParameter: ts.TypeNode = node.typeParameter.constraint;
    const typeChecker: ts.TypeChecker = TypeChecker();
    const types: ts.Node[] = GetTypes(ts.createNodeArray([typeParameter]), scope);

    const properties: ts.PropertyDeclaration[] = types.reduce((acc: ts.PropertyDeclaration[], possibleType: ts.Node) => {
        if (ts.isLiteralTypeNode(possibleType)) {
            const property: ts.PropertyDeclaration = TypescriptCreator.createProperty((possibleType.literal as ts.StringLiteral).text, node.type);
            acc.push(property);
            return acc;
        }

        const type: ts.Type = typeChecker.getTypeAtLocation(possibleType);
        const propertiesDeclaration: ts.PropertyDeclaration[] = typeChecker.getPropertiesOfType(type).map((symbol: ts.Symbol) => {
            return TypescriptCreator.createProperty(symbol.name, node.type);
        });

        acc = acc.concat(propertiesDeclaration);

        return acc;
    }, []);

    return GetMockPropertiesFromDeclarations(properties, [], scope);
}
