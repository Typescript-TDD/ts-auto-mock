import { createMock } from "../../../src/transformer/create-mock";

describe('for intersection', () => {
    interface IntersectionA {
        a: string;
    }

    interface IntersectionB {
        b: number;
    }
    interface Interface {
        intersection: IntersectionA & IntersectionB,
        anotherIntersection: IntersectionA & {
            c: boolean
        }
    }
    it('should merge all the values', () => {
        const properties: Interface = createMock<Interface>();
        expect(properties.intersection).toEqual({
            a: "",
            b: 0
        });

        expect(properties.anotherIntersection).toEqual({
            a: "",
            c: false
        })
    });
});