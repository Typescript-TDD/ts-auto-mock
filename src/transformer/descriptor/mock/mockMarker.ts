import * as ts from 'typescript';
import { MockDefiner } from '../../mockDefiner/mockDefiner';
import { ModuleName } from '../../mockDefiner/modules/moduleName';
import { PrivateIdentifier } from '../../privateIdentifier/privateIdentifier';
import { GetBooleanTrueDescriptor } from '../boolean/booleanTrue';

export interface Property {
  name: ts.Expression;
  value: ts.Expression;
}

export function GetMockMarkerProperty(): Property {
  const propertyAccessExpression: ts.PropertyAccessExpression = ts.createPropertyAccess(
    ts.createPropertyAccess(
      ts.createPropertyAccess(
        MockDefiner.instance.getCurrentModuleIdentifier(ModuleName.Extension),
        PrivateIdentifier('Marker')
      ),
      ts.createIdentifier('instance')),
    ts.createIdentifier('get'));

  const mockMarkerCall: ts.CallExpression = ts.createCall(propertyAccessExpression, [], []);

  return {
    name: mockMarkerCall,
    value: GetBooleanTrueDescriptor(),
  };
}
