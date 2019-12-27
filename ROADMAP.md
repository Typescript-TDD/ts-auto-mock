# Ts Auto Mock ROADMAP

Here is a list of the feature we want to add to ts-auto-mock in 2020.

We cannot estimate how long it will take to develop these features because we work on it during our free time

- ## Always custom mock
Allow the creation of "persisted mocks". 

This will allow the creation of a mock once that will be always mock

- ## Documentation for most useful framework/configuration
We are aware that configuring transformer is not an easy task.

That's why we want to provide a more useful documentation for each scenario
- React+jest
- Angular+jasmine
- Node+mocha
- ...

- ## Include framework wrappers (jest-ts-auto-mock, jasmine-ts-auto-mock) into ts-auto-mock
To make sure that any change on ts-auto-mock will keep working on any framework we will include framework implementation's inside ts-auto-mock.

This will also help us to publish ts-auto-mock and automatically publish new version of this wrapper libraries

- ## Run mock test on typescript Definitely type overnight
This is a really important feature that will allow us to spot issues.

Definitely type contains many many types that we can use to make sure that we are supporting mostly of typescript features

- ## Performance analytics
We want to make sure that ts-auto-mock is not impacting the compilation of your code too much.
Creating performance analytics on each build will show us if any particular new feature its increasing the compilation time.

It will also allow us to improve performances

-- ## Write articles about react, angular, vuejs etc
We truly believe that ts-auto-mock has a lot of potential but we need to increase our exposure on the web to make sure people start using it
