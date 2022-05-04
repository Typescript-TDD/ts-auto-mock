# Semantic Versioning Changelog

## [3.6.1](https://github.com/Typescript-TDD/ts-auto-mock/compare/3.6.0...3.6.1) (2022-05-04)


### Bug Fixes

* **nodejstypes:** node globals types are now excluded when analyzing type properties ([2f025b7](https://github.com/Typescript-TDD/ts-auto-mock/commit/2f025b76031cfe7d6e90a79a6ca3954c525ce4de)), closes [/github.com/nodejs/node/blob/master/doc/changelogs/CHANGELOG_V16.md#2021-07-29-version-1660](https://github.com//github.com/nodejs/node/blob/master/doc/changelogs/CHANGELOG_V16.md/issues/2021-07-29-version-1660) [/github.com/DefinitelyTyped/DefinitelyTyped/commit/dca7357e90ef804954aaf042ed158220bcd09079#diff-2696281f8832b1227bb41483a7525a8ccd9399bb4b1704f69c8c54bb1346d8edR80](https://github.com//github.com/DefinitelyTyped/DefinitelyTyped/commit/dca7357e90ef804954aaf042ed158220bcd09079/issues/diff-2696281f8832b1227bb41483a7525a8ccd9399bb4b1704f69c8c54bb1346d8edR80)

# [3.6.0](https://github.com/Typescript-TDD/ts-auto-mock/compare/3.5.1...3.6.0) (2022-04-30)


### Features

* **(dependencies:** update typescript to version 4.6.4 ([1a83487](https://github.com/Typescript-TDD/ts-auto-mock/commit/1a83487af1d2b9cb45849b2e37ec8e6f831281fa))
* **dependencies:** update winston to version 3.7.2 ([9286731](https://github.com/Typescript-TDD/ts-auto-mock/commit/9286731f980b8f0a71b0bf6168ed85f08c381943))

## [3.5.1](https://github.com/Typescript-TDD/ts-auto-mock/compare/3.5.0...3.5.1) (2022-04-26)


### Performance Improvements

* update typescrpt to 4.6.3 ([365d851](https://github.com/Typescript-TDD/ts-auto-mock/commit/365d85151afeaaf7f29c198b6d2044165154ac5a))

# [3.5.0](https://github.com/Typescript-TDD/ts-auto-mock/compare/3.4.0...3.5.0) (2021-09-12)


### Features

* **arrowfunctionliteraltypes:** add some compatibility for arrow functions without type definitions ([b2fb8de](https://github.com/Typescript-TDD/ts-auto-mock/commit/b2fb8dee55fc7addbbd63425fae953b6ca05d1b7))

# [3.4.0](https://github.com/Typescript-TDD/ts-auto-mock/compare/3.3.6...3.4.0) (2021-09-02)


### Features

* **functionliteraltypes:** add some compatibility for functions without type definitions! ([#889](https://github.com/Typescript-TDD/ts-auto-mock/issues/889)) ([a21e012](https://github.com/Typescript-TDD/ts-auto-mock/commit/a21e01295e7a658c1917543da40e12840b58f029))

## [3.3.6](https://github.com/Typescript-TDD/ts-auto-mock/compare/3.3.5...3.3.6) (2021-08-28)


### Bug Fixes

* **vulnerability:** fix some vulnerabilities ([53a13e5](https://github.com/Typescript-TDD/ts-auto-mock/commit/53a13e552053e5e449b32525560e621c4cbb19e6))

## [3.3.5](https://github.com/Typescript-TDD/ts-auto-mock/compare/3.3.4...3.3.5) (2021-08-08)


### Performance Improvements

* **typescript:** upgrade to latest version of typescript ([69e52e1](https://github.com/Typescript-TDD/ts-auto-mock/commit/69e52e1a80074492ba8cd17ca3b9108511622fd9))

## [3.3.4](https://github.com/Typescript-TDD/ts-auto-mock/compare/3.3.3...3.3.4) (2021-08-08)


### Bug Fixes

* **husky:** remove husky from post install because it will be required for consumers of the packages ([83498e2](https://github.com/Typescript-TDD/ts-auto-mock/commit/83498e26f715da7dc7af8bd63ed1082ec5825f62))

## [3.3.3](https://github.com/Typescript-TDD/ts-auto-mock/compare/3.3.2...3.3.3) (2021-08-08)


### Performance Improvements

* **dependencies:** run husky installation only when installing not when publishing the package ([#871](https://github.com/Typescript-TDD/ts-auto-mock/issues/871)) ([9fea5d4](https://github.com/Typescript-TDD/ts-auto-mock/commit/9fea5d4f9eeff3f7239457023bdf2e89320ee382))

## [3.3.2](https://github.com/Typescript-TDD/ts-auto-mock/compare/3.3.1...3.3.2) (2021-08-08)


### Performance Improvements

* **dependencies:** upgrade performance dependencies ([#870](https://github.com/Typescript-TDD/ts-auto-mock/issues/870)) ([ab99348](https://github.com/Typescript-TDD/ts-auto-mock/commit/ab9934875f140a8fac63a66160d4befbd8769265))

## [3.3.1](https://github.com/Typescript-TDD/ts-auto-mock/compare/3.3.0...3.3.1) (2021-08-08)


### Performance Improvements

* **dependencies:** update ts-auto-mock dependencies to the latest version ([46fbacf](https://github.com/Typescript-TDD/ts-auto-mock/commit/46fbacfd515eed10fce91af7042c76519c790124))

# [3.3.0](https://github.com/Typescript-TDD/ts-auto-mock/compare/3.2.3...3.3.0) (2021-06-24)


### Features

* export alternative transformer function to allow providing customized typescript ([#802](https://github.com/Typescript-TDD/ts-auto-mock/issues/802)) ([9f1dce4](https://github.com/Typescript-TDD/ts-auto-mock/commit/9f1dce42c841ccb75e0c4ffc000da634f7234388))

## [3.2.3](https://github.com/Typescript-TDD/ts-auto-mock/compare/3.2.2...3.2.3) (2021-06-17)


### Bug Fixes

* **transformer:** ignore namespace when resolving a declaration ([#793](https://github.com/Typescript-TDD/ts-auto-mock/issues/793)) ([c356caa](https://github.com/Typescript-TDD/ts-auto-mock/commit/c356caa0d5d412ee1ef91d171559af2d89f39a6c))

## [3.2.2](https://github.com/Typescript-TDD/ts-auto-mock/compare/3.2.1...3.2.2) (2021-05-22)


### Bug Fixes

* **merge:** ensure undefined is assigned when merging partial mock ([#748](https://github.com/Typescript-TDD/ts-auto-mock/issues/748)) ([31c5ff5](https://github.com/Typescript-TDD/ts-auto-mock/commit/31c5ff5f09d59b11ada77e238ab70137da31c9cd))

## [3.2.1](https://github.com/Typescript-TDD/ts-auto-mock/compare/3.2.0...3.2.1) (2021-05-20)


### Bug Fixes

* **hydratedMocks:** fix recursion ([#736](https://github.com/Typescript-TDD/ts-auto-mock/issues/736)) ([8567273](https://github.com/Typescript-TDD/ts-auto-mock/commit/8567273f9c0e5417f5344345e1dac4d349650a11))

# [3.2.0](https://github.com/Typescript-TDD/ts-auto-mock/compare/3.1.3...3.2.0) (2021-05-19)


### Features

* **getAccessor:** correctly mock get accessors for mocked classes ([3530039](https://github.com/Typescript-TDD/ts-auto-mock/commit/35300395bf8e2b0d191940b4035a94634656f470))

## [3.1.3](https://github.com/Typescript-TDD/ts-auto-mock/compare/3.1.2...3.1.3) (2021-04-21)


### Performance Improvements

* **dependencies:** update dependencies ([#685](https://github.com/Typescript-TDD/ts-auto-mock/issues/685)) ([3c14989](https://github.com/Typescript-TDD/ts-auto-mock/commit/3c1498983f78c5ecd2a0ca43daf7083216b0967b))

## [3.1.2](https://github.com/Typescript-TDD/ts-auto-mock/compare/3.1.1...3.1.2) (2021-03-15)


### Performance Improvements

* **dependencies:** update dependencies ([#620](https://github.com/Typescript-TDD/ts-auto-mock/issues/620)) ([57cf063](https://github.com/Typescript-TDD/ts-auto-mock/commit/57cf0630bd3c2f8e65f77302a2b9cc591df9c7cb))

## [3.1.1](https://github.com/Typescript-TDD/ts-auto-mock/compare/3.1.0...3.1.1) (2021-02-18)


### Bug Fixes

* **typeReference:** log warning when type definition does not exists and cannot be located ([#618](https://github.com/Typescript-TDD/ts-auto-mock/issues/618)) ([5750def](https://github.com/Typescript-TDD/ts-auto-mock/commit/5750def79861553e9d0997e789b9ad00562c81d1))

# [3.1.0](https://github.com/Typescript-TDD/ts-auto-mock/compare/3.0.0...3.1.0) (2021-01-06)


### Features

* **hydrate-mocks:** add create-hydrated-mock functionality ([aa2ebad](https://github.com/Typescript-TDD/ts-auto-mock/commit/aa2ebad2f8e92b7ad5cd6a60d98793b330d736a4))

# [3.0.0](https://github.com/Typescript-TDD/ts-auto-mock/compare/2.7.0...3.0.0) (2020-12-25)


### chore

* **typescript:** update to typescript 4 ([#611](https://github.com/Typescript-TDD/ts-auto-mock/issues/611)) ([8373ec5](https://github.com/Typescript-TDD/ts-auto-mock/commit/8373ec598277589d5639dd3415f5ffb4a64b4ab3))


### BREAKING CHANGES

* **typescript:** typescript >= 4.0.2 is required to use ts-auto-mock
Update your typescript dependency to version >= 4.0.2

# [2.7.0](https://github.com/Typescript-TDD/ts-auto-mock/compare/2.6.5...2.7.0) (2020-12-08)


### Features

* **registerMock:** allow use of mocked generics in register mock factory ([512e150](https://github.com/Typescript-TDD/ts-auto-mock/commit/512e150436572e59c1070b2540d0b2310d655137))

## [2.6.5](https://github.com/Typescript-TDD/ts-auto-mock/compare/2.6.4...2.6.5) (2020-10-08)


### Bug Fixes

* **createMockList:** count the number of create mock list on runtime instead of relying on a numeric literal ([eec45dd](https://github.com/Typescript-TDD/ts-auto-mock/commit/eec45dd741b7c7b6ba889ce4a79dd2fd968720b4)), closes [#595](https://github.com/Typescript-TDD/ts-auto-mock/issues/595)

## [2.6.4](https://github.com/Typescript-TDD/ts-auto-mock/compare/2.6.3...2.6.4) (2020-09-18)


### Bug Fixes

* **transformer:** apply null and warning when property type cannot be identified ([7cc1ec0](https://github.com/Typescript-TDD/ts-auto-mock/commit/7cc1ec0deb9e1832d68732d7dbb40bd6bf87ad43))
* **typescript:** restore support for typescript 3 ([825cc01](https://github.com/Typescript-TDD/ts-auto-mock/commit/825cc01f3bf136322b814152ede8fe0d4a322019))

## [2.6.3](https://github.com/Typescript-TDD/ts-auto-mock/compare/2.6.2...2.6.3) (2020-09-17)


### Bug Fixes

* **transformer:** do not fail when accessing index of extended this for a computed property ([02e7b12](https://github.com/Typescript-TDD/ts-auto-mock/commit/02e7b12a466959f853168289189f4e62c2e03c14))

## [2.6.2](https://github.com/Typescript-TDD/ts-auto-mock/compare/2.6.1...2.6.2) (2020-09-15)


### Bug Fixes

* **definitelyTyped:** do not fail on mocking module declarations ([4660f58](https://github.com/Typescript-TDD/ts-auto-mock/commit/4660f587d2c268000a79ef9c6bee6045125377a2))

## [2.6.1](https://github.com/Typescript-TDD/ts-auto-mock/compare/2.6.0...2.6.1) (2020-09-15)


### Bug Fixes

* **transformer:** fix interface call signature with undeclared return type ([#533](https://github.com/Typescript-TDD/ts-auto-mock/issues/533)) ([55da89f](https://github.com/Typescript-TDD/ts-auto-mock/commit/55da89fb8fcf96960267dad4a1ebec57bbf545d8))

# [2.6.0](https://github.com/Typescript-TDD/ts-auto-mock/compare/2.5.3...2.6.0) (2020-09-15)


### Features

* **fileFilter:** add config option to specify files with mocks ([526d677](https://github.com/Typescript-TDD/ts-auto-mock/commit/526d677955b812871bbddb640eb674a60f835b32))

## [2.5.3](https://github.com/Typescript-TDD/ts-auto-mock/compare/2.5.2...2.5.3) (2020-09-15)


### Bug Fixes

* **properties:** create property when undefined/void, do not emit property only when optional ([70d65ed](https://github.com/Typescript-TDD/ts-auto-mock/commit/70d65ed4518271d2298358e44823ce7dd841a4f8))

## [2.5.2](https://github.com/Typescript-TDD/ts-auto-mock/compare/2.5.1...2.5.2) (2020-09-13)


### Bug Fixes

* **enum:** fix enum constant computed properties ([9c96a53](https://github.com/Typescript-TDD/ts-auto-mock/commit/9c96a532b1f59af2d3939c26ef8bf8a85044b46b))

## [2.5.1](https://github.com/Typescript-TDD/ts-auto-mock/compare/2.5.0...2.5.1) (2020-09-12)


### Bug Fixes

* **mockValues:** assign, not merge, override value when is a mock to prevent maximum callstack size exceeded errors ([7431d80](https://github.com/Typescript-TDD/ts-auto-mock/commit/7431d801753ab47c6efd14c9d77f6adabe8e6df4))

# [2.5.0](https://github.com/Typescript-TDD/ts-auto-mock/compare/2.4.0...2.5.0) (2020-09-11)


### Bug Fixes

* **logs:** ensure logs tests work on windows ([a160a87](https://github.com/Typescript-TDD/ts-auto-mock/commit/a160a879fa8032e2da5d17ee3d6451737d977754))


### Features

* **transformer:** tuple type now gets mocked as an instance of specified tuple, add keyof warning, support readonly array/tuple Pmyl 23 minutes ago ([af9df91](https://github.com/Typescript-TDD/ts-auto-mock/commit/af9df910e58b56ed14341a89c87943ae1b561740))

# [2.4.0](https://github.com/Typescript-TDD/ts-auto-mock/compare/2.3.5...2.4.0) (2020-09-09)


### Features

* **logs:** enhance unsupported type logs ([#513](https://github.com/Typescript-TDD/ts-auto-mock/issues/513)) ([5dd6711](https://github.com/Typescript-TDD/ts-auto-mock/commit/5dd6711185812ce08306f8acd78d9b7b353cca02))

## [2.3.5](https://github.com/Typescript-TDD/ts-auto-mock/compare/2.3.4...2.3.5) (2020-08-29)


### Bug Fixes

* **createMock:** PartialDeep to ignore object prototype properties ([37cb34d](https://github.com/Typescript-TDD/ts-auto-mock/commit/37cb34dd3862b4ff75c9d2527cb70d6c0b8c55ef))

## [2.3.4](https://github.com/Typescript-TDD/ts-auto-mock/compare/2.3.3...2.3.4) (2020-08-09)


### Bug Fixes

* **partial:** improve deep partial type to ensure compilation without errors when passing default values to create mock and create mock list ([7463501](https://github.com/Typescript-TDD/ts-auto-mock/commit/746350171a46da82f74956f1d13500a1399ef1ae))

## [2.3.3](https://github.com/Typescript-TDD/ts-auto-mock/compare/2.3.2...2.3.3) (2020-07-11)


### Bug Fixes

* **typeof-module:** prevent unsupported declaration to be transformer when mocking typeof of a module that uses exports = ([09aa3b3](https://github.com/Typescript-TDD/ts-auto-mock/commit/09aa3b3700a23b7c0e745b7496e9a2e7ba530115))

## [2.3.2](https://github.com/Typescript-TDD/ts-auto-mock/compare/2.3.1...2.3.2) (2020-07-05)


### Bug Fixes

* upgrade gatsby-plugin-google-analytics from 2.3.1 to 2.3.3 ([52c1b88](https://github.com/Typescript-TDD/ts-auto-mock/commit/52c1b8857303eb09f93e7079be8ca0d12f570f56))

## [2.3.1](https://github.com/Typescript-TDD/ts-auto-mock/compare/2.3.0...2.3.1) (2020-07-05)


### Bug Fixes

* upgrade typescript from 3.9.3 to 3.9.5 ([82bf1b8](https://github.com/Typescript-TDD/ts-auto-mock/commit/82bf1b83b06545787817dad81bf5ad98860bf09a))

# [2.3.0](https://github.com/Typescript-TDD/ts-auto-mock/compare/2.2.8...2.3.0) (2020-06-27)


### Features

* **transformer:** error when running tests with no transformer installation ([16506e5](https://github.com/Typescript-TDD/ts-auto-mock/commit/16506e5ae72d70dcf5c09c8881fe5b1bd71ce2e9))
* **transformer:** extract repeated error in a constant, fixed error wording ([dd73b57](https://github.com/Typescript-TDD/ts-auto-mock/commit/dd73b57454a2c41e93e39a15b0057c9e0344edeb))

## [2.2.8](https://github.com/Typescript-TDD/ts-auto-mock/compare/2.2.7...2.2.8) (2020-06-14)


### Bug Fixes

* **module:** switch to commonjs2 libraryTarget ([#379](https://github.com/Typescript-TDD/ts-auto-mock/issues/379)) ([9259f10](https://github.com/Typescript-TDD/ts-auto-mock/commit/9259f10bb3aaab49584768fa8bc17230567f52b2))

## [2.2.7](https://github.com/Typescript-TDD/ts-auto-mock/compare/2.2.6...2.2.7) (2020-06-10)


### Bug Fixes

* **registerMock:** allow to use mocks defined in variables ([#330](https://github.com/Typescript-TDD/ts-auto-mock/issues/330)) ([b14bd5c](https://github.com/Typescript-TDD/ts-auto-mock/commit/b14bd5c3e19e62f30f609f297925c5eb5fda30f4))

## [2.2.6](https://github.com/Typescript-TDD/ts-auto-mock/compare/2.2.5...2.2.6) (2020-06-06)


### Bug Fixes

* **release:** create a release every time there are new changes on master ([0013c9d](https://github.com/Typescript-TDD/ts-auto-mock/commit/0013c9ddc151ba2daff06b7df3f7588ac46ab96b))

## [2.2.5](https://github.com/Typescript-TDD/ts-auto-mock/compare/2.2.4...2.2.5) (2020-05-31)


### Bug Fixes

* **indexedAccessType:** ensure compiler doesn't break for unsupported indexed access type ([2ef31c7](https://github.com/Typescript-TDD/ts-auto-mock/commit/2ef31c72a44f3f4b53dc22f737902e9abe7fb699))

## [2.2.4](https://github.com/Typescript-TDD/ts-auto-mock/compare/2.2.3...2.2.4) (2020-05-31)


### Bug Fixes

* **release:** ensure develop will be up to date after a release ([613b5ed](https://github.com/Typescript-TDD/ts-auto-mock/commit/613b5ed955072d94565337024ca701fea3e1b0d3))

## [2.2.3](https://github.com/Typescript-TDD/ts-auto-mock/compare/2.2.2...2.2.3) (2020-05-31)


### Bug Fixes

* **token:** ensure performance and definitely typed pull requests are created with the right token ([869fa37](https://github.com/Typescript-TDD/ts-auto-mock/commit/869fa378482d9cb35e3bb019fb89a4f7fc6dfce2))

## [2.2.1](https://github.com/Typescript-TDD/ts-auto-mock/compare/2.2.0...2.2.1) (2020-05-31)


### Bug Fixes

* **release:** test release pipeline version ([b8f78dd](https://github.com/Typescript-TDD/ts-auto-mock/commit/b8f78dd3ed41701aa6c93230c7128c9f68312a65))

# [2.2.0](https://github.com/Typescript-TDD/ts-auto-mock/compare/2.1.22...2.2.0) (2020-05-31)


### Bug Fixes

* **release:** adjust automated pr to create a valid commit msg ([#354](https://github.com/Typescript-TDD/ts-auto-mock/issues/354)) ([1600788](https://github.com/Typescript-TDD/ts-auto-mock/commit/1600788f77ba6b208a0bf089a361d22ff851df04))
* **release:** change owner to uittorio attempting to fix npm authentication problem ([9092ff6](https://github.com/Typescript-TDD/ts-auto-mock/commit/9092ff688efccc1b1c77b7e947eabd4e746e03cf))
* **release:** ensure correct folder will be published to npm ([9664b3d](https://github.com/Typescript-TDD/ts-auto-mock/commit/9664b3d75e55f8072e9742440dfd38665303150a))
* **release:** ensure library its build before publishing ([fb5535b](https://github.com/Typescript-TDD/ts-auto-mock/commit/fb5535b0c94a2b92070d181d358e7ea20b24ec25))
* **release:** fix syntax in release.yml ([ef97ae5](https://github.com/Typescript-TDD/ts-auto-mock/commit/ef97ae50474bf01a790f6df0cbe19675b46a91e6))
* **release:** revert owner and add token registration ([169cc76](https://github.com/Typescript-TDD/ts-auto-mock/commit/169cc769f89260cf3e1f143074b5cefbd792269e))
* **release:** semantic release test ([#351](https://github.com/Typescript-TDD/ts-auto-mock/issues/351)) ([996b5a9](https://github.com/Typescript-TDD/ts-auto-mock/commit/996b5a9043f64d992330fef85f14a7fe4eced1b0))


### Features

* **random:** add enum random support ([eeceea2](https://github.com/Typescript-TDD/ts-auto-mock/commit/eeceea2bc73fa5c07e13c0538b65e327d42ab5ed))

<a name="2.1.22"></a>
## [2.1.22](https://github.com/Typescript-TDD/ts-auto-mock/compare/2.1.21...2.1.22) (2020-05-25)



<a name="2.1.21"></a>
## [2.1.21](https://github.com/Typescript-TDD/ts-auto-mock/compare/v2.0.0...2.1.21) (2020-05-25)


### Features

* **random:** enable random feature for primitives types ([9666efc](https://github.com/Typescript-TDD/ts-auto-mock/commit/9666efc))



<a name="2.0.0"></a>
# [2.0.0](https://github.com/Typescript-TDD/ts-auto-mock/compare/2.0.0...v2.0.0) (2020-05-13)



<a name="2.0.0"></a>
# [2.0.0](https://github.com/Typescript-TDD/ts-auto-mock/compare/v1.6.2...2.0.0) (2020-05-13)


### Bug Fixes

* **transformer:** Ensure mocked interfaces don't extend themselves infinitely if passed as generic argument ([#312](https://github.com/Typescript-TDD/ts-auto-mock/issues/312)) ([9911d94](https://github.com/Typescript-TDD/ts-auto-mock/commit/9911d94))
* **union:** ensure union type with null or unknown will mock the first type ([#322](https://github.com/Typescript-TDD/ts-auto-mock/issues/322)) ([a2d58ad](https://github.com/Typescript-TDD/ts-auto-mock/commit/a2d58ad))


### BREAKING CHANGES

* **union:** union types that resolve in null or unknown will now not be converted to undefined.

before
```ts
type = string | null // undefined
```

after
```ts
type = string | null // '' (empty string)
```



<a name="1.6.2"></a>
## [1.6.2](https://github.com/Typescript-TDD/ts-auto-mock/compare/1.6.2...v1.6.2) (2020-05-11)



<a name="1.6.2"></a>
## [1.6.2](https://github.com/Typescript-TDD/ts-auto-mock/compare/1.6.1...1.6.2) (2020-05-11)



<a name="1.6.1"></a>
## [1.6.1](https://github.com/Typescript-TDD/ts-auto-mock/compare/v1.6.0...1.6.1) (2020-05-10)


### Features

* **date:** add support for Date type ([#310](https://github.com/Typescript-TDD/ts-auto-mock/issues/310)) ([7480aad](https://github.com/Typescript-TDD/ts-auto-mock/commit/7480aad))



<a name="1.6.0"></a>
# [1.6.0](https://github.com/Typescript-TDD/ts-auto-mock/compare/v1.5.891...v1.6.0) (2020-04-11)



<a name="1.5.891"></a>
## [1.5.891](https://github.com/Typescript-TDD/ts-auto-mock/compare/1.6.0...v1.5.891) (2020-04-11)



<a name="1.5.891"></a>
## [1.5.891](https://github.com/Typescript-TDD/ts-auto-mock/compare/v1.5.89...1.5.891) (2020-04-11)



<a name="1.5.89"></a>
## [1.5.89](https://github.com/Typescript-TDD/ts-auto-mock/compare/v1.5.88...v1.5.89) (2020-04-11)



<a name="1.5.88"></a>
## [1.5.88](https://github.com/Typescript-TDD/ts-auto-mock/compare/1.5.89...v1.5.88) (2020-04-11)



<a name="1.5.88"></a>
## [1.5.88](https://github.com/Typescript-TDD/ts-auto-mock/compare/v1.5.87...1.5.88) (2020-04-11)



<a name="1.5.87"></a>
## [1.5.87](https://github.com/Typescript-TDD/ts-auto-mock/compare/1.5.87...v1.5.87) (2020-04-11)



<a name="1.5.87"></a>
## [1.5.87](https://github.com/Typescript-TDD/ts-auto-mock/compare/1.5.86...1.5.87) (2020-04-11)



<a name="1.5.86"></a>
## [1.5.86](https://github.com/Typescript-TDD/ts-auto-mock/compare/v1.5.85...1.5.86) (2020-04-11)



<a name="1.5.85"></a>
## [1.5.85](https://github.com/Typescript-TDD/ts-auto-mock/compare/1.5.85...v1.5.85) (2020-04-11)



<a name="1.5.85"></a>
## [1.5.85](https://github.com/Typescript-TDD/ts-auto-mock/compare/v1.5.84...1.5.85) (2020-04-11)



<a name="1.5.84"></a>
## [1.5.84](https://github.com/Typescript-TDD/ts-auto-mock/compare/1.5.84...v1.5.84) (2020-04-11)



<a name="1.5.84"></a>
## [1.5.84](https://github.com/Typescript-TDD/ts-auto-mock/compare/v1.5.83...1.5.84) (2020-04-11)



<a name="1.5.83"></a>
## [1.5.83](https://github.com/Typescript-TDD/ts-auto-mock/compare/1.5.83...v1.5.83) (2020-04-11)



<a name="1.5.83"></a>
## [1.5.83](https://github.com/Typescript-TDD/ts-auto-mock/compare/v1.5.82...1.5.83) (2020-04-11)



<a name="1.5.82"></a>
## [1.5.82](https://github.com/Typescript-TDD/ts-auto-mock/compare/1.5.82...v1.5.82) (2020-04-11)



<a name="1.5.82"></a>
## [1.5.82](https://github.com/Typescript-TDD/ts-auto-mock/compare/1.5.81...1.5.82) (2020-04-11)



<a name="1.5.81"></a>
## [1.5.81](https://github.com/Typescript-TDD/ts-auto-mock/compare/1.5.63...1.5.81) (2020-04-11)



<a name="1.5.63"></a>
## [1.5.63](https://github.com/Typescript-TDD/ts-auto-mock/compare/1.5.62...1.5.63) (2020-04-11)



<a name="1.5.62"></a>
## [1.5.62](https://github.com/Typescript-TDD/ts-auto-mock/compare/1.5.61...1.5.62) (2020-04-11)



<a name="1.5.61"></a>
## [1.5.61](https://github.com/Typescript-TDD/ts-auto-mock/compare/1.5.6...1.5.61) (2020-04-11)



<a name="1.5.6"></a>
## [1.5.6](https://github.com/Typescript-TDD/ts-auto-mock/compare/1.5.5...1.5.6) (2020-04-11)



<a name="1.5.5"></a>
## [1.5.5](https://github.com/Typescript-TDD/ts-auto-mock/compare/1.5.4...1.5.5) (2020-04-11)


### Bug Fixes

* upgrade gatsby-plugin-google-analytics from 2.1.35 to 2.2.2 ([#299](https://github.com/Typescript-TDD/ts-auto-mock/issues/299)) ([b8335d5](https://github.com/Typescript-TDD/ts-auto-mock/commit/b8335d5))
* upgrade ttypescript from 1.5.8 to 1.5.10 ([#298](https://github.com/Typescript-TDD/ts-auto-mock/issues/298)) ([7e7bd59](https://github.com/Typescript-TDD/ts-auto-mock/commit/7e7bd59))


### Features

* **extendsMappedType:** make sure extending mapped types do not prevent to compile ([#241](https://github.com/Typescript-TDD/ts-auto-mock/issues/241)) ([627b9bc](https://github.com/Typescript-TDD/ts-auto-mock/commit/627b9bc))
* **set:** add Set support as a type ([#233](https://github.com/Typescript-TDD/ts-auto-mock/issues/233)) ([446c090](https://github.com/Typescript-TDD/ts-auto-mock/commit/446c090))
* **typescript:** add support for typescript 3.8 ([#246](https://github.com/Typescript-TDD/ts-auto-mock/issues/246)) ([2a18bed](https://github.com/Typescript-TDD/ts-auto-mock/commit/2a18bed))



<a name="1.5.4"></a>
## [1.5.4](https://github.com/Typescript-TDD/ts-auto-mock/compare/1.5.1...1.5.4) (2020-02-08)


### Bug Fixes

* **transformer:** export definitely typed for transformer so it will be easier to read the documentation while developing ([#222](https://github.com/Typescript-TDD/ts-auto-mock/issues/222)) ([37b4b7e](https://github.com/Typescript-TDD/ts-auto-mock/commit/37b4b7e))
* **typeof-alias-export:** make sure alias exports will be transformed correctly ([#214](https://github.com/Typescript-TDD/ts-auto-mock/issues/214)) ([27ae136](https://github.com/Typescript-TDD/ts-auto-mock/commit/27ae136))
* **typequery:** add support for typequery undefined ([#227](https://github.com/Typescript-TDD/ts-auto-mock/issues/227)) ([0b835b1](https://github.com/Typescript-TDD/ts-auto-mock/commit/0b835b1))


### Features

* **map:** add Map support as a type ([#228](https://github.com/Typescript-TDD/ts-auto-mock/issues/228)) ([3006c84](https://github.com/Typescript-TDD/ts-auto-mock/commit/3006c84)), closes [#225](https://github.com/Typescript-TDD/ts-auto-mock/issues/225)



<a name="1.5.1"></a>
## [1.5.1](https://github.com/Typescript-TDD/ts-auto-mock/compare/1.5.0...1.5.1) (2020-01-31)



<a name="1.5.0"></a>
# [1.5.0](https://github.com/Typescript-TDD/ts-auto-mock/compare/v1.4.1...1.5.0) (2020-01-31)


### Bug Fixes

* **definitelyTyped:** add node types in generated tsconfig ([#186](https://github.com/Typescript-TDD/ts-auto-mock/issues/186)) ([19caa94](https://github.com/Typescript-TDD/ts-auto-mock/commit/19caa94))
* **definitelyTyped:** copy compiler option "paths" from processed type ([#185](https://github.com/Typescript-TDD/ts-auto-mock/issues/185)) ([6265fde](https://github.com/Typescript-TDD/ts-auto-mock/commit/6265fde))
* **definitelyTyped:** use ts-ignore before createMock so that value type modules don't fail ([acd2c6f](https://github.com/Typescript-TDD/ts-auto-mock/commit/acd2c6f))
* **genericNotProvided:** make sure required generic will default to null when are not provided ([#180](https://github.com/Typescript-TDD/ts-auto-mock/issues/180)) ([ad76471](https://github.com/Typescript-TDD/ts-auto-mock/commit/ad76471))
* **mockProperty:** make sure a falsy value can be assigned to a mock property ([#208](https://github.com/Typescript-TDD/ts-auto-mock/issues/208)) ([0b37699](https://github.com/Typescript-TDD/ts-auto-mock/commit/0b37699))
* **ui:** use index as key of list of components to make sure the ui doesn't fail when a type gets processed multiple times ([#178](https://github.com/Typescript-TDD/ts-auto-mock/issues/178)) ([84a52a1](https://github.com/Typescript-TDD/ts-auto-mock/commit/84a52a1))


### Features

* **constructorType:** Add constructor type descriptor ([#115](https://github.com/Typescript-TDD/ts-auto-mock/issues/115)) ([8f26218](https://github.com/Typescript-TDD/ts-auto-mock/commit/8f26218))
* **constructSignature:** add construct signature ([#116](https://github.com/Typescript-TDD/ts-auto-mock/issues/116)) ([b0aa18a](https://github.com/Typescript-TDD/ts-auto-mock/commit/b0aa18a))
* **DefinitelyTyped:** add process with ui to run createMock on every type of DefinitelyTyped repository ([#136](https://github.com/Typescript-TDD/ts-auto-mock/issues/136)) ([445f31e](https://github.com/Typescript-TDD/ts-auto-mock/commit/445f31e))
* **genericDefault:** add support for default generics on declaration and extensions ([#126](https://github.com/Typescript-TDD/ts-auto-mock/issues/126)) ([a9df32a](https://github.com/Typescript-TDD/ts-auto-mock/commit/a9df32a))
* **import:** add import equals support and make sure transformer test run in a context so the cache system will work ([f23039d](https://github.com/Typescript-TDD/ts-auto-mock/commit/f23039d))
* **importequal:** add support for export equals and remove webpack env types that were conflicting with types node ([#124](https://github.com/Typescript-TDD/ts-auto-mock/issues/124)) ([990ecf1](https://github.com/Typescript-TDD/ts-auto-mock/commit/990ecf1))
* **indexedAccess:** add indexed access support for mocks ([#119](https://github.com/Typescript-TDD/ts-auto-mock/issues/119)) ([a3e9841](https://github.com/Typescript-TDD/ts-auto-mock/commit/a3e9841))
* **intersectionsfunction:** add support for function intersections and parenthesised type in intersections ([#127](https://github.com/Typescript-TDD/ts-auto-mock/issues/127)) ([5572631](https://github.com/Typescript-TDD/ts-auto-mock/commit/5572631))
* **multipledeclaration-bigint:** add support for multiple declarations functions for types and values and biging ([#163](https://github.com/Typescript-TDD/ts-auto-mock/issues/163)) ([00d9904](https://github.com/Typescript-TDD/ts-auto-mock/commit/00d9904))
* **registerMock:** add registerMock functionality to register custom mocks per project ([#125](https://github.com/Typescript-TDD/ts-auto-mock/issues/125)) ([0feb05a](https://github.com/Typescript-TDD/ts-auto-mock/commit/0feb05a))
* **typeQuery:** add support for typeof of an imported module ([#128](https://github.com/Typescript-TDD/ts-auto-mock/issues/128)) ([a9e25a3](https://github.com/Typescript-TDD/ts-auto-mock/commit/a9e25a3))


### Performance Improvements

* **emit:** decrease emitted code ([#169](https://github.com/Typescript-TDD/ts-auto-mock/issues/169)) ([0253e95](https://github.com/Typescript-TDD/ts-auto-mock/commit/0253e95))



<a name="1.4.1"></a>
## [1.4.1](https://github.com/Typescript-TDD/ts-auto-mock/compare/v1.4.0...v1.4.1) (2019-11-30)


### Bug Fixes

* **enum:** add module declaration enum support ([4642520](https://github.com/Typescript-TDD/ts-auto-mock/commit/4642520))



<a name="1.4.0"></a>
# [1.4.0](https://github.com/Typescript-TDD/ts-auto-mock/compare/1.3.1...v1.4.0) (2019-11-26)


### Features

* **config:** add option to disable cache between files as a workaround until [#101](https://github.com/Typescript-TDD/ts-auto-mock/issues/101) is completed ([92cd1d7](https://github.com/Typescript-TDD/ts-auto-mock/commit/92cd1d7))



<a name="1.3.1"></a>
## [1.3.1](https://github.com/Typescript-TDD/ts-auto-mock/compare/0.0.2...1.3.1) (2019-11-21)


### Bug Fixes

* **this:** make sure literal type will not interfere with "this" reference ([fd2270b](https://github.com/Typescript-TDD/ts-auto-mock/commit/fd2270b)), closes [#88](https://github.com/Typescript-TDD/ts-auto-mock/issues/88) [#88](https://github.com/Typescript-TDD/ts-auto-mock/issues/88)


### feature

* **genericReuse:** add types with generic to mock factory ([ddd94b0](https://github.com/Typescript-TDD/ts-auto-mock/commit/ddd94b0))


### Features

* **interfaceCallSignature:** add support for interface call signature ([#82](https://github.com/Typescript-TDD/ts-auto-mock/issues/82)) ([a00ff55](https://github.com/Typescript-TDD/ts-auto-mock/commit/a00ff55))


### BREAKING CHANGES

* **genericReuse:** extensions (Provider) provideMethod will be deprecated in
future releases in favour of provideMethodWithDeferredValue

Provider.provideMethod is deprecated changed:
Before:
        Provider.instance.provideMethod((name: string, value: any) => {
            ...
        });
After:
    Provider.instance.provideMethodWithDeferredValue((name: string, value: () => any) => {
        ...
    });

Read the DOCS for more information

* add global scope and move type reference cache in the scope

* remove space

* init scope

* add first version - extend generic still doesnt work

* remove unused method

* add back the new generic tests

* remove unused file, disable extensions, intersection and ts lib (WIP)

* simplify generic function

* merge generic tests and add reuse test

* remove unused files

* re enable working tests and add some info for this branch

* add test and comment to find test to fix

* add enumerable to object so it will have the correct output and add support to recursive call signatures

* fix type generic case

* restric interface to specific types so it will be easier to extend it

* rename function

* first working version generic extends

* remove unused descriptor and add more test to support types

* add more tests

* make sure factory cache is not exposed, divide caches

* refactor type parameter

* add more test and refactor the mess in mock factory call

* add more tests

* add more tests

* added back promises implementation and all test

* remove comment we will write test scenario when available

* add direct type test mock

* remove unused import

* remove comments

* remove unused field

* document playground command

* Update README.md

* remove unnecessary code, rename text and simplify for

* remove unnecessary create mock in the test

* remove unnecessary if

* deprecate getMethod and add new method to make sure with don't introduce breaking changes

* update deprecated comment

* update



<a name="0.0.2"></a>
## [0.0.2](https://github.com/Typescript-TDD/ts-auto-mock/compare/0.0.1...0.0.2) (2019-09-21)



<a name="0.0.1"></a>
## [0.0.1](https://github.com/Typescript-TDD/ts-auto-mock/compare/v1.2.0...0.0.1) (2019-09-21)



<a name="1.2.0"></a>
# [1.2.0](https://github.com/Typescript-TDD/ts-auto-mock/compare/v1.1.4...v1.2.0) (2019-08-18)


### Features

* **defaultValues:** merge default values ([#78](https://github.com/Typescript-TDD/ts-auto-mock/issues/78)) ([e5a7424](https://github.com/Typescript-TDD/ts-auto-mock/commit/e5a7424))



<a name="1.1.4"></a>
## [1.1.4](https://github.com/Typescript-TDD/ts-auto-mock/compare/v1.1.3...v1.1.4) (2019-07-06)


### Bug Fixes

* **core:** use path.relative to check if two urls are the same ([#69](https://github.com/Typescript-TDD/ts-auto-mock/issues/69)) ([e79b29c](https://github.com/Typescript-TDD/ts-auto-mock/commit/e79b29c))


### Features

* **log:** add test script that will output logs ([d577cf8](https://github.com/Typescript-TDD/ts-auto-mock/commit/d577cf8))



<a name="1.1.3"></a>
## [1.1.3](https://github.com/Typescript-TDD/ts-auto-mock/compare/v1.1.2...v1.1.3) (2019-06-29)


### Features

* **log:** logging feature, remove npm i logs for ci ([0cdfa27](https://github.com/Typescript-TDD/ts-auto-mock/commit/0cdfa27))



<a name="1.1.2"></a>
## [1.1.2](https://github.com/Typescript-TDD/ts-auto-mock/compare/v1.1.1...v1.1.2) (2019-05-18)



<a name="1.1.1"></a>
## [1.1.1](https://github.com/Typescript-TDD/ts-auto-mock/compare/v1.1.0...v1.1.1) (2019-04-27)



<a name="1.1.0"></a>
# [1.1.0](https://github.com/Typescript-TDD/ts-auto-mock/compare/v1.0.0...v1.1.0) (2019-04-27)


### Bug Fixes

* **modules:** make sure transformer is exported in the right folder ([832afc1](https://github.com/Typescript-TDD/ts-auto-mock/commit/832afc1))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/Typescript-TDD/ts-auto-mock/compare/v0.0.27...v1.0.0) (2019-04-27)


### Code Refactoring

* **module division:** modules divisions ([54575a7](https://github.com/Typescript-TDD/ts-auto-mock/commit/54575a7))


### Features

* **createMockList:** add createMockList functionality, add typings to framework test ([#34](https://github.com/Typescript-TDD/ts-auto-mock/issues/34)) ([3030ba5](https://github.com/Typescript-TDD/ts-auto-mock/commit/3030ba5))


### BREAKING CHANGES

* **module division:** extensions (On, method) are in a separate modules,
mockFactory changed interface, name (Provider) and module

Importing On, method changed:

Before:
import { On, method } from "ts-auto-mock";

After:
import { On, method } from "ts-auto-mock/extension";

MockFactory changed name, module and interface:

Before:
import { MockFactory } from "ts-auto-mock";

MockFactory.instance.registerFactory((name: string, value: any) => {
    ...
});

After:
import { Provider } from "ts-auto-mock/extension";

Provider.instance.provideMethod((name: string, value: any) => {
    ...
});



<a name="0.0.27"></a>
## [0.0.27](https://github.com/Typescript-TDD/ts-auto-mock/compare/v0.0.26...v0.0.27) (2019-04-07)


### Bug Fixes

* **tslinttest:** fix another unit test ([5b84a55](https://github.com/Typescript-TDD/ts-auto-mock/commit/5b84a55))



<a name="0.0.26"></a>
## [0.0.26](https://github.com/Typescript-TDD/ts-auto-mock/compare/v0.0.25...v0.0.26) (2019-04-07)



<a name="0.0.25"></a>
## [0.0.25](https://github.com/Typescript-TDD/ts-auto-mock/compare/bd3a43d...v0.0.25) (2019-04-07)


### Features

* **changelog:** add changelog ([bd3a43d](https://github.com/Typescript-TDD/ts-auto-mock/commit/bd3a43d))
* **ci:** add minimum ci to run test on branches ([34d4ac7](https://github.com/Typescript-TDD/ts-auto-mock/commit/34d4ac7))
