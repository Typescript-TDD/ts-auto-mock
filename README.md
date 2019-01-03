# Auto Spy

This library should help you generate spies for your javascript project
The library is agnostic. It does not use jasmine or jest to identify to type of spy. You are responsible to provide a small implementation 

## Getting Started

### Prerequisites


```
npm install auto-spy
```


### Usage

The main class to use to create spy:
```
SpyFactory.forClass(MyClass, new SpyMethodFactory())
```

### Configure the spy method creator
The SpyFactory needs a SpyMethodFactory implementations

This is a configuration example with Jest
```
class JestSpyMethodFactory implements SpyMethodFactory<Mock> {
    create(name: string): Mock {
        return jest.fn();
    }
}

```
### Wrap the class 
If you wrap the class you don't need to repeat every time which type of library you will use

```
export type JestSpy<T> = Spy<T, Mock>;

export class JestSpyFactory {
    static create<T>(klass: ClassType<T>): JestSpy<T> {
        return SpyFactory.forClass(klass, new JestSpyMethodFactory())
    }
}
```

### Configuration File
Put your configuration in a file that will be included during your test
```
import Mock = jest.Mock;
import { ClassType, Spy, SpyFactory, SpyMethodFactory } from "auto-spy";

class JestSpyMethodFactory implements SpyMethodFactory<Mock> {
    create(name: string): Mock {
        return jest.fn();
    }
}

export type JestSpy<T> = Spy<T, Mock>;

export class JestSpyFactory {
    static create<T>(klass: ClassType<T>): JestSpy<T> {
        return SpyFactory.forClass(klass, new JestSpyMethodFactory())
    }
}
```
### Use It

```
describe('Authentication', () => {
    let authentication: Authentication;
    let api: JestSpy<RApi>;

    beforeEach(() => {
        api = JestSpyFactory.create(RApi);
        authentication = new Authentication(api);
    });
    
    //rest of the test
```

## Authors

* **Vittorio Guerriero**
* **Valentino Losito**
* **Giulio Caprino** 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
