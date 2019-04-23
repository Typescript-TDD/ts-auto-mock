import { ImportNestedInterface } from './importNestedInterface';

export interface ImportInterface {
    a: {
        b: string;
    };
}

export interface ImportInterfaceWithNestedInterface {
    a: ImportNestedInterface;
}
