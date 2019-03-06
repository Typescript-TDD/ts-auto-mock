import * as ts from "typescript";
import { MockDefiner } from "../../mockDefiner/mockDefiner";

export function GetMockMarkerProperty() {
	const propertyAccessExpression = ts.createPropertyAccess(
		ts.createPropertyAccess(
			ts.createPropertyAccess(
				MockDefiner.instance.currentTsAutoMockImportName,
				ts.createIdentifier('MockMarker')
			),
			ts.createIdentifier('instance')),
		ts.createIdentifier("get"));
	
	const mockMarkerCall = ts.createCall(propertyAccessExpression, [], []);
	const computedPropertyName = ts.createComputedPropertyName(mockMarkerCall);
	return ts.createPropertyAssignment(computedPropertyName, ts.createLiteral(true));
}
