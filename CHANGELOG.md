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



