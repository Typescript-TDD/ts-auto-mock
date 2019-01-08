import { Mock } from "../mock/mock";
import { FrameworkMock } from "./frameworkMock";

export type FrameworkAutoMock<T> = Mock<T, FrameworkMock>;
