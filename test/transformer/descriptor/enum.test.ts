import { createMock } from "../../../src/transformer/create-mock";
import { Mock } from "ts-auto-mock";

describe('for enum', () => {
	enum Direction {
		Right,
		Left,
	}
	
	enum DirectionAssign {
		Right = "Right",
		Left = "Left",
	}
	
	enum DirectionAssignNumber {
		Right = 1,
		Left = 3,
	}
	interface Interface {
		a: Direction;
		b: DirectionAssign;
		c: DirectionAssignNumber;
	}
	
	it('should set the first enum', () => {
		const properties: Mock<Interface> = createMock<Interface>();
		expect(properties.a).toBe(Direction.Right);
		expect(properties.b).toBe(DirectionAssign.Right);
		expect(properties.c).toBe(DirectionAssignNumber.Right);
	});
});