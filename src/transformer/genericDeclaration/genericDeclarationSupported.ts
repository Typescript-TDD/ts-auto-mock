import * as ts from 'typescript';
import { InterfaceOrClassDeclaration } from '../scope/scope';

export type GenericDeclarationSupported = InterfaceOrClassDeclaration & ts.TypeAliasDeclaration;
