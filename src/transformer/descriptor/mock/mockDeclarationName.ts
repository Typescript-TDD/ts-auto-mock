import * as ts from 'typescript';

export function GetMockInternalValuesName(): ts.Identifier {
    return ts.createIdentifier('declarations');
}

export function GetMockObjectReturnValueName(): ts.Identifier {
    return ts.createIdentifier('mockObjectReturnValue');
}

export function GetMockSetParameterName(): ts.Identifier {
    return ts.createIdentifier('value');
}
