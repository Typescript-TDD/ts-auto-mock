# TS auto mock
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
![Test](https://github.com/Typescript-TDD/ts-auto-mock/workflows/Test/badge.svg)
[![npm version](https://badge.fury.io/js/ts-auto-mock.svg)](https://badge.fury.io/js/ts-auto-mock)
[![Downloads](https://img.shields.io/npm/dw/ts-auto-mock.svg)](https://www.npmjs.com/package/ts-auto-mock)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

![Slack](docs/slack_small.png) Need help? Join us on [Slack](https://join.slack.com/t/typescripttdd/shared_invite/enQtODk3MjQwNzUwNTk2LTMzNjdlZTNmMmY3Nzg2NDNiZDA1YzJmZjk2NjcwZjQwODQ3YzE5NGZjM2Q4MzZjYWNiMWE4MGU0NjEzM2E5YzE)

A TypeScript transformer that will allow you to create mocks for any types (interfaces, classes, etc.) without the need to create manual fakes/mocks.

## [API Documentation](https://typescript-tdd.github.io/ts-auto-mock)

#### [Installation](https://typescript-tdd.github.io/ts-auto-mock/installation)
#### [Usage](https://typescript-tdd.github.io/ts-auto-mock/create-mock)

#### Quick overview
```ts
import { createMock } from 'ts-auto-mock';

interface Person {
  id: string;
  getName(): string;
  details: {
      phone: number
  }
}
const mock = createMock<Person>();
mock.id // ""
mock.getName() // ""
mock.details // "{ phone: 0 }"
```

* If you are interested to use it with jasmine please go to [jasmine-ts-auto-mock](https://github.com/Typescript-TDD/jasmine-ts-auto-mock)
* If you are interested to use it with jest please go to [jest-ts-auto-mock](https://github.com/Typescript-TDD/jest-ts-auto-mock)

## Changelog

Find the changelog here: [Changelog](CHANGELOG.md).

## Roadmap

You can find the roadmap of this project on the Wiki page: [Roadmap](https://github.com/Typescript-TDD/ts-auto-mock/wiki/Roadmap).

## Do you want to contribute?
* [Check how to make changes to the code base](https://typescript-tdd.github.io/ts-auto-mock/local-development)

## Authors

* [**Vittorio Guerriero**](https://github.com/uittorio)
* [**Giulio Caprino**](https://github.com/pmyl)

## License

This project is licensed under the MIT License

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://www.geoffreytestelin.com/"><img src="https://avatars1.githubusercontent.com/u/10194542?v=4?s=60" width="60px;" alt=""/><br /><sub><b>Geoffrey Testelin</b></sub></a><br /><a href="https://github.com/typescripttdd/ts-auto-mock/issues?q=author%3AC0ZEN" title="Bug reports">🐛</a> <a href="https://github.com/typescripttdd/ts-auto-mock/commits?author=C0ZEN" title="Code">💻</a> <a href="#ideas-C0ZEN" title="Ideas, Planning, & Feedback">🤔</a> <a href="#tool-C0ZEN" title="Tools">🔧</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!