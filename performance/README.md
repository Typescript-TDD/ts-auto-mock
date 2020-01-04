## ts auto mock performance runner

This project will run and save performance for ts-auto-mock.
It will help the maintainers to identify performance issue in ts-auto-mock and it can be used to improve the velocity of the transformer


### Live data
Performance data will be automatically updated every build on master before publishing a new version

You can see the data [here](https://typescript-tdd.github.io/ts-auto-mock/performance)

### Local data

### Instruction to run performance data

```
npm run start
```

This will create and run all the test based on performance.json configuration

```json

{
  "volume": 1000 ,
  "features": [
    {
    
      "name": "without transformer",
      "tsConfig": "tsconfig.performance.notransformer.json",
      "types": ["oneInterfacePerFile"]
    }
  ]
}
```

- volume -> Decide the number of tests to execute

### features 
- name  -> Just a label for the feature

- tsConfig -> The path of ts config to use

- types -> One or more of the following 

1) oneInterfacePerFile
2) reuseInterface
3) withoutTsAutoMock

These types can be extended by adding another file in performance/templates folder with the specification that you need
 
### Instruction to view performance data locally

```
  cd ui
  npm install
  npm start
```
