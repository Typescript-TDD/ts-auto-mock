import type * as ts from 'typescript';
import { MockDefiner } from '../../mockDefiner/mockDefiner';
import { ModuleName } from '../../mockDefiner/modules/moduleName';
import { PrivateIdentifier } from '../../privateIdentifier/privateIdentifier';
import { GetBooleanTrueDescriptor } from '../boolean/booleanTrue';
import {
  createCall,
  createIdentifier,
  createPropertyAccess,
} from '../../../typescriptFactory/typescriptFactory';

export interface Property {
  name: ts.Expression;
  value: ts.Expression;
}

export function GetMockMarkerProperty(): Property {
  const propertyAccessExpression: ts.PropertyAccessExpression = createPropertyAccess(
    createPropertyAccess(
      createPropertyAccess(
        MockDefiner.instance.getCurrentModuleIdentifier(ModuleName.Extension),
        PrivateIdentifier('Marker')
      ),
      createIdentifier('instance')
    ),
    createIdentifier('get')
  );

  const mockMarkerCall: ts.CallExpression = createCall(
    propertyAccessExpression,
    []
  );

  return {
    name: mockMarkerCall,
    value: GetBooleanTrueDescriptor(),
  };
}
