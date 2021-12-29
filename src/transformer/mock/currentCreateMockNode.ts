import type ts from 'typescript';

let currentCreateMock: ts.Node;

export const GetCurrentCreateMock: () => ts.Node = () => currentCreateMock;

export const SetCurrentCreateMock: (node: ts.Node) => void = (
  node: ts.Node
) => {
  currentCreateMock = node;
};
