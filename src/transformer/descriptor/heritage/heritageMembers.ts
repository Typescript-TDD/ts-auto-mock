import * as ts from 'typescript';
import { TypeChecker } from "../../typeChecker/typeChecker";

export function GetHeritagesMembers(elements: ts.NodeArray<ts.HeritageClause>): any {
	const typeChecker = TypeChecker();
	
	const element: ts.HeritageClause = elements[0];
	const typeNode: ts.ExpressionWithTypeArguments = element.types[0];
	
	const type = typeChecker.getTypeFromTypeNode(typeNode);
	
	
	return (type.symbol.declarations[0] as any).members;
	
	return type;
	// return elements.map((element: ts.HeritageClause) => {
	// 	const type = typeChecker.getSymbolAtLocation(element.types[0].expression);
	// 	return type.members;
	// }).reduce((acc, members) => {
	// 	acc = acc.concat(members);
	// 	return acc;
	// }, [])
}