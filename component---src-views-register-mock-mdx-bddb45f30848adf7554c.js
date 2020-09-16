(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{FVCx:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return c})),n.d(t,"default",(function(){return m}));var r=n("k0FJ"),o=n("oedh"),a=n("/FXl"),s=n("TjRS"),c=(n("aD51"),{});void 0!==c&&c&&c===Object(c)&&Object.isExtensible(c)&&!c.hasOwnProperty("__filemeta")&&Object.defineProperty(c,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"src/views/register-mock.mdx"}});var i={_frontmatter:c},b=s.a;function m(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(a.b)(b,Object(r.a)({},i,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("h1",{id:"register-mock"},"Register mock"),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},"registerMock")," will register your custom mock that will be re-used automatically whenever another mock is identified as converting the same interface."),Object(a.b)("h4",{id:"personts"},Object(a.b)("strong",{parentName:"h4"},Object(a.b)("inlineCode",{parentName:"strong"},"./person.ts"))),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ts"}),"export interface Person {\n  id: string;\n}\n")),Object(a.b)("h4",{id:"person-fakets"},Object(a.b)("strong",{parentName:"h4"},Object(a.b)("inlineCode",{parentName:"strong"},"./person-fake.ts"))),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ts"}),'import { Person } from \'./person\';\n\nexport class PersonFake extends Person {\n  public id: string;\n  public name: string;\n\n  constructor() {\n    this.id = "Basic Id";\n    this.name = "Basic name";\n  }\n}\n')),Object(a.b)("h4",{id:"contextts"},Object(a.b)("strong",{parentName:"h4"},Object(a.b)("inlineCode",{parentName:"strong"},"./context.ts"))),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ts",metastring:"context.ts","context.ts":!0}),"import { registerMock } from 'ts-auto-mock';\nimport { Person } from './person';\nimport { PersonFake } from './person-fake';\n\nregisterMock<Person>(() => new PersonFake());\n")),Object(a.b)("h4",{id:"my-testts"},Object(a.b)("strong",{parentName:"h4"},Object(a.b)("inlineCode",{parentName:"strong"},"./my-test.ts"))),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ts"}),'interface Wrapper {\n  person: Person;\n}\n\nconst mock: Wrapper = createMock<Wrapper>();\nmock.person // PersonFake\nmock.person.id // "Basic Id"\nmock.person.name // "Basic name"\n')),Object(a.b)("p",null,"When injecting fake (/stubbed) implementations, we recommend using the ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"./extension"}),"extension strategy")," to retrieve the faked object."),Object(a.b)("p",null,"An example of usage for Promise->FakePromise can be found in ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"https://github.com/Typescript-TDD/ts-auto-mock/blob/master/test/registerMock/extensionStrategy/extensionStrategy.test.ts"}),"the test folder"),"."),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"Note:")," You can only use it in a common file (webpack context.ts, mocha tsnode.js, etc), using ",Object(a.b)("inlineCode",{parentName:"p"},"registerMock")," in other files will give unexpected results."))}void 0!==m&&m&&m===Object(m)&&Object.isExtensible(m)&&!m.hasOwnProperty("__filemeta")&&Object.defineProperty(m,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"src/views/register-mock.mdx"}}),m.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-views-register-mock-mdx-bddb45f30848adf7554c.js.map