# ts-auto-mock ROADMAP

Here is a list of the feature we want to add to ts-auto-mock in 2020.

We cannot estimate how long it will take to develop these features because we work on it during our free time

#### Documentation for most useful framework/configuration
We are aware that configuring transformer is not an easy task.

That's why we want to provide a more useful documentation for each scenario
- React+jest
- Angular+jasmine
- Node+mocha
- ...

#### Include framework wrappers (jest-ts-auto-mock, jasmine-ts-auto-mock) into ts-auto-mock
To make sure that any changes on ts-auto-mock will keep working on any framework we will include the wrapper libraries inside ts-auto-mock.

This will also help us to publish new version of framework wrappers easily when there is a new version of ts-auto-mock

#### Write articles about react, angular, vuejs etc
We truly believe that ts-auto-mock has a lot of potential and every typescript project can benefit from it. We need to increase our exposure on the web to make sure people start using it

#### Better website
The current github pages website is a good start but we can do better. We're planning to move all the documentation there so that it's going to be easily discoverable.

#### Definitely Typed with 0 errors
Now that we have Definitely Typed overnight run, the plan is to make sure to fix all the errors so that we can assure that this library will never fail at compilation time.\
We're not going to sleep well at night until we can run a complete cycle with 0 errors.

#### TsAutoMocking's Creed
We need a mission, philosophy and vision statements.\
You know it, we know it, we just need find the right words.

#### New features
- Fuzzy testing
- Filtering files to parse in the transformer
- Enable mock caching for tests that run in different contexts

These are only few of the feature we're currently discussing.

---
#### Always custom mock
**Done in [#125](https://github.com/Typescript-TDD/ts-auto-mock/pull/125)**\
Allow the creation of "persisted mocks".

#### Performance analytics
**Done in [#130](https://github.com/Typescript-TDD/ts-auto-mock/pull/130)**\
We want to make sure that ts-auto-mock is not impacting the compilation of your code too much.
Creating performance analytics on each build will show us if any particular new feature its increasing the compilation time.

It will also allow us to improve performance

#### Run mock test on typescript Definitely Typed overnight
**Done in [#136](https://github.com/Typescript-TDD/ts-auto-mock/pull/136)**\
This is a really important feature that will allow us to find bugs quicker than waiting for people to try the library.

Definitely type contains many types that we can use to make sure that we are supporting mostly of typescript features
