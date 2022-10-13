# TS auto mock

![Test](https://github.com/Typescript-TDD/ts-auto-mock/workflows/Test/badge.svg)
[![npm version](https://badge.fury.io/js/ts-auto-mock.svg)](https://badge.fury.io/js/ts-auto-mock)
[![Downloads](https://img.shields.io/npm/dw/ts-auto-mock.svg)](https://www.npmjs.com/package/ts-auto-mock)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
![GitHub Sponsor](https://img.shields.io/github/sponsors/uittorio?label=sponsor&logo=GitHub)
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-7-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
![Slack](docs/slack_small.png) Need help? Join us
on [Slack](https://join.slack.com/t/typescripttdd/shared_invite/enQtODk3MjQwNzUwNTk2LTMzNjdlZTNmMmY3Nzg2NDNiZDA1YzJmZjk2NjcwZjQwODQ3YzE5NGZjM2Q4MzZjYWNiMWE4MGU0NjEzM2E5YzE)

# :warning: This repository is now no longer maintained for new features development :warning:

A few years ago we've created this project with the idea in mind that typescript transformers would be easier
to
configure.

Unfortunately the typescript team has no intention to improve the developer experience. You can see more information at
this [link](https://github.com/Microsoft/TypeScript/issues/14419).

We believe that stop developing new features is the best decision to inform who is currently using it and who
find it for the first time.

We will keep fixing bugs and vulnerability.

Other reasons why this library might not be for you:

- Typescript transformers works only when using the tsc typescript compiler. If you are using esbuild or swc you will
  not
  be able to use this library.
- Test double are a double-edge sword. They have to be used carefully and at the right time. Increasing the number of
  test doubles could decrease the value of your tests. The amount of configuration required by this library might not
  justify the amount of test doubles that your application requires.

A TypeScript transformer that will allow you to create mocks for any types (interfaces, classes, etc.) without the need
to create manual fakes/mocks.

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

* If you are interested to use it with jasmine please go
  to [jasmine-ts-auto-mock](https://github.com/Typescript-TDD/jasmine-ts-auto-mock)
* If you are interested to use it with jest please go
  to [jest-ts-auto-mock](https://github.com/Typescript-TDD/jest-ts-auto-mock)

## Changelog

Find the changelog here: [Changelog](CHANGELOG.md).

## Roadmap

You can find the roadmap of this project on the Wiki
page: [Roadmap](https://github.com/Typescript-TDD/ts-auto-mock/wiki/Roadmap).

## Do you want to contribute?

* [Check how to make changes to the code base](https://typescript-tdd.github.io/ts-auto-mock/local-development)

## Authors

* [**Vittorio Guerriero**](https://github.com/uittorio)
* [**Giulio Caprino**](https://github.com/pmyl)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/artem1458"><img src="https://avatars1.githubusercontent.com/u/33227963?v=4?s=60" width="60px;" alt=""/><br /><sub><b>Artem Kornev</b></sub></a><br /><a href="https://github.com/typescripttdd/ts-auto-mock/issues?q=author%3Aartem1458" title="Bug reports">🐛</a> <a href="https://github.com/typescripttdd/ts-auto-mock/commits?author=artem1458" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/wassy92x"><img src="https://avatars0.githubusercontent.com/u/12649037?v=4?s=60" width="60px;" alt=""/><br /><sub><b>Fabian</b></sub></a><br /><a href="https://github.com/typescripttdd/ts-auto-mock/issues?q=author%3Awassy92x" title="Bug reports">🐛</a> <a href="https://github.com/typescripttdd/ts-auto-mock/commits?author=wassy92x" title="Code">💻</a></td>
    <td align="center"><a href="http://www.geoffreytestelin.com/"><img src="https://avatars1.githubusercontent.com/u/10194542?v=4?s=60" width="60px;" alt=""/><br /><sub><b>Geoffrey 'C0ZEN' Testelin</b></sub></a><br /><a href="https://github.com/typescripttdd/ts-auto-mock/issues?q=author%3AC0ZEN" title="Bug reports">🐛</a> <a href="https://github.com/typescripttdd/ts-auto-mock/commits?author=C0ZEN" title="Code">💻</a> <a href="#ideas-C0ZEN" title="Ideas, Planning, & Feedback">🤔</a> <a href="#tool-C0ZEN" title="Tools">🔧</a></td>
    <td align="center"><a href="https://github.com/Pmyl"><img src="https://avatars2.githubusercontent.com/u/16228209?v=4?s=60" width="60px;" alt=""/><br /><sub><b>Giulio Caprino</b></sub></a><br /><a href="#question-Pmyl" title="Answering Questions">💬</a> <a href="https://github.com/typescripttdd/ts-auto-mock/commits?author=Pmyl" title="Code">💻</a> <a href="https://github.com/typescripttdd/ts-auto-mock/commits?author=Pmyl" title="Documentation">📖</a> <a href="#ideas-Pmyl" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-Pmyl" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-Pmyl" title="Maintenance">🚧</a> <a href="#projectManagement-Pmyl" title="Project Management">📆</a></td>
    <td align="center"><a href="https://github.com/marcmrf"><img src="https://avatars0.githubusercontent.com/u/9928519?v=4?s=60" width="60px;" alt=""/><br /><sub><b>Marc</b></sub></a><br /><a href="https://github.com/typescripttdd/ts-auto-mock/issues?q=author%3Amarcmrf" title="Bug reports">🐛</a> <a href="https://github.com/typescripttdd/ts-auto-mock/commits?author=marcmrf" title="Code">💻</a></td>
    <td align="center"><a href="http://www.martinjlowm.dk/"><img src="https://avatars0.githubusercontent.com/u/110860?v=4?s=60" width="60px;" alt=""/><br /><sub><b>Martin Jesper Low Madsen</b></sub></a><br /><a href="https://github.com/typescripttdd/ts-auto-mock/issues?q=author%3Amartinjlowm" title="Bug reports">🐛</a> <a href="https://github.com/typescripttdd/ts-auto-mock/commits?author=martinjlowm" title="Code">💻</a> <a href="#ideas-martinjlowm" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://uittorio.github.io/"><img src="https://avatars3.githubusercontent.com/u/17477623?v=4?s=60" width="60px;" alt=""/><br /><sub><b>Vittorio Guerriero</b></sub></a><br /><a href="#question-uittorio" title="Answering Questions">💬</a> <a href="https://github.com/typescripttdd/ts-auto-mock/commits?author=uittorio" title="Code">💻</a> <a href="#ideas-uittorio" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-uittorio" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-uittorio" title="Maintenance">🚧</a> <a href="#projectManagement-uittorio" title="Project Management">📆</a> <a href="#tool-uittorio" title="Tools">🔧</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification.
Contributions of any kind welcome!

## Sponsor ✨

Thanks to these people

<table>
  <tr>
    <td align="center">
        <a href="https://github.com/muk-ai">
            <img src="https://avatars.githubusercontent.com/u/3153823?v=4" width="60px;" alt=""/><br />
        <sub>
            <b>Kenta Mukai</b>
        </sub>
        </a>
    </td>
  </tr>
</table>

## License

This project is licensed under the [MIT License](LICENSE.md)
