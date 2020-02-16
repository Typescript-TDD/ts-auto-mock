<a name="1.5.6"></a>
## [1.5.6](https://github.com/Typescript-TDD/ts-auto-mock/compare/v1.5.5...v1.5.6) (2020-02-16)


### Features

* **extendsMappedType:** make sure extending mapped types do not prevent to compile ([#241](https://github.com/Typescript-TDD/ts-auto-mock/issues/241)) ([627b9bc](https://github.com/Typescript-TDD/ts-auto-mock/commit/627b9bc))



<a name="1.5.5"></a>
## [1.5.5](https://github.com/Typescript-TDD/ts-auto-mock/compare/1.5.4...1.5.5) (2020-02-09)


### Features

* **set:** add Set support as a type ([#233](https://github.com/Typescript-TDD/ts-auto-mock/issues/233)) ([446c090](https://github.com/Typescript-TDD/ts-auto-mock/commit/446c090))



<a name="1.5.4"></a>
## [1.5.4](https://github.com/Typescript-TDD/ts-auto-mock/compare/v1.5.3...v1.5.4) (2020-02-08)


### Bug Fixes

* **typequery:** add support for typequery undefined ([#227](https://github.com/Typescript-TDD/ts-auto-mock/issues/227)) ([0b835b1](https://github.com/Typescript-TDD/ts-auto-mock/commit/0b835b1))


### Features

* **map:** add Map support as a type ([#228](https://github.com/Typescript-TDD/ts-auto-mock/issues/228)) ([3006c84](https://github.com/Typescript-TDD/ts-auto-mock/commit/3006c84)), closes [#225](https://github.com/Typescript-TDD/ts-auto-mock/issues/225)



<a name="1.5.3"></a>
## [1.5.3](https://github.com/Typescript-TDD/ts-auto-mock/compare/1.5.1...1.5.3) (2020-02-05)


### Bug Fixes

* **transformer:** export definitely typed for transformer so it will be easier to read the documentation while developing ([#222](https://github.com/Typescript-TDD/ts-auto-mock/issues/222)) ([37b4b7e](https://github.com/Typescript-TDD/ts-auto-mock/commit/37b4b7e))
* **typeof-alias-export:** make sure alias exports will be transformed correctly ([#214](https://github.com/Typescript-TDD/ts-auto-mock/issues/214)) ([27ae136](https://github.com/Typescript-TDD/ts-auto-mock/commit/27ae136))



<a name="1.5.2"></a>
## [1.5.2](https://github.com/uittorio/ts-auto-mock/compare/1.5.1...1.5.2) (2020-02-01)



<a name="1.5.1"></a>
## [1.5.1](https://github.com/uittorio/ts-auto-mock/compare/1.5.0...1.5.1) (2020-01-31)



<a name="1.5.0"></a>
# [1.5.0](https://github.com/uittorio/ts-auto-mock/compare/v1.4.1...v1.5.0) (2020-01-30)


### Bug Fixes

* **definitelyTyped:** add node types in generated tsconfig ([#186](https://github.com/uittorio/ts-auto-mock/issues/186)) ([19caa94](https://github.com/uittorio/ts-auto-mock/commit/19caa94))
* **definitelyTyped:** copy compiler option "paths" from processed type ([#185](https://github.com/uittorio/ts-auto-mock/issues/185)) ([6265fde](https://github.com/uittorio/ts-auto-mock/commit/6265fde))
* **definitelyTyped:** use ts-ignore before createMock so that value type modules don't fail ([acd2c6f](https://github.com/uittorio/ts-auto-mock/commit/acd2c6f))
* **genericNotProvided:** make sure required generic will default to null when are not provided ([#180](https://github.com/uittorio/ts-auto-mock/issues/180)) ([ad76471](https://github.com/uittorio/ts-auto-mock/commit/ad76471))
* **mockProperty:** make sure a falsy value can be assigned to a mock property ([#208](https://github.com/uittorio/ts-auto-mock/issues/208)) ([0b37699](https://github.com/uittorio/ts-auto-mock/commit/0b37699))
* **ui:** use index as key of list of components to make sure the ui doesn't fail when a type gets processed multiple times ([#178](https://github.com/uittorio/ts-auto-mock/issues/178)) ([84a52a1](https://github.com/uittorio/ts-auto-mock/commit/84a52a1))


### Features

* **constructorType:** Add constructor type descriptor ([#115](https://github.com/uittorio/ts-auto-mock/issues/115)) ([8f26218](https://github.com/uittorio/ts-auto-mock/commit/8f26218))
* **constructSignature:** add construct signature ([#116](https://github.com/uittorio/ts-auto-mock/issues/116)) ([b0aa18a](https://github.com/uittorio/ts-auto-mock/commit/b0aa18a))
* **DefinitelyTyped:** add process with ui to run createMock on every type of DefinitelyTyped repository ([#136](https://github.com/uittorio/ts-auto-mock/issues/136)) ([445f31e](https://github.com/uittorio/ts-auto-mock/commit/445f31e))
* **genericDefault:** add support for default generics on declaration and extensions ([#126](https://github.com/uittorio/ts-auto-mock/issues/126)) ([a9df32a](https://github.com/uittorio/ts-auto-mock/commit/a9df32a))
* **import:** add import equals support and make sure transformer test run in a context so the cache system will work ([f23039d](https://github.com/uittorio/ts-auto-mock/commit/f23039d))
* **importequal:** add support for export equals and remove webpack env types that were conflicting with types node ([#124](https://github.com/uittorio/ts-auto-mock/issues/124)) ([990ecf1](https://github.com/uittorio/ts-auto-mock/commit/990ecf1))
* **indexedAccess:** add indexed access support for mocks ([#119](https://github.com/uittorio/ts-auto-mock/issues/119)) ([a3e9841](https://github.com/uittorio/ts-auto-mock/commit/a3e9841))
* **intersectionsfunction:** add support for function intersections and parenthesised type in intersections ([#127](https://github.com/uittorio/ts-auto-mock/issues/127)) ([5572631](https://github.com/uittorio/ts-auto-mock/commit/5572631))
* **multipledeclaration-bigint:** add support for multiple declarations functions for types and values and biging ([#163](https://github.com/uittorio/ts-auto-mock/issues/163)) ([00d9904](https://github.com/uittorio/ts-auto-mock/commit/00d9904))
* **registerMock:** add registerMock functionality to register custom mocks per project ([#125](https://github.com/uittorio/ts-auto-mock/issues/125)) ([0feb05a](https://github.com/uittorio/ts-auto-mock/commit/0feb05a))
* **typeQuery:** add support for typeof of an imported module ([#128](https://github.com/uittorio/ts-auto-mock/issues/128)) ([a9e25a3](https://github.com/uittorio/ts-auto-mock/commit/a9e25a3))


### Performance Improvements

* **emit:** decrease emitted code ([#169](https://github.com/uittorio/ts-auto-mock/issues/169)) ([0253e95](https://github.com/uittorio/ts-auto-mock/commit/0253e95))



<a name="1.4.4"></a>
## [1.4.4](https://github.com/uittorio/ts-auto-mock/compare/v1.4.3...v1.4.4) (2020-01-01)


### Features

* **genericDefault:** add support for default generics on declaration and extensions ([#126](https://github.com/uittorio/ts-auto-mock/issues/126)) ([a9df32a](https://github.com/uittorio/ts-auto-mock/commit/a9df32a))
* **importequal:** add support for export equals and remove webpack env types that were conflicting with types node ([#124](https://github.com/uittorio/ts-auto-mock/issues/124)) ([990ecf1](https://github.com/uittorio/ts-auto-mock/commit/990ecf1))
* **intersectionsfunction:** add support for function intersections and parenthesised type in intersections ([#127](https://github.com/uittorio/ts-auto-mock/issues/127)) ([5572631](https://github.com/uittorio/ts-auto-mock/commit/5572631))
* **registerMock:** add registerMock functionality to register custom mocks per project ([#125](https://github.com/uittorio/ts-auto-mock/issues/125)) ([0feb05a](https://github.com/uittorio/ts-auto-mock/commit/0feb05a))



<a name="1.4.3"></a>
## [1.4.3](https://github.com/uittorio/ts-auto-mock/compare/v1.4.2...v1.4.3) (2019-12-27)



<a name="1.4.2"></a>
## [1.4.2](https://github.com/uittorio/ts-auto-mock/compare/v1.4.1...v1.4.2) (2019-12-22)


### Features

* **constructorType:** Add constructor type descriptor ([#115](https://github.com/uittorio/ts-auto-mock/issues/115)) ([8f26218](https://github.com/uittorio/ts-auto-mock/commit/8f26218))
* **constructSignature:** add construct signature ([#116](https://github.com/uittorio/ts-auto-mock/issues/116)) ([b0aa18a](https://github.com/uittorio/ts-auto-mock/commit/b0aa18a))
* **import:** add import equals support and make sure transformer test run in a context so the cache system will work ([f23039d](https://github.com/uittorio/ts-auto-mock/commit/f23039d))
* **indexedAccess:** add indexed access support for mocks ([#119](https://github.com/uittorio/ts-auto-mock/issues/119)) ([a3e9841](https://github.com/uittorio/ts-auto-mock/commit/a3e9841))



<a name="1.4.1"></a>
## [1.4.1](https://github.com/uittorio/ts-auto-mock/compare/v1.4.0...v1.4.1) (2019-11-30)


### Bug Fixes

* **enum:** add module declaration enum support ([4642520](https://github.com/uittorio/ts-auto-mock/commit/4642520))



<a name="1.4.0"></a>
# [1.4.0](https://github.com/uittorio/ts-auto-mock/compare/v1.3.1...v1.4.0) (2019-11-26)


### Features

* **config:** add option to disable cache between files as a workaround until [#101](https://github.com/uittorio/ts-auto-mock/issues/101) is completed ([92cd1d7](https://github.com/uittorio/ts-auto-mock/commit/92cd1d7))



<a name="1.3.1"></a>
## [1.3.1](https://github.com/uittorio/ts-auto-mock/compare/v1.3.0...v1.3.1) (2019-11-21)



<a name="1.3.0"></a>
# [1.3.0](https://github.com/uittorio/ts-auto-mock/compare/v1.2.1...v1.3.0) (2019-11-21)


### Bug Fixes

* **this:** make sure literal type will not interfere with "this" reference ([fd2270b](https://github.com/uittorio/ts-auto-mock/commit/fd2270b)), closes [#88](https://github.com/uittorio/ts-auto-mock/issues/88) [#88](https://github.com/uittorio/ts-auto-mock/issues/88)


### feature

* **genericReuse:** add types with generic to mock factory ([ddd94b0](https://github.com/uittorio/ts-auto-mock/commit/ddd94b0))


### BREAKING CHANGES

* **genericReuse:** extensions (Provider) provideMethod will be deprecated in
future releases in favour of provideMethodWithDeferredValue

Provider.provideMethod is deprecated changed:
Before:
```ts
Provider.instance.provideMethod((name: string, value: any) => {
    ...
});
```
After:
```ts
Provider.instance.provideMethodWithDeferredValue((name: string, value: () => any) => {
    ...
});
```
Read the documentation for more information


<a name="1.2.1"></a>
## [1.2.1](https://github.com/uittorio/ts-auto-mock/compare/0.0.2...1.2.1) (2019-10-29)


### Features

* **interfaceCallSignature:** add support for interface call signature ([#82](https://github.com/uittorio/ts-auto-mock/issues/82)) ([a00ff55](https://github.com/uittorio/ts-auto-mock/commit/a00ff55))



<a name="1.2.0"></a>
# [1.2.0](https://github.com/uittorio/ts-auto-mock/compare/v1.1.4...v1.2.0) (2019-08-18)


### Features

* **defaultValues:** merge default values ([#78](https://github.com/uittorio/ts-auto-mock/issues/78)) ([e5a7424](https://github.com/uittorio/ts-auto-mock/commit/e5a7424))



<a name="1.1.4"></a>
## [1.1.4](https://github.com/uittorio/ts-auto-mock/compare/v1.1.3...v1.1.4) (2019-07-06)


### Bug Fixes

* **core:** use path.relative to check if two urls are the same ([#69](https://github.com/uittorio/ts-auto-mock/issues/69)) ([e79b29c](https://github.com/uittorio/ts-auto-mock/commit/e79b29c))


### Features

* **log:** add test script that will output logs ([d577cf8](https://github.com/uittorio/ts-auto-mock/commit/d577cf8))



<a name="1.1.3"></a>
## [1.1.3](https://github.com/uittorio/ts-auto-mock/compare/v1.1.2...v1.1.3) (2019-06-29)


### Features

* **log:** logging feature, remove npm i logs for ci ([0cdfa27](https://github.com/uittorio/ts-auto-mock/commit/0cdfa27))



<a name="1.1.2"></a>
## [1.1.2](https://github.com/uittorio/ts-auto-mock/compare/v1.1.1...v1.1.2) (2019-05-18)



<a name="1.1.1"></a>
## [1.1.1](https://github.com/uittorio/ts-auto-mock/compare/v1.1.0...v1.1.1) (2019-04-27)



<a name="1.1.0"></a>
# [1.1.0](https://github.com/uittorio/ts-auto-mock/compare/v1.0.0...v1.1.0) (2019-04-27)


### Bug Fixes

* **modules:** make sure transformer is exported in the right folder ([832afc1](https://github.com/uittorio/ts-auto-mock/commit/832afc1))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/uittorio/ts-auto-mock/compare/v0.0.27...v1.0.0) (2019-04-27)


### Code Refactoring

* **module division:** modules divisions ([54575a7](https://github.com/uittorio/ts-auto-mock/commit/54575a7))


### Features

* **createMockList:** add createMockList functionality, add typings to framework test ([#34](https://github.com/uittorio/ts-auto-mock/issues/34)) ([3030ba5](https://github.com/uittorio/ts-auto-mock/commit/3030ba5))


### BREAKING CHANGES

* **module division:** extensions (On, method) are in a separate modules,
mockFactory changed interface, name (Provider) and module

Importing On, method changed:

Before:
```ts
import { On, method } from "ts-auto-mock";
```

After:
```ts
import { On, method } from "ts-auto-mock/extension";
```

MockFactory changed name, module and interface:

Before:
```ts
import { MockFactory } from "ts-auto-mock";

MockFactory.instance.registerFactory((name: string, value: any) => {
    ...
});
```

After:
```ts
import { Provider } from "ts-auto-mock/extension";

Provider.instance.provideMethod((name: string, value: any) => {
    ...
});
```

<a name="0.0.27"></a>
## [0.0.27](https://github.com/uittorio/ts-auto-mock/compare/v0.0.26...v0.0.27) (2019-04-07)


### Bug Fixes

* **tslinttest:** fix another unit test ([5b84a55](https://github.com/uittorio/ts-auto-mock/commit/5b84a55))



<a name="0.0.26"></a>
## [0.0.26](https://github.com/uittorio/ts-auto-mock/compare/v0.0.25...v0.0.26) (2019-04-07)



<a name="0.0.25"></a>
## [0.0.25](https://github.com/uittorio/ts-auto-mock/compare/bd3a43d...v0.0.25) (2019-04-07)


### Features

* **changelog:** add changelog ([bd3a43d](https://github.com/uittorio/ts-auto-mock/commit/bd3a43d))
* **ci:** add minimum ci to run test on branches ([34d4ac7](https://github.com/uittorio/ts-auto-mock/commit/34d4ac7))



