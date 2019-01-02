import { SpyFactory } from "../src/spy/spyFactory";
import { JasmineSpyMethodFactory } from "../src/jasmine/SpyMethodFactory";

SpyFactory.setSpyMethod(new JasmineSpyMethodFactory());