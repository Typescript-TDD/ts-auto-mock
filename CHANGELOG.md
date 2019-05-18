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



