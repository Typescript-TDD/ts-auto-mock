import { Spy } from "../spy/spy";
import { FrameworkSpy } from "./frameworkSpy";

export type FrameworkAutoSpy<T> = Spy<T, FrameworkSpy>;
