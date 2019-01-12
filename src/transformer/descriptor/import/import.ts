import { GetDescriptor } from "../descriptor";
import { GetTypeImport, ImportNode } from "../type/typeImport";

export function GetImportDescriptor(node: ImportNode) {
    const type = GetTypeImport(node);
	return GetDescriptor(type);
}