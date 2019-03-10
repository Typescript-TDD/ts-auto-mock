import * as ts from 'typescript';
import { MockDefiner } from "../../mockDefiner/mockDefiner";

export interface Property {
	name: ts.Expression,
	value: ts.Expression
}

export function GetMockMarkerProperty(): Property {
	const propertyAccessExpression = ts.createPropertyAccess(
		ts.createPropertyAccess(
			ts.createPropertyAccess(
				MockDefiner.instance.currentTsAutoMockImportName,
				ts.createIdentifier('MockMarker')
			),
			ts.createIdentifier('instance')),
		ts.createIdentifier("get"));
	
	const mockMarkerCall = ts.createCall(propertyAccessExpression, [], []);
	
	return {
		name: mockMarkerCall,
		value: ts.createLiteral(true)
	};
}
