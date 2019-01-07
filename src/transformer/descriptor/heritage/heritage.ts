import * as ts from 'typescript';
import { GetDescriptor } from "../descriptor";

export function GetHeritageClauseDescriptor(node: ts.HeritageClause) {
	return GetDescriptor(node.types[0]);
}