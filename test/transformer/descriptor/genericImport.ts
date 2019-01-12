import { createMock } from "../../../src/transformer/create-mock";
import { ImportWithGenerics } from "./interfaces/withGenerics";
import { ImportWithGenerics as ClassGenerics } from "./classes/withGenerics";
import { ImportWithGenerics as TypeGenerics } from "./types/withGenerics";
import { Mock } from "ts-auto-mock";

describe('for generic', () => {
    describe('interfaces', () => {
        it('should set all the default values with import interfaces', () => {
            const properties: Mock<ImportWithGenerics<string>> = createMock<ImportWithGenerics<string>>();
            expect(properties.a).toBe("");
        });
    });

    describe('classes', () => {
        it('should set all the default values with import classes', () => {
            const properties: Mock<ClassGenerics<string>> = createMock<ClassGenerics<string>>();
            expect(properties.a).toBe("");
            expect(properties["_a"]).toBeUndefined();
        });
    });

    describe('types', () => {
        it('should set all the default values with import type', () => {
            const properties: Mock<TypeGenerics<string>> = createMock<TypeGenerics<string>>();
            expect(properties.a).toBe("");
        });
    });
});